import { keyStorage } from '../../provider/storage/keyStorage'
import { useStorage } from './useStorage'

/**
 * Hook version – use inside React components.
 */
export const useCheckAuthenticated = (): boolean => {
	const { auth } = keyStorage()
	const { getStorage } = useStorage()
	return getStorage(auth)?.auth === 'true'
}

/**
 * Utility version – use outside React (e.g. beforeLoad guards).
 * Reads directly from localStorage without hooks.
 */
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
