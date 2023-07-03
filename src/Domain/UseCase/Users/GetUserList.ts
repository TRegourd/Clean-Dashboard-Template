import { UserRepository } from '../../Repository/Users/UserRepository';
import { User } from '../../Model/Users/User';
import { UseCase } from '../UseCase';

export class GetUserListUseCase implements UseCase<User[]> {
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke(): Promise<User[]> {
		return await this.repository.getUserList();
	}
}
