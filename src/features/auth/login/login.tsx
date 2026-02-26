import { useNavigate } from '@tanstack/react-router'
import { keyStorage } from '../../../shared/utils/keyStorage'
import { useStorage } from '../../../shared/hooks/useStorage'

interface LoginProps {
	metaData?: { title?: string }
}

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
