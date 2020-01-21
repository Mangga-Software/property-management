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
     	var request = window.indexedDB.open("newDatabase2", 4);
		
         request.onerror = function(event) {
            console.log("error: ");
         };
         
         request.onsuccess = function(event) {
            db = request.result;
            promise(db)
            console.log("success: "+ db);
         };

         request.onupgradeneeded = function(event) {
         	var db = event.target.result;
         	var propertyStore = db.createObjectStore("properties", {keyPath: "id"});
         	var unitStore = db.createObjectStore("units", {keyPath: "id"});
         	var tenantStore = db.createObjectStore("tenancies", {keyPath: "id"});
         	console.log("upgrade")

         }
	}
}


	this.getCount = function(table_name){
		return function(promise){
			var store = $this.database.transaction([table_name]).objectStore(table_name);
			var count = store.count();
			count.onsuccess = function() {
		    	promise(count.result);
			}
		}
	}

	this.addProperty = function(obj){
		return function(promise){
			var write = $this.database.transaction(["properties"], "readwrite")
				.objectStore('properties')
				.add(obj)
			write.onsuccess = function(e) {
	           	promise(e.target.result)
	        };
		}
	}

	this.getProperties = function(table_name, func){
		var objectStore = $this.database.transaction(table_name).objectStore(table_name);
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if(cursor){
				func(cursor);
				cursor.continue();
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