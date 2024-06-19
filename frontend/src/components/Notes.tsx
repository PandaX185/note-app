import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNote from './CreateNote';
import Note from './Note';

interface NoteProps {
	id: number;
	content: string;
}

const Notes: React.FC = () => {
	const [notes, setNotes] = useState<NoteProps[]>([]);

	useEffect(() => {
		async function fetchNotes() {
			try {
				const response = await axios.get("http://localhost:3000/notes");
				setNotes(response.data);
			} catch (e) {
				console.log('Error fetching notes:', e);
			}
		}

		fetchNotes();
	}, []);

	const addNote = async (content: string) => {
		try {
			const response = await axios.post('http://localhost:3000/notes', { content });
			setNotes((prevNotes) => [response.data, ...prevNotes]);
		} catch (error) {
			console.error('Error adding note:', error);
		}
	};

	const deleteNote = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3000/notes/${id}`);
			setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
		} catch (error) {
			console.error('Error deleting note:', error);
		}
	};

	return (
		<div className="flex-wrap flex flex-col px-6">
			<CreateNote addNote={addNote} />
			<div className='flex-wrap flex flex-row'>
				{notes.map((note) => (
					<Note key={note.id} id={note.id} content={note.content} deleteNote={deleteNote} />
				))}
			</div>
		</div>
	);
};

export default Notes;
