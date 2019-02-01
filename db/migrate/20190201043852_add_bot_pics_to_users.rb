class AddBotPicsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :bot_img_src, :string
  end
end
