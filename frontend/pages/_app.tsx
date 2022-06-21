import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import state from '../services/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={state}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
