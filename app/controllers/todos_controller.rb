class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update destroy ]

  # GET /todos
  def index
    todos = Todo.fetch_from_api
    render json: todos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos

  def create
    todo = Todo.new(todo_params)
    if todo.save
      send_to_json_server(todo)
      render json: todo, status: :created
    else
      render json: { errors: todo.errors.full_messages, status: 'failure' }
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
    @todo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    # def todo_params
    #   params.fetch(:todo, {})
    # end

    def todo_params
      params.fetch(:todo)
      params.require(:todo).permit(:task, :id) 
    end

    def send_to_json_server(todo)

      uri = URI('http://localhost:4000/users') 
      http = Net::HTTP.new(uri.host, uri.port)
      request = Net::HTTP::Post.new(uri.path, { 'Content-Type': 'application/json' })
      request.body = data.to_json
      response = http.request(request)
      
      if response.is_a?(Net::HTTPSuccess)
        puts 'Data sent to JSON server successfully!'
        puts 'Response:', response.body
      else
        puts 'Error sending data to JSON server:', response.message
      end

      # payload = todo.to_json
      # headers = { 'Content-Type': 'application/json' }
      
      # begin
      #   response = Axios.post('http://localhost:4000/users', payload, headers)
      #   logger 'Data sent to JSON server successfully!'
      #   logger 'Response:', response.data
      # rescue StandardError => e
      #   puts 'Error sending data to JSON server:', e.message
      # end
    end
end
