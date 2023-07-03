import React from 'react';

export interface ModalProps extends React.HTMLAttributes<HTMLInputElement> {
	button: React.ReactNode;
	children: React.ReactNode;
}

function Modal({ button, children }: ModalProps) {
	return (
		<>
			<label htmlFor='my-modal' className='btn btn-primary'>
				{button}
			</label>

			<input type='checkbox' id='my-modal' className='modal-toggle' />
			<div className='modal lg:ml-80'>
				<div className='modal-box max-w-min'>
					<label
						htmlFor='my-modal'
						className='btn btn-ghost absolute top-1 right-2'
					>
						<i className='fa-solid fa-xmark fa-xl' />
					</label>
					<div className='mt-4'>{children}</div>
				</div>
			</div>
		</>
	);
}

export default Modal;
