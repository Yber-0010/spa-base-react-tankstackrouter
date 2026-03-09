import { lazy } from 'react';
import { ROUTES } from '../../../shared/constants/routes';
import { Home } from '../home/home';
import { productLoader } from '../loaders/productLoader';
import { landingMetaData } from './metadata';

// const AdminUsers     = lazy(() => import('../users/adminUsers').then(m => ({ default: m.AdminUsers })))
const Product = lazy(() => import('../product/product').then((m) => ({ default: m.Product })));
const Contact = lazy(() => import('../contact/contact').then((m) => ({ default: m.Contact })));
const About = lazy(() => import('../about/about').then((m) => ({ default: m.About })));

const { landing } = ROUTES;
const { index, product, contact, about } = landingMetaData();

export const routes = [
	{
		path: landing.home.path,
		component: Home,
		metaData: index,
	},
	{
		path: landing.product.path,
		component: Product,
		loader: productLoader,
		metaData: product,
	},
	{
		path: landing.contact.path,
		component: Contact,
		metaData: contact,
	},
	{
		path: landing.about.path,
		component: About,
		metaData: about,
	},
] as const;
