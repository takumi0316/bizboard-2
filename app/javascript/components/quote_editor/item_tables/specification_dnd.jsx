import React, { Fragment }                       from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SpecificationDnD = props => {

	const reorder = (startIndex, endIndex) => {

		let propsOrder = Array.from(props.quote_projects.slice());
		const startId = propsOrder[startIndex].id;
		const endId   = propsOrder[endIndex].id;

		propsOrder[startIndex].id = endId;
		propsOrder[endIndex].id   = startId;

		const [removedPropsOrder] = propsOrder.splice(startIndex, 1);
		propsOrder.splice(endIndex, 0, removedPropsOrder);

		return propsOrder;
	};

  const getItemStyle = (isDragging, draggableStyle) => ({

  	userSelect: "none",
  	padding: grid * 2,
  	margin: `0 0 ${grid}px 0`,
  	background: isDragging ? "lightgreen" : "grey",
  	...draggableStyle
	});

	const grid = props.quote_projects.length;
	const getListStyle = isDraggingOver => ({
		background: isDraggingOver ? "lightblue" : "lightgrey",
		padding: grid,
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
                        		provided.draggableProps.style
                      		) }
                    		>
                      		{ `品目名: ${specification.name}` }
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