import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDbInstance } from '../database/connection';
import { Note } from '../models/note';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/notes', async (req: Request, res: Response) => {
	try {
		const db = await getDbInstance();
		const notes: Note[] = await db.all('SELECT * FROM notes ORDER BY id DESC');
		res.json(notes);
	} catch (e) {
		console.error('Error fetching notes:', e);
		res.status(500).send('Internal Server Error');
	}
});

app.post('/notes', async (req: Request, res: Response) => {
	const { content } = req.body;
	if (!content) {
		return res.status(400).send('Content is required');
	}
	try {
		const db = await getDbInstance();
		const result = await db.run('INSERT INTO notes (content) VALUES (?)', content);
		if (result.lastID === null) {
			return res.status(500).send('Internal Server Error');
		}
		const newNote = new Note(result.lastID!, content);
		res.status(201).json(newNote);
	} catch (e) {
		console.error('Error adding note:', e);
		res.status(500).send('Internal Server Error');
	}
});

app.delete('/notes/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).send('ID is required');
	}
	try {
		const db = await getDbInstance();
		const result = await db.run('DELETE FROM notes WHERE id = ?', id);
		if (result.changes === 0) {
			return res.status(404).send('Note not found');
		}
		res.status(204).send();
	} catch (e) {
		console.error('Error deleting note:', e);
		res.status(500).send('Internal Server Error');
	}
});

const port = process.env.API_PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
