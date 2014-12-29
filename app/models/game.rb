class Game < ActiveRecord::Base
	has_and_belongs_to_many :users

	def users_info
		self.users.map do |user|
			{ user_id: user.id,
				username: user.username
			}
		end
	end
end