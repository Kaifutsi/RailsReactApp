class AddHiddenToNews < ActiveRecord::Migration[7.1]
  def change
    add_column :news, :hidden, :boolean, default: false
  end
end
