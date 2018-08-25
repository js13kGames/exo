// Create Mouse object.
var Mouse = {

	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	click: false,
	drag: false,
	release: false,
	scrollOut: false,
	scrollIn: false,
	target: null,

	update: function() {
		Mouse.click = false;
		Mouse.release = false;
		Mouse.scrollIn = false;
		Mouse.scrollOut = false;
	},

	overRegion: function(x, y, w, h) {
		var a = Mouse.x;
		var b = Mouse.y;
		return (a > x && a < x+w && b > y && b < y+h);
	},

	clickRegion: function(x, y, w, h) {
		return Mouse.click && Mouse.overRegion(x, y, w, h);
	}

};

// Update mouse position.
// Can probably remove "rect" stuff if canvas is whole window.
window.addEventListener("mousemove", function(e) {
	var rect = Canvas.getBoundingClientRect();
	Mouse.x = e.clientX - rect.left;
	Mouse.y = e.clientY - rect.top;
	Mouse.vx = (Mouse.x + View.x - Canvas.width / 2) / View.zoom;
	Mouse.vy = (Mouse.y + View.y - Canvas.height / 2) * View.tilt / View.zoom;
	if (Mouse.down) {
		Mouse.drag = true;
	}
}, false);

//
window.addEventListener("mousedown", function(e) {
	Mouse.click = true;
	Mouse.down = true;
}, false);

//
window.addEventListener("mouseup", function(e) {
	Mouse.down = false;
	if (!Mouse.drag) {
		Mouse.release = true;
	}
	Mouse.drag = false;
}, false);

//
window.addEventListener("wheel", function(e) {
	Mouse.scrollOut = e.deltaY > 0;
	Mouse.scrollIn = e.deltaY < 0;
}, false);
