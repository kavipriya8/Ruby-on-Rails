Rails.application.routes.draw do
  resources :todos, only: [:index, :create, :show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'todos', to: proc { |env|
    url = URI.parse('http://localhost:4000/users') # adjust the URL based on your JSON server setup
    req = Net::HTTP::Post.new(url.path)
    req.set_form_data(env['rack.input'].gets)
    res = Net::HTTP.start(url.host, url.port) { |http| http.request(req) }
    [res.code, {}, [res.body]]
  }
end
