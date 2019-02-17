class CreateMatchPercentages < ActiveRecord::Migration[5.2]
  def change
    create_table :match_percentages do |t|
      t.integer :user_id, null:false
      t.integer :match_id, null:false
      t.integer :percentage, null:false

      t.timestamps
    end
    add_index :match_percentages, [:user_id, :match_id]
  end
end
