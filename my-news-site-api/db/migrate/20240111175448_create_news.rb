class CreateNews < ActiveRecord::Migration[7.1]
  def change
    create_table :news do |t|
      t.string :title
      t.text :content
      t.boolean :published
      t.datetime :publish_date

      t.timestamps
    end
  end
end
