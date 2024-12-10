
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export async function initDatabase(db) {
  const DATABASE_VERSION = 1;
  
  try {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS recipe_steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        step_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT
      );
    `);
    
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export async function saveSteps(db, steps) {
  try {
    // Clear existing steps
    await db.execAsync('DELETE FROM recipe_steps');
    
    // Insert new steps
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      await db.runAsync(
        'INSERT INTO recipe_steps (step_number, title, description, image) VALUES (?, ?, ?, ?)',
        [i + 1, step.title, step.description, step.image]
      );
    }
    return true;
  } catch (error) {
    console.error('Error saving steps:', error);
    return false;
  }
}