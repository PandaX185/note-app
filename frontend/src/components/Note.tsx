import React, { useState } from 'react';
import { LuDelete } from 'react-icons/lu';

interface NoteComponentProps {
	id: number;
	content: string;
	deleteNote: (id: number) => void;
}

const Note: React.FC<NoteComponentProps> = ({ id, content, deleteNote }) => {
	const [clicked, setClicked] = useState(false);
	const styles = [
		'size-[400px] p-5 m-3 font-bold bg-gradient-to-br from-emerald-400 to-indigo-500 text-white',
		'size-[400px] p-5 m-3 font-bold bg-gradient-to-tl from-[#af44ec] to-[#eb9ac9] text-white',
		'size-[400px] p-5 m-3 font-bold bg-gradient-to-tl from-[#fae586] to-[#83ffcb] text-black',
	];
	const [randIndx] = useState(Math.floor(Math.random() * styles.length));

	function handleOnClick() {
		setClicked(!clicked);
	}

	return (
		<div className={`${styles[randIndx]} flex justify-between`} onClick={handleOnClick}>
			<p className={clicked ? "" : "truncate"}>
				{content}
			</p>
			<div onClick={(e) => { e.stopPropagation(); deleteNote(id); }}>
				<LuDelete size={40} />
			</div>
		</div>
	);
};

export default Note;
