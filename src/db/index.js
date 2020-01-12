import Dexie from 'dexie';

const db = new Dexie("users");
db.version(2).stores({
  users: '[login+password]'
});

export default db;