define(['require', 'exports', 'module'], function( require, exports, module ) {

function property_db(){

	this.database = "";
	var $this = this;

	this.init = function(){
	return function(promise){
		 var db;
		 window.indexedDB = window.indexedDB || window.mozIndexedDB || 
         window.webkitIndexedDB || window.msIndexedDB;
         
         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction || 
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
         window.msIDBKeyRange
         
         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
     	var request = window.indexedDB.open("newDatabase11", 4);
		
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            promise(db)
         };

         request.onupgradeneeded = function(event) {
         	var db = event.target.result;
         	var propertyStore = db.createObjectStore("properties", {keyPath: "id"});
         	
         	var unitStore = db.createObjectStore("units", {keyPath: "id"});
         	
         	unitStore.createIndex("property_id", "property_id", {
         		unique : false,
         		multiEntry : true
         	});

         	var tenantStore = db.createObjectStore("tenancies", {keyPath: "id"});
         	
         	tenantStore.createIndex("property_id", "property_id", {
         		unique : false,
         		multiEntry : true
         	});
         	
         	tenantStore.createIndex("unit_id", "unit_id", {
         		unique : false,
         		multiEntry : true
         	});

         	console.log("upgrade")
         }
	}
}


	this.getCountAll = function(table_name){
		return function(promise){
			var store = $this.database.transaction([table_name]).objectStore(table_name);
			var count = store.count();
			count.onsuccess = function() {
		    	promise(count.result);
			}
		}
	}

	this.getCountIndex = function(table_name, index_name, value){
		return function(promise){
			const transaction = $this.database.transaction([table_name]);
			const invStore = transaction.objectStore(table_name);
		    const vendorIndex = invStore.index(index_name);
		    const count = vendorIndex.count(value);
		    count.onsuccess = function(){
		    	promise(count.result)
		    }
		}
	}

	this.addData = function(table_name, type, obj){
		return function(promise){
			var write = $this.database.transaction([table_name], type)
				.objectStore(table_name)
				.add(obj)
			write.onsuccess = function(e) {
	           	promise(e.target.result)
	        };
		}
	}

	this.getResults = function(table_name, func){
		var objectStore = $this.database.transaction(table_name).objectStore(table_name);
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor){
				func(cursor);
				cursor.continue();
			}
		}
	}

	this.getResultIndex = function(table_name, index_name, value){
		return function(promise){
			const transaction = $this.database.transaction([table_name]);
			const invStore = transaction.objectStore(table_name);
		    const vendorIndex = invStore.index(index_name);
		    const keyRng = IDBKeyRange.only(value);
		    const cursorRequest = vendorIndex.openCursor(keyRng);
		    cursorRequest.onsuccess = function(e){
	        const cursor = e.target.result;
	        	if (cursor) {
	        		promise(cursor)
	            	cursor.continue();
	        	}
	    	}

	    	cursorRequest.onerror = function(e){
	    		console.log("error")
	    	}
		}
		
	}

	this.parallel = async (a) => {
		var _res = [];
		for(var i in a){
			var p = new Promise((resolve, reject) => {
				var o = a[i]
				o((data) => {
					resolve(data)
				})
			})

			_res.push(p)
		}
		var all = Promise.all(_res)
		return await all
	}

}


exports.property_db = function(){
	return new property_db();
}

});