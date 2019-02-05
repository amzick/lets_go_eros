class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.integer :sender, null:false
      t.integer :recipient, null:false
      t.boolean :unread, null:false, default:true
      t.text :message, null:false

      t.timestamps
    end
    add_index :messages, [:sender, :recipient]
  end
end
