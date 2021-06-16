import '../styles/global.scss';

import {Header} from '../components/Header';
import {Player} from '../components/'';

import styles from '../styles/app.module.scss';

//__app fica por volta de toda aplicação
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />

    </div>
  )
}

export default MyApp
