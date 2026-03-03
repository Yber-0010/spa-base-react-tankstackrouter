import { useNavigate } from '@tanstack/react-router'
import { keyStorage } from '../../../../../shared/utils/keyStorage'
import { useLocalStorage } from '../../../../../shared/hooks/useLocalStorage'
import { Button } from '@mantine/core'
import { MetaTags, type MetaHelmetProps } from '../../../../../shared/helpers/MetaTags'
import '../css/login.css'

interface LoginProps {
	metaData?: MetaHelmetProps['metaData']
}

export const Login = ({ metaData }: LoginProps) => {

	const { auth } = keyStorage()

	const { setStorage } = useLocalStorage()

	const navigate = useNavigate()

	const login = () => {
		setStorage(auth, { auth: 'true' })
		navigate({ to: '/dashboard/users' })
	}

	return (
		<>
			<MetaTags metaData={metaData} />
			<h1>LOGIN</h1>
			<button onClick={login}>Login</button>
			<hr className='test'/>
			<Button variant="filled">Button</Button>
		</>
	)
}


