require 'pagy/extras/array'
require 'pagy/extras/out_of_range'
require 'pagy/extras/navs'

Pagy::VARS[:items] = 50
Pagy::VARS[:size] = [1, 2, 3, 1]
Pagy::VARS[:out_of_range_mode] = :exception
