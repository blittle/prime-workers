(function(global) {

	"use strict";

	var WorkerController = function(options) {

		// An internal array of each WebWorker instance
		this._workers = [];

		this._callbacks = [];

		// An index representing the next worker instance to get a job
		this._index = 0;

		this._callbackId = 1;

		this.options = options || {
			threads: 4
		};

		var threads = this.options.threads,
			scope   = this;

		while(threads--) {
			var worker = new Worker('worker.js');
			worker.onmessage = function(event) {
				scope._callbacks[event.data.id].call(scope, event.data);
			};
			this._workers.push(worker);
		}
	};

	WorkerController.prototype = {

		setThreadCount: function(count) {
			this.options.threads = count;
		},

		execute: function(msg, callback) {

			var id = msg.id,
				index = this._index;

			this._callbacks[id] = callback;

			this._index = index === this.options.threads - 1 ? 0 : index + 1;

			this._workers[index].postMessage(msg);
		}		

	};

	global.WorkerController = WorkerController;

})(this);

var workerController = new WorkerController();