class CreateRacesJoins < ActiveRecord::Migration[5.1]
  def change
    create_table :races_joins do |t|
      t.integer :user_id, null:false
      t.integer :race_id, null:false
    end
    add_index :races_joins, [:user_id, :race_id]
  end
end
