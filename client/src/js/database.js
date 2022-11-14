import { openDB } from 'idb';

//initializes the database
const initdb = async () =>
  openDB('mem_text', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('mem_text')) {
        console.log('mem_text database already exists');
        return;
      }
      db.createObjectStore('mem_text', { keyPath: 'id', autoIncrement: true });
      console.log('mem_text database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  if (content) {
    console.log('PUT to the database');
    const textDB = await openDB('text', 1);
    const transaction = textDB.transaction('text', 'readwrite');
    const store = transaction.objectStore('text');
    //make sure this matches the text entries syntax
    const request = store.put({ id: id, textBody: content });
    const result = await request;
    console.log('Data saved to the database', result);
  }
  console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  if (getDb) {
    console.log('GET all from the database');
    const textDB = await openDB('text', 1);
    const transaction = textDB.transaction('text', 'readonly');
    const store = transaction.objectStore('text');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  }
  console.error('getDb not implemented');
}
initdb();
