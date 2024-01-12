class RenameAdminsToAdminAccounts < ActiveRecord::Migration[7.1]
  def change
    rename_table :admins, :admin_accounts
  end
end
