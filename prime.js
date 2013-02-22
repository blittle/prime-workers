
(function(global) {

	"use strict";

    function drawArc(context, x, y, val) {
        var c = val.val, color,
            r = size < startSize ? startSize : size;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);

        if( c < 3) {
            color = "#08306b";
        //} else if( c < 4) {
        //    color = "#08519C";
        } else if( c < 8) {
            color = "#2171B5"; 
        //} else if( c < 16) {
        //    color = "#4292C6";
        } else if( c < 32) {
            color = "#6BAED6";
        //} else if( c < 64) {
        //    color = "#9ECAE1";
        //} else if( c < 128) {
        //    color = "#C6DBEF";
        } else {
            color ="#DEEBF7";
        }

        context.fillStyle = color;
        context.fill();

        if(label) {
            context.fillStyle = 'white';
            context.fillText(val.i, x - (r/2), y );
        }
    }

    function totalDivisors(val) {
        var count = 1;

        for(var i = Math.ceil(val/2); i > 0; i--) {
            if (!(val % i)) count++;
        }

        return count;
    }

    function genValues() {

        iterations++;

        for(var i=(((iterations-1)*n) - 1) + 1; i < (iterations * n); i++) {
            val = totalDivisors(i);
            key = x + 'x' + y;
           
            switch(dir) {
                case 0: // right
                    key = (x) + 'x' + (y-1);
                    if(!map[key]) {
                        y--;
                        map[key] = {
                            val: val,
                            i: i
                        };
                        dir = 1; //Switch to up
                    } else {
                        key = (++x) + 'x' + y;
                        if(!map[key]) {
                            map[key] = {
                                val: val,
                                i: i
                            };
                        }
                    }
                    break;
                case 1: // up
                    key = (x - 1) + 'x' + y;
                    if(!map[key]) {
                        x--;
                        map[key] = {
                            val: val,
                            i: i
                        };
                        dir = 2; //Switch to left
                    } else {
                        key = x + 'x' + (--y);
                        if(!map[key]) {
                            map[key] = {
                                val: val,
                                i: i
                            };
                        }
                    }
                    break;
                case 2: // left
                    key = x + 'x' + (y + 1); 
                    if(!map[key]) {
                        y++;
                        map[key] = {
                            val: val,
                            i: i
                        };
                        dir = 3; //Switch to down
                    } else {
                        key = (--x) + 'x' + y;
                        if(!map[key]) {
                           map[key] = {
                               val: val, 
                               i: i
                           };
                        }
                    }
                    break;
                case 3: // down
                    key = (x+1) + 'x' + y;
                    if(!map[key]) {
                        x++;
                        map[key] = {
                            val: val,
                            i: i
                        };
                        dir = 0; //Switch to right
                    } else {
                        key = x + 'x' + (++y);
                        if(!map[key]) {
                            map[key] = {
                                val: val,
                                i: i
                            };
                        }
                    }
                    break;
            }
        }	
    }

    function drawValues() {
        var x, y;

        context.clearRect(0, 0, document.width - 50, document.height -50);

        for(var val in map) {
            x = val.substring(0, val.indexOf('x'));
            y = val.substring(val.indexOf('x')+1);

            drawArc(context, (size*2)*x + p, (size*2)*y + p, map[val]);
        }

    }

    var position = {},
        n = 7000, startSize = 4, size = startSize, 
        p = 4 * Math.sqrt(n),
        scale = 3, iterations = 0,
        label = false;

	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.font = 'italic 12px Calibri';
    canvas.width = document.width - 50;
    canvas.height = document.height - 50;

	var val, key, x = 0, y = 0, dir = 0;
    var map = {};
    
    genValues();
    drawValues(); 

    window.onclick = function(e) {
        genValues();
        drawValues();    
    }

    window.onmousewheel = function(e) {
    //    size = (e.wheelDelta / 1000) + scale;
    //    drawValues();
    };

})(this);
