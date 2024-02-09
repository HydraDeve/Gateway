function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const generateProductKey = async (chars_count, segments_count) => {
	var tokens = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
		chars = chars_count,
		segments = segments_count,
		keyString = '';

	for (var i = 0; i < segments; i++) {
		var segment = '';

		for (var j = 0; j < chars; j++) {
			var k = getRandomInt(0, 35);
			segment += tokens[k];
		}

		keyString += segment;

		if (i < segments - 1) {
			keyString += '-';
		}
	}

	return keyString;
};
