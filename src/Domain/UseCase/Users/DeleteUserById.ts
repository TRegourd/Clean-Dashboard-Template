import { UseCaseWithParams } from './../UseCase';
import { UserRepository } from '../../Repository/Users/UserRepository';

export class DeleteUserByIdUseCase implements UseCaseWithParams<string, void> {
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke(id: string): Promise<void> {
		await this.repository.deleteUserById(id);
	}
}
