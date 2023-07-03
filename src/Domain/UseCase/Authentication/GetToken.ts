import { AuthenticationRepository } from './../../Repository/Authentication/AuthenticationRepository';
import { UseCaseWithParams } from './../UseCase';

export class GetTokenUseCase implements UseCaseWithParams<Object, string> {
	private repository: AuthenticationRepository;
	constructor(_repository: AuthenticationRepository) {
		this.repository = _repository;
	}
	async invoke(body: Object): Promise<string> {
		return await this.repository.getToken(body);
	}
}
