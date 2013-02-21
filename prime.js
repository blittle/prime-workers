function drawArc(layout, x, y, r) {
	var circle = layout.circle(x, y, r);
	// Sets the fill attribute of the circle to red (#f00)
	circle.attr("fill", "blue").attr("stroke", "blue");
}	

function totalDivisors(val) {
	var count = 0;

	for(var i = val; i > 0; i--) {
		if (!(val % i)) count++;
	}

	return count;
}

function getPosition(val, a, b) {
	return {
		x: a * Math.cos(val) / val,
		y: a * Math.sin(val)
	}
}

(function(global) {

	"use strict";

	var height = document.height,
		width  = document.width,
		position = {},
		a = 500, b = 500;

	var layout = Raphael(0, 0, width, height);

	var val;

	for(var i=1; i < 5000; i++) {
		val = totalDivisors(i);
		position = getPosition( (Math.PI * val *20) / 180, a, b);
		drawArc(layout, position.x + 300, position.y + 300, val);
	}	

})(this);