require 'csv'

CSV.generate(encoding: Encoding::SJIS, row_sep: "\r\n", force_quotes: true) do |csv|
  headers = %w(
  )
  csv << headers
  .each_with_index do |r, index|
    values = [
    ]
    csv << values
  end
end
