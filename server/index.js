import express from 'express';
import cors from 'cors';
import { initDb, getDb, saveDb } from './db.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

initDb().then(() => {
  console.log("Database initialized");

  // Get all unread notifications
  app.get('/api/notifications', (req, res) => {
    try {
      const db = getDb();
      const stmt = db.prepare('SELECT * FROM notifications WHERE isRead = 0 ORDER BY createdAt DESC');
      const notifications = [];
      while (stmt.step()) {
        notifications.push(stmt.getAsObject());
      }
      stmt.free();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mark notification as read
  app.post('/api/notifications/:id/read', (req, res) => {
    try {
      const { id } = req.params;
      const db = getDb();
      db.run('UPDATE notifications SET isRead = 1 WHERE id = ?', [id]);
      saveDb();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Notification server listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to initialize database", err);
});
