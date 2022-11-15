import { openDB } from 'idb';

//initializes the database
const initdb = async () =>
  openDB('text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text')) {
        console.log('Text database already exists');
        return;
      }
      db.createObjectStore('text', { keyPath: 'id', autoIncrement: true });
      console.log('Text database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log('PUT to the database');
    const textDB = await openDB('text', 1);
    const transaction = textDB.transaction('text', 'readwrite');
    const store = transaction.objectStore('text');
    //make sure this matches the text entries syntax
    const request = store.put({ content });
    const result = await request;
    console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log('GET all from the database');
    const textDB = await openDB('text', 1);
    const transaction = textDB.transaction('text', 'readonly');
    const store = transaction.objectStore('text');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
};
initdb();
