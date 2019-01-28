class ChangeLocationToString < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :location, :string
  end
end
