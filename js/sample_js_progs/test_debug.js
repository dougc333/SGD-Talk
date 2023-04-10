var foo = (function () {
	var privateVar = 10;
	return {
		publicFunc: function () {/*...*/},
		debug: function () {
			debugger;
		}
	};
}());