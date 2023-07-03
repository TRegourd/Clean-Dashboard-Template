import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLButtonElement> {
	image?: string;
	width?: string;
}

export const Avatar = ({ image, width }: AvatarProps) => {
	return (
		<div className='w-24 rounded-full'>
			<div className='avatar'>
				<img src={image} alt={'Avatar'} />
			</div>
		</div>
	);
};
