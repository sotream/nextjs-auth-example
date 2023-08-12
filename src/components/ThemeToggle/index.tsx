// Core
import { FC, useState, useEffect } from 'react';
import { setCookie } from 'cookies-next';
import cx from 'classnames';
import { useDispatch } from 'react-redux';

// Store
import { setCurrentTheme } from '../../store/reducers/settings';

// Other
import Style from './styles/index.module.scss';
import { Themes } from '../../common/enums/themes';

type ThemeTogglePropsType = {
  theme: string;
};

export const ThemeToggle: FC<ThemeTogglePropsType> = ({ theme }) => {
  const [clientTheme, setClientTheme] = useState<string>(theme);
  const dispatch = useDispatch();

  const handleClick = () => {
    const isDarkTheme
            = document.getElementsByTagName('body')[ 0 ].getAttribute('data-theme') === 'dark';

    const newTheme = isDarkTheme ? Themes.LIGHT : Themes.DARK;

    dispatch(setCurrentTheme(newTheme));

    setCookie('theme', newTheme, {
      maxAge: 365 * 24 * 60 * 60,
      path:   '/',
    });

    setClientTheme(newTheme);
  };

  useEffect(() => {
    if (document && clientTheme) {
      if (clientTheme === Themes.LIGHT) {
        document.getElementsByTagName('body')[ 0 ].setAttribute('data-theme', 'light');
      } else if (clientTheme === Themes.DARK) {
        document.getElementsByTagName('body')[ 0 ].setAttribute('data-theme', 'dark');
      }
    }
  }, [clientTheme]);

  const toggleClassNames = cx(Style.toggle, {
    [ Style.check ]: clientTheme === Themes.DARK,
  });

  return (
    <div className = { Style.container }>
      <p>🌞</p>
      <div className = { toggleClassNames } onClick = { handleClick }>
        <div className = { Style.slider } />
      </div>
      <p>🌛</p>
    </div>
  );
};
