class Games < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.string   :type
  		t.boolean  :finished
  		t.string   :winner
  		t.integer  :moves

  		t.timestamps
  	end
  end
end
