export const serverFetch = (url: string, options: RequestInit = {}) => {
	const serverHost = "http://localhost:8000";
	const token = localStorage.getItem("token");
	return fetch(`${serverHost}/api${url}`, {
		...options,
		headers: {
			...(options.headers || {}),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
	});
};
