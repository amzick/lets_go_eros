class RenameRacesToEthnicities < ActiveRecord::Migration[5.1]
  def change
    rename_table :races, :ethnicities
    rename_table :races_joins, :ethnicities_joins
  end
end
