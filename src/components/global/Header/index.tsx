import React from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';

import CONFIG from '@/define/site.config';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Header: React.FC = () => {
  return (
    <header className={cx('container')}>
      <Link className={cx('title')} href="/">
        {CONFIG.header.title}
      </Link>
      <div className={cx('nav')}>
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
