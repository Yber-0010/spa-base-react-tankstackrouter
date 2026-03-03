const ls = localStorage

export const useLocalStorage = () => {

	const setStorage = (key: string, value: object): boolean => {
		try {
			ls.setItem(key, JSON.stringify(value))
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	const getStorage = (key: string): Record<string, string> => {
		try {
			return JSON.parse(ls.getItem(key) ?? '{}')
		} catch (error) {
			console.error(error)
			return {}
		}
	}

	const removeStorage = (key: string): boolean => {
		try {
			ls.removeItem(key)
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	const existStorage = (key: string): boolean => {
		try {
			return ls.getItem(key) !== null
		} catch (error) {
			console.error(error)
			return false
		}
	}

	const removeAllStorage = (): boolean => {
		try {
			ls.clear()
			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	return { setStorage, getStorage, removeStorage, existStorage, removeAllStorage }
}
