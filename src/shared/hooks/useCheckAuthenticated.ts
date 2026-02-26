import { keyStorage } from '../utils/keyStorage'
import { useStorage } from './useStorage'

export const useCheckAuthenticated = (): boolean => {

	const { auth } = keyStorage()

	const { getStorage } = useStorage()

	return getStorage(auth)?.auth === 'true'
}

export const checkAuthenticated = (): boolean => {

	try {
		const { auth } = keyStorage()

		const raw = localStorage.getItem(auth)

		if (!raw) return false

		return (JSON.parse(raw)?.auth as string) === 'true'

	} catch {
		return false
	}
}
