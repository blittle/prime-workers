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

function changeDir(dir) {
    return dir === 3 ? 0 : dir++;
}

(function(global) {

	"use strict";

	var height = document.height,
		width  = document.width,
		position = {},
		a = 500, b = 500;

	var layout = Raphael(0, 0, width, height);

	var val, key, x = 0, y = 0, dir = 0;
    var map = {};

	for(var i=1; i < 5000; i++) {
        val = totalDivisors(i);
        key = x + 'x' + y;
       
        switch(dir) {
            case 0: // right
                key = (x) + 'x' + (y+1);
                if(!map[key]) {
                    y++;
                    map[key] = val;
                    dir = 1;
                } else {
                    key = (x++) + 'x' + y;
                    map[key] = val;
                }
                break;
            case 1: // up
                key = (x - 1) + 'x' + y;
                if(!map[key]) {
                    x--;
                    map[key] = val;
                    dir = 2;
                } else {
                    key = x + 'x' + (y++);
                    map[key] = val;
                }
                break;
            case 2: // left
                key = x + 'x' + (y - 1); 
                if(!map[key]) {
                    y--;
                    map[key] = val;
                    dir = 3;
                } else {
                    key = (x--) + 'x' + y;
                    map[key] = val;
                }
                break;
            case 3: // down
                key = (x+1) + 'x' + y;
                if(!map[key]) {
                    x++;
                    map[key] = val;
                    dir = 0;
                } else {
                    key = (x++) + 'x' + y;
                    map[key] = val;
                }
                break;
        }

		drawArc(layout, 5*x + 200, 5*y + 100, 1);
	}	

})(this);
