class Rack::Attack

  Rack::Attack.blocklisted_response = lambda do |env|
    # Using 503 because it may make attacker think that they have successfully
    # DOSed the site. Rack::Attack returns 403 for blocklists by default
    [ 503, {}, ['Blocked']]
  end

  # PHPファイルへのアクセスを防ぐ
  Rack::Attack.blocklist('bad-robots') do |req|

    req.ip if req.path =~ /\S+\.php/
  end
end
