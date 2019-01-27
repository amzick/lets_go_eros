class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :question, null:false
      t.boolean :inversion, null:false, default:false
      t.integer :category_id, null:false

      t.timestamps
    end
  end
end
