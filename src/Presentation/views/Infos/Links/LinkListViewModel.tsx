import { useState } from 'react';
import { InfoUsefulLinkRepositoryImpl } from '../../../../Data/Repository/Infos/InfoUsefulLinkRepositoryImpl';
import { GetInfoUsefulLinkUseCase } from '../../../../Domain/UseCase/Infos/GetInfoUsefulLink';
import { Info } from '../../../../Domain/Model/Infos/Info';

export default function InfoUsefulLinkViewModel() {
	const [usefulLinks, setUsefulLinks] = useState<Info[]>();

	const UseCase = new GetInfoUsefulLinkUseCase(
		new InfoUsefulLinkRepositoryImpl()
	);

	async function getUsefulLinks() {
		try {
			const result = await UseCase.invoke();
			setUsefulLinks(result);
		} catch (err) {
			throw err;
		}
	}

	return {
		usefulLinks,
		getUsefulLinks,
	};
}
