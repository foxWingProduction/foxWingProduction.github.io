import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles/main.css';

export const createRoot = ViteReactSSG({ routes });
