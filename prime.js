
(function(global) {

    "use strict";

    function drawArc(context, x, y, val) {
        var c = val.factors, color,
            r = size; //< startSize ? startSize : size;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);

        if( c < 3) {
            color = "#08306b";
        } else if( c < 8) {
            color = "#2171B5"; 
        } else if( c < 32) {
            color = "#6BAED6";
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

    function totalDivisors(val, callback) {
        workerController.execute({val: val, id: 0}, callback);       
    }

    function genValues() {
        
        generatingValues = true;

        n = Math.ceil(Math.pow(width / (size * 2), 2));

        console.log(n);

        iterations++;

        for(var i=m; i < n; i++) {            
            key = x + 'x' + y;
           
            switch(dir) {
                case 0: // right
                    key = (x) + 'x' + (y-1);
                    if(!map[key]) {
                        y--;
                        map[key] = { i: i };
                        dir = 1; //Switch to up
                    } else {
                        key = (++x) + 'x' + y;
                        if(!map[key]) {
                            map[key] = { i: i };
                        }
                    }
                    break;
                case 1: // up
                    key = (x - 1) + 'x' + y;
                    if(!map[key]) {
                        x--;
                        map[key] = { i: i };
                        dir = 2; //Switch to left
                    } else {
                        key = x + 'x' + (--y);
                        if(!map[key]) {
                            map[key] = { i: i };
                        }
                    }
                    break;
                case 2: // left
                    key = x + 'x' + (y + 1); 
                    if(!map[key]) {
                        y++;
                        map[key] = { i: i };
                        dir = 3; //Switch to down
                    } else {
                        key = (--x) + 'x' + y;
                        if(!map[key]) {
                           map[key] = { i: i };
                        }
                    }
                    break;
                case 3: // down
                    key = (x+1) + 'x' + y;
                    if(!map[key]) {
                        x++;
                        map[key] = { i: i };
                        dir = 0; //Switch to right
                    } else {
                        key = x + 'x' + (++y);
                        if(!map[key]) {
                            map[key] = { i: i };
                        }
                    }
                    break;
            } // End switch

            orderedValues[i] = key;
            m = n;
        } // End loop

        generatingValues = false;	
    }

    function drawValues() {
        var x, y, val, attr;

        context.clearRect(0, 0, width - 20, height - 20);

        renderProcess = orderedValues.length;

        for(var i = 1; i < orderedValues.length; i++) {
            val = orderedValues[i];
            x = val.substring(0, val.indexOf('x'));
            y = val.substring(val.indexOf('x')+1);
            attr = map[val];

            if(!attr.factors) {
                workerController.execute({
                    id: 0,
                    val: attr.i,
                    x: x,
                    y: y,
                    attr: attr
                }, drawValue);                             
            } else {            
                drawArc(context, (size*2)*x + (width/2), (size*2)*y + (height/2), attr);
                renderProcess--;
            }            
        }

    }

    function drawValue(data) {
        drawArc(context, (size*2)*data.x + (width/2), (size*2)*data.y + (height/2), data.attr);
        renderProcess--;
    }

    var position = {},
        n = 7000, 
        m = 1, 
        startSize = 2, 
        size = startSize, 
        scale = 1, 
        iterations = 0,
        label = false,
        renderProcess = 0,
        generatingValues = false,
        width = document.body.clientWidth,
        height = document.body.clientHeight;

	var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');    

    context.font = 'italic 10px Calibri';
    canvas.width = width - 20;
    canvas.height = height - 20;

	var val, key, x = 0, y = 0, dir = 0;
    var map = {},
        orderedValues = window.vals = [];
    
    genValues();
    drawValues(); 

    var scrollTimeout;

    window.onmousewheel = function(e) {           

        if(renderProcess > 1 || generatingValues) {            
            console.log("halt render", renderProcess);            
            // drawValues();
            return;
        }   

        size = size + (e.wheelDelta / 500);

        console.log("rerender", renderProcess);

        if(scrollTimeout) clearTimeout(scrollTimeout);     
        
        scrollTimeout = setTimeout(function() {
            genValues();
            drawValues();              
        },200);
    };

})(this);
