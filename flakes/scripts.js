window.onload = function () {
	var canvas = document.getElementById("sky");
	var ctx = canvas.getContext("2d");

	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	var mf = 100;
	var flakes = [];

	for (var i = 0; i < mf; i++) {
		flakes.push({
			x: Math.random() * W,
			y: Math.random() * H,
			r: Math.random() * 5 + 3, // min of 2px and max of 7px radius
			d: Math.random() + 1, // density of flake
		});
	}

	// draw flakes on canvas
	function drawFlakes() {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = "white";
		ctx.beginPath();
		for (var i = 0; i < mf; i++) {
			var f = flakes[i];
			ctx.moveTo(f.x, f.y);
			ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
		}
		ctx.fill();
		moveFlakes();
	}

	var angle = 0;
	function moveFlakes() {
		angle += 0.01;
		for (var i = 0; i < mf; i++) {
			var f = flakes[i];

			f.y += Math.pow(f.d, 2) + 1;
			f.x += Math.sin(angle) * 2;

			if (f.y > H) {
				flakes[i] = { x: Math.random() * W, y: 0, r: f.r, d: f.d };
			}
			if (f.x > W) {
				flakes[i] = { x: 0, y: f.y, r: f.r, d: f.d };
			}
            if (f.x < 0) {
				flakes[i] = { x: W, y: f.y, r: f.r, d: f.d };
            }
		}
	}
	setInterval(drawFlakes, 25);
};
