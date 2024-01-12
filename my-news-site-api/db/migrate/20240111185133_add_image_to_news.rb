class AddImageToNews < ActiveRecord::Migration[7.1]
  def change
    add_column :news, :image, :string
  end
end
