import { InfoAboutRepository } from './../../../Domain/Repository/Infos/InfoAboutRepository';

const file_name = 'info.md';

export class InfoAboutRepositoryImpl implements InfoAboutRepository {
	async getAbout(): Promise<string> {
		return import(`../../LocalData/${file_name}`)
			.then((res) => {
				return fetch(res.default).then((res) => {
					return res.text();
				});
			})
			.catch((err) => {
				console.log(err);
				return '';
			});
	}
}
