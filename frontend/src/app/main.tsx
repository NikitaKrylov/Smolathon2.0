import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/styles/global.scss';
import '@/styles/variables.scss';
import '../styles/fonts.css';
import { MainPage } from '@/pages/MainPage/MainPage';
import ThemeProvider from './providers/ThemeProvider';
import LoginPage from '@/pages/LoginPage/LoginPage';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import RegPage from '@/pages/RegPage/RegPage';
import PassportPage from '@/pages/PassportPage/PassportPage';
import ProjectPage from '@/pages/ProjectPage/ProjectPage';
const routes = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/login',
		element: <LoginPage/>
	},
	{
		path: '/register',
		element: <RegPage/>
	},
	{
		path: '/passport',
		element: <PassportPage/>
	},
	{
		path: '/project',
		element: <ProjectPage/>
	}
]);
createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<Provider store={store}>
			<RouterProvider router={routes} />
		</Provider>
	</ThemeProvider>
);
