import { lazy } from 'react'
import { landingMetaData } from './landing.metadata'
import { productLoader } from '../loaders/productLoader'
import { Home } from '../home/home'

const Product = lazy(() => import('../product/product'))
const Contact = lazy(() => import('../contact/contact'))
const About = lazy(() => import('../about/about'))

const { index, product, contact, about } = landingMetaData()

export const routes = [
	{
		path: '/home',
		component: Home,
		metaData: index,
	},
	{
		path: '/product/$id',
		component: Product,
		loader: productLoader,
		metaData: product,
	},
	{
		path: '/contact',
		component: Contact,
		metaData: contact,
	},
	{
		path: '/about',
		component: About,
		metaData: about,
	},
] as const
