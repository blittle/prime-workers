
self.onmessage = function(event) {

	var val = event.data.val;

	var factors = 1;

    for(var i = Math.ceil(val/2); i > 0; i--) {
        if (!(val % i)) factors++;
    }

    event.data.attr.factors = factors;

  	self.postMessage(event.data);
};