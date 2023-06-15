class AddTodoToTodos < ActiveRecord::Migration[7.0]
  def change
    add_column :todos, :todo, :string
  end
end
