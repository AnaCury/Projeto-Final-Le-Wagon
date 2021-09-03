class AddAddressToReports < ActiveRecord::Migration[6.0]
  def change
    add_column :reports, :address, :string, null: false
  end
end
