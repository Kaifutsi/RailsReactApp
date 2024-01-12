class RenameAdminAccountsToAdmins < ActiveRecord::Migration[7.1]
  def change
    rename_table :admin_accounts, :admins
  end
end
