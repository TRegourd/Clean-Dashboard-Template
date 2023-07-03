import { User } from './../../Model/Users/User';

import { AuthenticationRepository } from './../../Repository/Authentication/AuthenticationRepository';
import { UseCase } from './../UseCase';

export class GetUserInfoUseCase
	implements UseCase<{ user: User; token: string } | null>
{
	private repository: AuthenticationRepository;
	constructor(_repository: AuthenticationRepository) {
		this.repository = _repository;
	}
	async invoke(): Promise<{ user: User; token: string } | null> {
		try {
			return await this.repository.getUserInfo();
		} catch (err) {
			return null;
		}
	}
}
