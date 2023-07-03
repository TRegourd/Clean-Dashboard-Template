import { InfoAboutRepositoryImpl } from './../../../../Data/Repository/Infos/InfoAboutRepositoryImpl';
import { GetAboutInfoUseCase } from './../../../../Domain/UseCase/Infos/GetInfoAbout';
import { useState } from 'react';

export default function InfoAboutViewModel() {
	const [about, setAbout] = useState('');

	const UseCase = new GetAboutInfoUseCase(new InfoAboutRepositoryImpl());

	async function getAbout() {
		try {
			const result = await UseCase.invoke();
			setAbout(result);
		} catch (err) {
			throw err;
		}
	}

	return {
		about,
		getAbout,
	};
}
