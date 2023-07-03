import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

export const API: AxiosInstance = axios.create({ baseURL });

export class ServerApi {
	private static async request<T>(
		method: 'get' | 'post' | 'put' | 'delete',
		url: string,
		body?: any,
		options?: AxiosRequestConfig
	): Promise<T> {
		const token = localStorage.getItem('jwt');
		try {
			document.body.classList.add('loading-indicator');

			const res = await API({
				url,
				method,
				data: body,
				headers: { Authorization: `Bearer ${token}` },
				...options,
			});
			document.body.classList.remove('loading-indicator');
			return res.data;
		} catch (err) {
			document.body.classList.remove('loading-indicator');
			throw err;
		}
	}

	static async get<T>(url: string, options?: any): Promise<T> {
		return this.request<T>('get', url, null, options);
	}

	static post<T>(url: string, body: any, options?: any): Promise<T> {
		return this.request<T>('post', url, body, options);
	}

	static async put<T>(url: string, body: any, options?: any): Promise<T> {
		return this.request<T>('put', url, body, options);
	}

	static async delete<T>(url: string, options?: any): Promise<T> {
		return this.request<T>('delete', url, null, options);
	}
}
