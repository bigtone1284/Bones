class User < ActiveRecord::Base
  has_secure_password
  has_and_belongs_to_many :games
  validates_presence_of :username, :password
  validates_uniqueness_of :username
end 