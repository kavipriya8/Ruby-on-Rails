Rails.application.routes.draw do
  resources :todos, only: [:index, :create, :show, :destroy]
  # delete '/todos/:id', to: 'todos#destroy', as: 'delete_todo'
end
