import { UseCaseWithParams } from './../UseCase';
import { UserRepository } from '../../Repository/Users/UserRepository';
import { User } from '../../Model/Users/User';

export class GetUserByIdUseCase implements UseCaseWithParams<string, User> {
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke(id: string): Promise<User> {
		return await this.repository.getUserById(id);
	}
}
