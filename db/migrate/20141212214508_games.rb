class Games < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.boolean	 :active
  		t.boolean  :finished
  		t.string   :winner
  		t.integer  :moves
  		t.string	 :train
  		t.string	 :boneyard
  		t.string	 :hand1
  		t.string	 :hand2
  		t.string   :hand3
  		t.string   :hand4
  		
  		t.timestamps
  	end
  end
end
