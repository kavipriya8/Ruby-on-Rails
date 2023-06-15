require 'httparty'

class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update destroy ]

  # GET /todos
  def index
    todos = Todo.fetch_from_api
    render json: todos
  end

  # GET /todos/1
  def show
    id = params[:id]
    response = HTTParty.get("http://localhost:4000/users/#{id}")

    if response.success?
      render json: response.parsed_response, status: :ok
    else
      render json: { error: "Failed to retrieve todo with ID #{id} from JSON server." }, status: :unprocessable_entity
    end
  end

  # POST /todos

  require 'httparty'

  def create
    todo_data = { "todo": params[:todo] }
    response = HTTParty.post('http://localhost:4000/users', body: todo_data.to_json, headers: { 'Content-Type' => 'application/json' })

    if response.success?
      render json: response.parsed_response, status: :created
    else
      render json: { errors: response.parsed_response, status: 'failure' }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1

  def destroy
    id = params[:id]
    response = HTTParty.delete("http://localhost:4000/users/#{id}")
  
    if response.success?
      render json: { message: "Todo with ID #{id} deleted successfully." }, status: :ok
    else
      render json: { error: "Failed to delete todo with ID #{id}." }, status: :unprocessable_entity
    end
  end  

  private

    def set_todo
      @todo = Todo.find_by(id: params[:id])
      render json: { error: "Todo with ID #{params[:id]} not found." }, status: :not_found unless @todo
    end

    def todo_params
      params.permit(users: [:todo])
    end

end
