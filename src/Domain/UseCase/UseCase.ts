export interface UseCaseWithParams<Q, T> {
	invoke(params: Q): Promise<T>;
}

export interface UseCase<T> {
	invoke(): Promise<T>;
}
