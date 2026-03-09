import { useState } from 'react';

export const useCaptcha = () => {
	const [captcha, setCaptcha] = useState<boolean>(true);

	const handleCaptcha = (value: string | null) => {
		if (value !== null) {
			setCaptcha(false);
		} else {
			setCaptcha(true);
		}
	};
	return {
		captcha,
		handleCaptcha,
	};
};
