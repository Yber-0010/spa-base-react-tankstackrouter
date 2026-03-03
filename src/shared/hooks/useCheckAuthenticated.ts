import { keyStorage } from '../utils/keyStorage'
import { useLocalStorage } from './useLocalStorage'

export const useCheckAuthenticated = (): boolean => {

	const { auth } = keyStorage()

	const { getStorage } = useLocalStorage()

	return getStorage(auth)?.auth === 'true'
}
