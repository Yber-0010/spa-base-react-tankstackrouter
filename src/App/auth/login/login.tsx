import { useNavigate } from '@tanstack/react-router'
import { keyStorage } from '../../../provider/storage/keyStorage'
import { useStorage } from '../../hooks/useStorage'

interface LoginProps {
	metaData?: { title?: string }
}

/**
 * Login page – mirrors login.jsx from base-react.
 * useNavigate is available in TanStack Router with the same interface.
 */
export const Login = ({ metaData }: LoginProps) => {
	const { auth } = keyStorage()
	const { setStorage } = useStorage()
	const navigate = useNavigate()

	const login = () => {
		setStorage(auth, { auth: 'true' })
		navigate({ to: '/dashboard/users' })
	}

	return (
		<>
			{metaData?.title && <title>{metaData.title}</title>}
			<h1>LOGIN</h1>
			<button onClick={login}>Login</button>
		</>
	)
}

export default Login
