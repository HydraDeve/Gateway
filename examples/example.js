// Im using axios to make HTTP request, but you can use whatever you want to!
// https://www.npmjs.com/package/axios
const axios = require('axios');

// Startup function you probably want to have in own file. Can be on the same file also.
const startup = async () => {
	// Your details here
	const url = 'http://YOUR_IP/api/client';
	const licensekey = 'YOUR_LICENSE_KEY'; // You most likely want to get this from config etc.
	const product = 'YOUR_PRODUCT_NAME';
	const version = 'YOUR_PRODUCT_VERSION';
	const public_api_key = 'YOUR_PUBLIC_API_KEY';

	try {
		// Make the request to license server
		const res = await axios.post(
			url,
			{
				licensekey,
				product,
				version,
			},
			{
				headers: { Authorization: public_api_key },
			}
		);

		// Validate request body
		if (!res.data.status_code || !res.data.status_id) {
			console.log('Invalid authentication');
			return process.exit(1);
		}

		// Verify authentication
		if (res.data.status_overview !== 'success') {
			console.log('Authentication failed');
			console.log(res.data.status_msg);
			return process.exit(1);
		}

		const hash = res.data.status_id;

		// Split hash
		const hash_split = hash.split('694201337');

		// ---> Text based validation <---

		// Base64 decode the hash_split[0]
		const decoded_hash = Buffer.from(hash_split[0], 'base64').toString();

		// Get 2 first chars of licensekey
		const license_first = licensekey.substr(0, 2);

		// Get 2 last chars of licensekey
		const license_last = licensekey.substr(licensekey.length - 2);

		// Get 2 first characters of public_api_key
		const public_api_key_first = public_api_key.substr(0, 2);

		if (
			decoded_hash !==
			`${license_first}${license_last}${public_api_key_first}`
		) {
			console.log('Authentication failed');
			return process.exit(1);
		}

		// ---> Time based validation <---

		// Get epoch time
		let epoch_time_full = Math.floor(Date.now() / 1000);

		// Remove 2 last characters of epoc_time
		const epoch_time = epoch_time_full
			.toString()
			.substr(0, epoch_time_full.toString().length - 2);

		if (parseInt(epoch_time) - parseInt(hash_split[1]) > 1) {
			console.log('Authentication failed');
			return process.exit(1);
		}

		console.log('Successful authentication');
	} catch (err) {
		console.log('Authentication failed');
		console.log(error);
		process.exit(1);
	}
};

// Call the startup function
startup();
