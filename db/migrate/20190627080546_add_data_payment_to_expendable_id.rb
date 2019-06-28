class AddDataPaymentToExpendableId < ActiveRecord::Migration[5.2]
  def change

    add_reference :payments, :expendable, foreign_key: true
  end
end
