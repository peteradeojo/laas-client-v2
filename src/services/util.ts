// @ts-ignore
export const baseUrl: string = __ENV__.API_URL;

const authKey = 'authToken';

export const setAuthToken = (token?: string) => {
	if (!token) {
		localStorage.removeItem(authKey);
	}
	localStorage.setItem(authKey, token!);
};

export const getAuthToken = () => {
	return localStorage.getItem(authKey);
};