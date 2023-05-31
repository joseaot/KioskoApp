import '../styles/globals.css'
import { KioskoProvider } from '../context/KioskoProvider'

function MyApp({ Component, pageProps }) {
  return(
    <KioskoProvider>
      <Component {...pageProps} />
    </KioskoProvider>

  );
}

export default MyApp
