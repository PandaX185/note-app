import React, { useState } from 'react';
import { Textarea, Button } from '@chakra-ui/react';

interface CreateNoteProps {
	addNote: (content: string) => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ addNote }) => {
	const [noteContent, setNoteContent] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNoteContent(e.target.value);
	};

	const handleAddNote = () => {
		if (!noteContent.trim()) {
			alert('Please enter some content for the note.');
			return;
		}

		addNote(noteContent);
		setNoteContent('');
	};

	return (
		<div className="flex flex-col w-full items-center space-x-4 mx-auto px-4 my-5">
			<Textarea
				className="text-[#50d0f0] text-center font-bold overflow-hidden"
				variant="flushed"
				size="lg"
				placeholder="Start taking notes... 🗒️"
				_placeholder={{ opacity: 0.6, color: 'inherit' }}
				autoFocus
				value={noteContent}
				onChange={handleInputChange}
				resize="vertical"
				rows={1}
			/>
			<button
				className="font-bold border-2 border-[#50d0f0] hover:bg-[#50d0f0] hover:text-white w-[240px] ease-in-out duration-500 mt-6 px-5 py-3"
				onClick={handleAddNote}
			>
				Add Note
			</button>
		</div>
	);
};

export default CreateNote;
