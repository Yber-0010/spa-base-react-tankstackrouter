
import { z } from 'zod';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useTraslate } from '@/shared/hooks/useTraslate';
import { keyStorage } from '@/shared/utils/keyStorage';


export const useFormLogin = () => {
	const { t } = useTraslate();
	const { getStorage, setStorage, removeStorage } = useLocalStorage();
	const keys = keyStorage();

	const stored = getStorage(keys.loginRemember);
	const initialEmail = stored.email ?? '';
	const initialRememberMe = !!stored.email;

	const schema = z.object({
		email: z
			.string()
			.min(1, { message: t('login.validation.emailRequired') })
			.email({ message: t('login.validation.emailInvalid') }),
		password: z
			.string()
			.min(1, { message: t('login.validation.passwordRequired') })
			.min(6, { message: t('login.validation.passwordMin') }),
		rememberMe: z.boolean(),
	});

	const loginForm = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: initialEmail,
			password: '',
			rememberMe: initialRememberMe,
		},
		validate: zod4Resolver(schema),
	});

	const handleRememberMe = (checked: boolean) => {
		if (checked) {
			const { email } = loginForm.getValues();
			setStorage(keys.loginRemember, { email });
		} else {
			removeStorage(keys.loginRemember);
		}
	};

	return { loginForm, handleRememberMe };
}
