PerformHttpRequest(
    "https://<domain>/api/client",
    function(errorCode, resultData, headers)
        data = json.decode(resultData)
        if data.status_overview == "success" then
        print("[Licensing] Authorization Success!")
        if data.version ~= "<CurrentVersionNumber>" then
            print("[Version Master] Your Version is outdated!")
            print("[Version Master] New Version: " .. data.version)
        end
    else
        print("[Licensing] Authorization Failed!")
        print("[Licensing] You are NOT authorized to use this script...!")
    end
    end,
    "POST",
    json.encode({licensekey = 'LICENSEKEY_FROM_CONFIG', version= 'YOUR_SCRIPT_VERSION', product = 'YOUR_SCRIPT_NAME'}), {['Content-Type'] = 'application/json', ['Authorization'] = 'YOUR_PUBLIC_API_KEY'}) 