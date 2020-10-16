# WickedPDF Global Configuration
#
# Use this to set up shared configuration options for your entire application.
# Any of the configuration options shown here can also be applied to single
# models by passing arguments to the `render :pdf` call.
#
# To learn more, check out the README:
#
# https://github.com/mileszs/wicked_pdf/blob/master/README.md

# 暫定的に仕方なく
# 本当は path = Rails.env == 'production' || 'development'
# がしたい
path = ''
path = '/home/media/wkhtmltopdf_binary_gem/bin/wkhtmltopdf_centos_6_amd64' if Rails.env == 'production'
path = '/home/media/wkhtmltopdf_binary_gem/bin/wkhtmltopdf_centos_6_amd64' if Rails.env == 'staging'
path =  '/usr/local/bin/wkhtmltopdf' if Rails.env == 'development'
WickedPdf.config = {
  # Path to the wkhtmltopdf executable: This usually isn't needed if using
  # one of the wkhtmltopdf-binary family of gems.
  # exe_path: '/usr/local/bin/wkhtmltopdf',
  #   or
  # exe_path: Gem.bin_path('wkhtmltopdf-binary', 'wkhtmltopdf')

  # Layout file to be used for all PDFs
  # (but can be overridden in `render :pdf` calls)
  # layout: 'pdf.html',
  exe_path: path
}
