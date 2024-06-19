import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let dbInstance: Database | null = null;

export async function getDbInstance(): Promise<Database> {
	if (dbInstance) {
		return dbInstance;
	}

	dbInstance = await open({
		filename: './notes.db',
		driver: sqlite3.Database
	});

	await dbInstance.exec(`
    DROP TABLE IF EXISTS
  `);

	await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL
    )
  `);

	return dbInstance;
}
