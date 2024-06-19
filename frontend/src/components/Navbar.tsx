import { ReactTyped } from 'react-typed';
import { LuListTodo } from "react-icons/lu";
import React from 'react';

export const Navbar = () => {
	return (
		<div className='flex w-full justify-center items-center mx-auto my-5'>
			<div className='animate-customBounce'>
				<LuListTodo size={40} color='#FFFFFF' />
			</div>
			<ReactTyped className="pl-2 text-4xl font-bold text-[#50d0f0]"
				strings={['Notes']}
				typeSpeed={40}
				backSpeed={60}
				backDelay={1000}
				showCursor={false}
			/>
		</div>
	)
}
