class RenameEthnicitiesColumns < ActiveRecord::Migration[5.1]
  def change
    rename_column :ethnicities, :race, :ethnicity
    rename_column :ethnicities_joins, :race_id, :ethnicity_id
  end
end
