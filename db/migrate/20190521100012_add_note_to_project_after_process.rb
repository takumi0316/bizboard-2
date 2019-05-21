class AddNoteToProjectAfterProcess < ActiveRecord::Migration[5.2]
  def change

    add_column :project_binding_works, :note, :text
    add_column :project_after_processes, :note, :text
    
    add_column :project_copies, :posting_state_note, :text
    add_column :project_scans, :posting_state_note, :text
  end
end
