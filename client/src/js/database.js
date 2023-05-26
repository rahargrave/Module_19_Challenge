import { openDB } from 'idb';

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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database and version we want to use.
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Add the content to the object store
  const id = await store.add({content});

  // Wait for completion of the transaction with await
  await tx.complete;
  console.log(`Added item with ID ${id}`);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and version we want to use.
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get all the objects from the object store
  const result = await store.getAll();

  // Wait for completion of the transaction with await
  await tx.complete;
  console.log('result.value', result);
  return result;
};


initdb();
