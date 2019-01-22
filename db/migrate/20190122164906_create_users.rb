class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, null:false
      t.string :fname, null:false
      t.string :password_digest, null:false
      t.string :session_token, null:false
      t.date :birthday, null:false
      t.integer :location, null:false
      t.text :summary
      t.integer :height_in_inches

      t.timestamps
    end
    add_index :users, [:email, :fname, :location]
  end
end
