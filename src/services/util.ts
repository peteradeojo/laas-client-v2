// @ts-ignore
export const baseUrl: string = __ENV__.API_URL;

export const setAuthToken = (token: string) => {
	localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
	return localStorage.getItem('authToken');
};
