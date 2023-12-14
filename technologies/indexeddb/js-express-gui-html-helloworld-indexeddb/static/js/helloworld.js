const dbName = 'HelloWorldDB';
const dbVersion = 1;
const request = indexedDB.open(dbName, dbVersion);

// On Error
request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

// On first run or update version
request.onupgradeneeded = function () {
    const db = request.result;
    db.createObjectStore("messages", { keyPath: "id" });
};

// On database is open
request.onsuccess = function () {
    
    const db = request.result;
    const transaction = db.transaction("messages", "readwrite");    
    const store = transaction.objectStore("messages");

    store.put({ id: 1, message: "Hello World!" });
    
    const idQuery = store.get(1);  
    idQuery.onsuccess = function () {
        const message = idQuery.result.message;
        const messageEl = document.querySelector('#message');
        messageEl.innerHTML = message
    };
  
    transaction.oncomplete = function () {
      db.close();
    };

  };