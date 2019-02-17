class AddLatLongToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :lat, :float
    add_column :users, :lng, :float
    add_column :users, :interests, :text
  end
end
