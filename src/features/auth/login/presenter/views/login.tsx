import { useNavigate } from '@tanstack/react-router'
import { Paper, TextInput, PasswordInput, Title, Stack, Checkbox } from '@mantine/core'
import { BFButton } from '@/shared/components/ui/BFButton/BFButton'
import { MetaTags, type MetaHelmetProps } from '@/shared/helpers/MetaTags'
import { useTraslate } from '@/shared/hooks/useTraslate'
import { useCaptcha } from '@/shared/hooks/useCaptcha'
import ReCAPTCHA from 'react-google-recaptcha'
import { env } from '@/core/environments/environments'
import { useFormLogin } from '../hooks/useFormLogin'
import '../css/login.css'

interface LoginProps {
	metaData?: MetaHelmetProps['metaData']
}

export const Login = ({ metaData }: LoginProps) => {
	const { t } = useTraslate()
	const navigate = useNavigate()
	const { loginForm, handleRememberMe } = useFormLogin()
	const { handleCaptcha } = useCaptcha() // captcha value not needed here

	const handleLogin = loginForm.onSubmit(async (values) => {
		// values has {email, password, rememberMe}
		try {
			// here you would call your auth API; for now we just store and redirect
			localStorage.setItem('auth', JSON.stringify({ auth: 'true', email: values.email }))
			await navigate({ to: '/backoffice/dashboard' })
		} catch (error) {
			console.error('Error:', error)
		}
	})

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
										{...loginForm.getInputProps("email")}
										required
										type="email"
									/>

									<PasswordInput
										label="Contraseña"
										placeholder="••••••••"
										{...loginForm.getInputProps("password")}
										required
									/>
									<Checkbox
										label={t("login.rememberMe")}
										{...loginForm.getInputProps("rememberMe", {
											type: "checkbox",
											onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleRememberMe(e.currentTarget.checked),
										})} />

									   <div style={{ display: 'flex', justifyContent: 'center' }}>
										   <ReCAPTCHA
											   sitekey={env.VITE_SITEKEY_RECAPTCHA}
											   onChange={handleCaptcha}
										   />
									   </div>

									<BFButton
										type="submit"
										loading={loginForm.submitting}
										fullWidth
										mt="md"
									>
										Ingresar
									</BFButton>
								</Stack>
							</form>

						</Paper>
					</div>
				</div>
			</div>
		</>
	)
}