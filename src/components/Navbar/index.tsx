// Core
import { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { slide as Menu } from 'react-burger-menu';

import { NavLink } from '../../elements/NavLink';
import { ThemeToggle } from '../ThemeToggle';
import { useChangeLocale } from '../../helpers/changeLocale';

// Components
import { Ukraine } from '../../elements/Icons/Ukraine';
import { UnitedKingdom } from '../../elements/Icons/UnitedKingdom';

// Hooks, Store
import { useLogout } from './hooks/useLogout';
import { useMediaQuery } from '../../common/hooks/useMediaQuery';

// Styles
import Styles from './styles/index.module.scss';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../../store/selectors/settings';

type NavbarType = {
  theme: string;
};

export const Navbar: FC<NavbarType> = ({ theme }) => {
  const { changeLocale } = useChangeLocale();
  const { t } = useTranslation();
  const { doLogout } = useLogout();
  const isBreakPoint = useMediaQuery(767);
  const isMobile = useSelector(selectIsMobile);

  const menuJSX = (
    <ul className={Styles.menuItems}>
      <li>
        <NavLink href='/' activeClassName={Styles.active}>{t('nav-menu:home')}</NavLink>
      </li>
      <li>
        <NavLink href='/transactions' activeClassName={Styles.active}>{t('nav-menu:transactions')}</NavLink>
      </li>
      <li>
        <NavLink href='/accounts' activeClassName={Styles.active}>{t('nav-menu:accounts')}</NavLink>
      </li>
      <li>
        <NavLink href='/reports' activeClassName={Styles.active}>{t('nav-menu:reports')}</NavLink>
      </li>
      <li>
        <NavLink href='/about' activeClassName={Styles.active}>{t('nav-menu:about')}</NavLink>
      </li>
    </ul>
  );

  return (
    <header className = { Styles.container }>
      { isMobile || isBreakPoint ? (
        <div className={Styles.burgerWrapper}>
          <Menu>
            {menuJSX}
          </Menu>
        </div>
      ) : (
        <>
          <div className={Styles.logoWrapper}>
            <Link href='/'>
              st
            </Link>
          </div>
          <nav className={Styles.mainMenu}>
            {menuJSX}
          </nav>
        </>
      )}
      <div className={Styles.switchersWrapper}>
        <div className={Styles.langSwitcher}>
          <button onClick = { changeLocale('uk') }>
            <Ukraine/>
          </button>
          <button onClick = { changeLocale('en') }>
            <UnitedKingdom/>
          </button>
        </div>
        <div className={Styles.themeSwitcher}>
          <ThemeToggle theme = { theme } />
        </div>
        <div>
          <button className={Styles.logoutBtn} onClick={() => doLogout()}>{t('nav-menu:logoutBtn')}</button>
        </div>
      </div>
    </header>
  );
};
