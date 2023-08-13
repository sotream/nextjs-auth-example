// Core
import {
  useState, useEffect, FC, ReactNode,
} from 'react';

// Styles
import Styles from './styles/index.module.scss';
import { Navbar } from '../../components/Navbar';
import { useSelector } from 'react-redux';
import { selectAppVersion } from '../../store/selectors/settings';

type BaseViewType = {
  children: ReactNode;
  theme: string;
};

export const BaseView: FC<BaseViewType> = ({ children, theme }) => {
  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const appVersion = useSelector(selectAppVersion);


  useEffect(() => {
    if (!isScriptLoaded) {
      setScriptLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className = { Styles.container }>
      <Navbar theme={ theme } />
      <main className = { Styles.main }>
        { children }
      </main>
      <footer className = { Styles.footer }>
        <p>&copy; Sotream { new Date().getFullYear() }. App version: {appVersion}</p>
      </footer>
    </section>
  );
};
