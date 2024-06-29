import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import 'react-loading-skeleton/dist/skeleton.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster />
  </>
);
