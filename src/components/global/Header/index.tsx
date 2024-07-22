import React, { useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import { RiSunFill } from 'react-icons/ri';

import CONFIG from '@/define/site.config';
import useTheme from '@/hook/useTheme';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  const [isDark, toggle] = useTheme();

  useEffect(() => {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <header className={cx('container')}>
      <Link className={cx('title')} href="/">
        {CONFIG.header.title}
      </Link>
      <div className={cx('nav')}>
        <button className={cx('button')} type="button" onClick={toggle}>
          <RiSunFill size={24} color={isDark ? 'white' : '#2f3437'} />
        </button>
        {Object.entries(CONFIG.paths).map((path) => (
          <Link key={path[0]} className={cx('menu')} href={path[1]}>
            {path[0]}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
