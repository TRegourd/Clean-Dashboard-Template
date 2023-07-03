import { UserRepository } from '../../Repository/Users/UserRepository';
import { User } from '../../Model/Users/User';

import { UseCaseWithParams } from '../UseCase';

export class UpdateUserByIdUseCase
	implements UseCaseWithParams<{ id: string; body: User }, void>
{
	private repository: UserRepository;
	constructor(_repository: UserRepository) {
		this.repository = _repository;
	}
	async invoke({ id, body }: { id: string; body: User }): Promise<void> {
		return await this.repository.updateUserById({ id, body });
	}
}
