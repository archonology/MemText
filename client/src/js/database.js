import { openDB } from 'idb';

//initializes the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// puts content and adds it to the database
export const putDb = async (content) => {
    console.log('PUT to the database');
    const jateDB = await openDB('jate', 1);
    const transaction = jateDB.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate');
    //make sure this matches the jate entries syntax
    const request = store.put({ content });
    const result = await request;
    console.log('Data saved to the database', result);
};

// gets all the content from the database
export const getDb = async () => {
    console.log('GET all from the database');
    const jateDB = await openDB('jate', 1);
    const transaction = jateDB.transaction('jate', 'readonly');
    const store = transaction.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result.value);
    return result.value;
};

initdb();
