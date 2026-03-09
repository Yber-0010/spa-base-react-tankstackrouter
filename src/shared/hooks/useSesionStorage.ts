const ls = sessionStorage;

export const useSessionStorage = () => {
	const setStorage = (key: string, value: object): boolean => {
		try {
			ls.setItem(key, JSON.stringify(value));
			return true;
		} catch {
			throw new Error('Error setting sessionStorage');
		}
	};

	const getStorage = (key: string): Record<string, string> => {
		try {
			return JSON.parse(ls.getItem(key) ?? '{}');
		} catch {
			throw new Error('Error getting sessionStorage');
		}
	};

	const removeStorage = (key: string): boolean => {
		try {
			ls.removeItem(key);
			return true;
		} catch {
			throw new Error('Error removing sessionStorage');
		}
	};

	const existStorage = (key: string): boolean => {
		try {
			return ls.getItem(key) !== null;
		} catch {
			throw new Error('Error checking sessionStorage');
		}
	};

	const removeAllStorage = (): boolean => {
		try {
			ls.clear();
			return true;
		} catch {
			throw new Error('Error clearing sessionStorage');
		}
	};

	return { setStorage, getStorage, removeStorage, existStorage, removeAllStorage };
};
