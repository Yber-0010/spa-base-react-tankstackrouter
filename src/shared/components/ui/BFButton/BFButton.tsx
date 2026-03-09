import { Button } from '@mantine/core';
import type React from 'react';
import './BFButton.css';
import type { ButtonProps } from '@mantine/core';

interface BFButtonProps extends ButtonProps {
	children: React.ReactNode;
	className?: string;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const BFButton = ({ children, className = 'bfbutton', ...props }: BFButtonProps) => {
	return (
		<Button className={className} {...props}>
			{children}
		</Button>
	);
};
