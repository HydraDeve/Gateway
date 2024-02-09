import requests
import time
import base64


# Your details
license = "YOUR_LICENSE_KEY"
product = "YOUR_PRODUCT_NAME"
version = "YOUR_PRODUCT_VERSION"
public_api_key = "YOUR_PUBLIC_API_KEY"
url = "http://YOUR_IP/api/client"


# Authorization header
headers = {'Authorization': public_api_key}

# JSON body
data = {'licensekey': license, 'product': product, 'version': version}

response = requests.post(url, headers=headers, json=data)

# Get "status" from response
status = response.json()['status_overview']


if status == "success":

    # Get hash from response
    hash = response.json()['status_id']

    # Split hash
    hash_split = hash.split('694201337')
    


    # ---> Text based validation <---

    # Base64 decode the hash_split[0]
    decoded_hash = base64.b64decode(hash_split[0]).decode('utf-8')
    
    # Check if decoded_hash is not string asdasddsa
    
    # Get 2 first characters of "license"
    license_first = license[:2]

    # Get 2 last characters of "license"
    license_last = license[-2:]

    # Get 2 first characters of public_api_key
    public_api_key_split = public_api_key[:2]

    if decoded_hash != f"{license_first}{license_last}{public_api_key_split}":
        print("Authentication failed")
        exit()


    # ---> Time based validation <---
    epoch = time.time()
    epoch_seconds = str(int(epoch - epoch % 1))[:-2]

    if (int(epoch_seconds) - int(hash_split[1])) > 1:
        print("Authentication failed")
        exit()


    print("Successful authentication")
else:
    print("Authentication failed")
    # Stop the app
    exit()





