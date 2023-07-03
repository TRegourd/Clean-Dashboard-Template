import { Info } from '../../../Domain/Model/Infos/Info';
import { InfoUsefulLinkRepository } from '../../../Domain/Repository/Infos/InfoUsefulLinkRepository';

export class InfoUsefulLinkRepositoryImpl implements InfoUsefulLinkRepository {
	async getUsefulLinks(): Promise<Info[]> {
		return import('../../LocalData/usefulLinks.json')
			.then((res) => {
				return res.default;
			})
			.catch((err) => {
				console.log(err);
				return [];
			});
	}
}
