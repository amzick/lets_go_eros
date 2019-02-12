class CreateHearts < ActiveRecord::Migration[5.2]
  def change
    create_table :hearts do |t|
      t.integer :admirer_id, null:false
      t.integer :crush_id, null:false

      t.timestamps
    end
    add_index :hearts, [:admirer_id, :crush_id]
  end
end
