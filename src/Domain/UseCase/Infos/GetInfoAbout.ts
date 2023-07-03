import { InfoAboutRepository } from './../../Repository/Infos/InfoAboutRepository';
import { UseCase } from '../UseCase';

export class GetAboutInfoUseCase implements UseCase<string> {
	private repository: InfoAboutRepository;
	constructor(_repository: InfoAboutRepository) {
		this.repository = _repository;
	}
	async invoke(): Promise<string> {
		return await this.repository.getAbout();
	}
}
