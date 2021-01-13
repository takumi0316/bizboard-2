import React, { Fragment }                       from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SpecificationDnD = props => {

  const reorder = (startIndex, endIndex) => {

		const quoteProjects = JSON.parse(JSON.stringify(props.quote_projects));
    const arrangeQuoteProjects = [];
		const sum = startIndex - endIndex;

    // on -> desc
    if(sum > 0) {

      // DnDされた順に変更
      const sortQuoteProjects = [];
      // 品目の数を検索
      const quote_projects_length = quoteProjects.length;
      // 元々の品目ID
      const arrangeIds = quoteProjects.map(quote_project => quote_project.id);
  
      // DnDで離されたIndexを元に最初にsortする品目を検索
      if(endIndex > 0) {
        
        for(let i = 0; i < endIndex; i++) sortQuoteProjects.push(quoteProjects[i]);
        sortQuoteProjects.push(quoteProjects[startIndex]);
      } else {
  
        sortQuoteProjects.push(quoteProjects[startIndex]);
      };
      
      // On -> Dropまでの品目を検索
      for(let ei = endIndex; ei < startIndex; ei++) sortQuoteProjects.push(quoteProjects[ei]);
      
      // DnDされていない残った品目を検索
      for(let si = startIndex + 1; si < quote_projects_length; si++) sortQuoteProjects.push(quoteProjects[si]);
      
      sortQuoteProjects.map((sort_quote_project, index) => {
        sort_quote_project.id = arrangeIds[index];
        arrangeQuoteProjects.push(JSON.parse(JSON.stringify(sort_quote_project)));
      });
    };

    // on -> asc
    if(sum < 0) {
  
      // DnDされた順に変更
      const sortQuoteProjects = [];
      // 品目の数を検索
      const quote_projects_length = quoteProjects.length;
      // 元々の品目ID
      const arrangeIds = quoteProjects.map(quote_project => quote_project.id);
      
      // DnDで離されたIndexを元に最初にsortする品目を検索
      if(startIndex !== 0) {
    
        for(let i = 0; i < startIndex; i++) sortQuoteProjects.push(quoteProjects[i]);
        if(sum === -1) {
  
          sortQuoteProjects.push(quoteProjects[endIndex]);
          sortQuoteProjects.push(quoteProjects[startIndex]);
        }
        
        if(sum < -1) {
  
          for(let si = startIndex; si < endIndex; si++) sortQuoteProjects.push(quoteProjects[si + 1]);
          sortQuoteProjects.push(quoteProjects[startIndex]);
        }
        
        if(endIndex !== quote_projects_length - 1) {
  
          for(let ei = endIndex + 1; ei < quote_projects_length; ei++) sortQuoteProjects.push(quoteProjects[ei]);
        };
      } else {
    
        for(let i = 0; i < endIndex; i++) sortQuoteProjects.push(quoteProjects[i + 1]);
        sortQuoteProjects.push(quoteProjects[0]);
        for(let ei = endIndex + 1; ei < quote_projects_length; ei++) sortQuoteProjects.push(quoteProjects[ei]);
      };
  
      sortQuoteProjects.map((sort_quote_project, index) => {
        sort_quote_project.id = arrangeIds[index];
        arrangeQuoteProjects.push(JSON.parse(JSON.stringify(sort_quote_project)));
      });
    };
  
    return arrangeQuoteProjects;
  };

  const grid = props.quote_projects.length;

  const getItemStyle = (isDragging, draggableStyle, index) => {

    return ({
      userSelect: 'none',
      height: '60px',
      padding: grid * 4,
      fontWeight: 'bold',
      border: '1px solid #aab4b9',
      borderRadius: '2px',
      margin: `0 0 ${ (grid - 1) === index ? '0' : grid * 2 }px 0`,
      background: isDragging ? '#F8F8FF' : '#FFEBCD',
      ...draggableStyle
    })
  };

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#F8F8FF',
    padding: grid * 2,
    border: '1px solid black',
    borderRadius: '2px',
    height: '100%',
    width: '100%'
  });

	const onDragEnd = result => {

    // dropped outside the list
    if (!result.destination) {
      return;
    };

    const projects = reorder(
      result.source.index,
      result.destination.index
    );

		// setState({ items: items });
		props.reorderQuoteProjects(projects);
  };
	return(
		<Fragment>
      <DragDropContext onDragEnd={ result => onDragEnd(result) }>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              { ...provided.droppableProps }
              ref={ provided.innerRef }
              style={ getListStyle(snapshot.isDraggingOver) }
            >
              { props.quote_projects.map((specification, index) => {
								const id = 'id' + specification.id;
								const key = specification.id;

								return(
									<Fragment key={ key }>
                    <Draggable key={ key } draggableId={ id } index={ index }>
                      {(provided, snapshot) => (
                        <div
                          ref={ provided.innerRef }
                          { ...provided.draggableProps }
                          { ...provided.dragHandleProps }
                          style={ getItemStyle(
                            snapshot.isDragging,
														provided.draggableProps.style,
														index
                          ) }
                        >
                          { `品目名: ${ specification.name }, 数量: ${ specification.unit }` }
                        </div>
                      )}
                    </Draggable>
									</Fragment>
								)
              })}
              { provided.placeholder }
            </div>
          )}
        </Droppable>
      </DragDropContext>
		</Fragment>
	);
};

export default SpecificationDnD;