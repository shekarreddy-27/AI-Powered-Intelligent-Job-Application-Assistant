import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'notifications.db');

let db;

export const initDb = async () => {
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const filebuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
    db.run(`
      CREATE TABLE notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        isRead INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    db.run("INSERT INTO notifications (title, message) VALUES (?, ?)", ['Welcome', 'Welcome to CareerAgentAI! Setup your profile to get started.']);
    db.run("INSERT INTO notifications (title, message) VALUES (?, ?)", ['Interview Update', 'Google has responded to your application.']);
    db.run("INSERT INTO notifications (title, message) VALUES (?, ?)", ['New Match', 'Stripe is looking for a Full Stack Engineer.']);
    saveDb();
  }
  return db;
};

export const getDb = () => db;
export const saveDb = () => {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
};
