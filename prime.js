
(function(global) {

	"use strict";

    function drawArc(context, x, y, r, i) {
        context.beginPath();
        context.arc(x, y, size < startSize ? startSize : size, 0, 2 * Math.PI, false);
        var color = r === 2 ? "red" : "#"+(16777215 - Math.ceil(10000 * Math.log(r)) ).toString(16);
        
        context.fillStyle = color;
        context.fill();
 //       context.fillStyle = 'black';
  //      context.fillText(i, x, y);
    }	

    function totalDivisors(val) {
        var count = 0;

        for(var i = val; i > 0; i--) {
            if (!(val % i)) count++;
        }

        return count;
    }

    function drawValues() {

        context.clearRect(0, 0, window.width - 50, window.height -50);

        for(var i=1; i < n; i++) {
            val = totalDivisors(i);
            key = x + 'x' + y;
           
            switch(dir) {
                case 0: // right
                    key = (x) + 'x' + (y-1);
                    if(!map[key]) {
                        y--;
                        map[key] = val;
                        dir = 1; //Switch to up
                    } else {
                        key = (++x) + 'x' + y;
                        map[key] = val;
                    }
                    break;
                case 1: // up
                    key = (x - 1) + 'x' + y;
                    if(!map[key]) {
                        x--;
                        map[key] = val;
                        dir = 2; //Switch to left
                    } else {
                        key = x + 'x' + (--y);
                        map[key] = val;
                    }
                    break;
                case 2: // left
                    key = x + 'x' + (y + 1); 
                    if(!map[key]) {
                        y++;
                        map[key] = val;
                        dir = 3; //Switch to down
                    } else {
                        key = (--x) + 'x' + y;
                        map[key] = val;
                    }
                    break;
                case 3: // down
                    key = (x+1) + 'x' + y;
                    if(!map[key]) {
                        x++;
                        map[key] = val;
                        dir = 0; //Switch to right
                    } else {
                        key = x + 'x' + (++y);
                        map[key] = val;
                    }
                    break;
            }

            drawArc(context, (size*2)*x + p, (size*2)*y + p, val, i);
        }	
    }

    var position = {},
        n = 5000, startSize = 10, size = startSize, 
        p = 6 * size;

	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.font = 'italic 12px Calibri';
    canvas.width = document.width - 50;
    canvas.height = document.height - 50;

	var val, key, x = 0, y = 0, dir = 0;
    var map = {};
    
    drawValues();
    
    window.onmousewheel = function(e) {
        size = Math.abs(e.wheelDelta) / 100 * startSize;
        drawValues();
    };


})(this);
