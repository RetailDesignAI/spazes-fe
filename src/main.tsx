import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from './providers/redux/store.ts';
import { Toaster } from './components/ui/toaster.tsx';
import 'react-loading-skeleton/dist/skeleton.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="196141946980-t9s015033tsbhfhvuoi9d0iucu8qn5fm.apps.googleusercontent.com">
        <App />
        <Toaster />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
