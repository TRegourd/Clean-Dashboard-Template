import { Info } from '../../Model/Infos/Info';
import { InfoUsefulLinkRepository } from '../../Repository/Infos/InfoUsefulLinkRepository';
import { UseCase } from '../UseCase';

export class GetInfoUsefulLinkUseCase implements UseCase<Info[]> {
	private repository: InfoUsefulLinkRepository;
	constructor(_repository: InfoUsefulLinkRepository) {
		this.repository = _repository;
	}
	async invoke(): Promise<Info[]> {
		return await this.repository.getUsefulLinks();
	}
}
