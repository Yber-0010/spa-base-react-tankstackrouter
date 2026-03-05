import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Paper, TextInput, PasswordInput, Button, Title, Stack } from '@mantine/core'
import { MetaTags, type MetaHelmetProps } from '@/shared/helpers/MetaTags'
import { useTraslate } from '@/shared/hooks/useTraslate'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { keyStorage } from '@/shared/utils/keyStorage'
import { useCaptcha } from '@/shared/hooks/useCaptcha'
import ReCAPTCHA from 'react-google-recaptcha';
import { env } from '@/core/environments/environments'
import '../css/login.css'

interface LoginProps {
	metaData?: MetaHelmetProps['metaData']
}

export const Login = ({ metaData }: LoginProps) => {
	const { t } = useTraslate()
	const navigate = useNavigate()
	const { setStorage } = useLocalStorage()
	const { auth } = keyStorage()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { captcha, handleCaptcha } = useCaptcha()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!email || !password) {
			alert('Por favor completa todos los campos')
			return
		}

		try {
			setIsLoading(true)
			setStorage(auth, { auth: 'true', email })
			await navigate({ to: '/backoffice/dashboard' })
		} catch (error) {
			console.error('Error:', error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<MetaTags metaData={metaData} />

			<div className="login-layout">
				<div className="login-left">
					<img
						src="/logo-datec-white.png"
						alt="Logo"
						className="logo-desktop"
					/>
				</div>

				<div className="login-right">
					<div className="login-form-wrapper">

						<img
							src="/logo-datec-blue.png"
							alt="Logo"
							className="logo-mobile"
						/>

						<Title order={2} mb="lg">
							{t('login.title') || 'Ingresar'}
						</Title>

						<Paper p="xl" radius="md">
							<form onSubmit={handleLogin}>
								<Stack gap="md">
									<TextInput
										label="E-mail"
										placeholder="tu@email.com"
										value={email}
										onChange={(e) => setEmail(e.currentTarget.value)}
										disabled={isLoading}
										required
										type="email"
									/>

									<PasswordInput
										label="Contraseña"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.currentTarget.value)}
										disabled={isLoading}
										required
									/>

									<ReCAPTCHA
										sitekey={env.VITE_SITEKEY_RECAPTCHA}
										onChange={handleCaptcha}
										// theme={darkMode === 'dark' ? 'dark' : 'light'}
									/>

									<Button type="submit" loading={isLoading} fullWidth mt="md">
										Ingresar
									</Button>
								</Stack>
							</form>
						</Paper>
					</div>
				</div>
			</div>
		</>
	)
}