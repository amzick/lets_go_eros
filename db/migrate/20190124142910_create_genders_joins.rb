class CreateGendersJoins < ActiveRecord::Migration[5.1]
  def change
    create_table :genders_joins do |t|
      t.integer :user_id, null:false
      t.integer :gender_id, null:false
    end
    add_index :genders_joins, [:user_id, :gender_id]
  end
end
