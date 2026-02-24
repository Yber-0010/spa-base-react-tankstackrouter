import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './providers/providers'
import './app.css'
import { TankStackRouter } from './router/tankStackRouter'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<TankStackRouter />
		</Providers>
	</StrictMode>,
)
