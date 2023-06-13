# class Todo < ApplicationRecord
# end

require 'net/http'
require 'json'

class Todo < ApplicationRecord
  def self.fetch_from_api
    uri = URI('http://localhost:4000/users')
    # uri = URI('https://jsonplaceholder.typicode.com/todos')
    response = Net::HTTP.get(uri)
    JSON.parse(response)
  end
end
