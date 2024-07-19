import React from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import classNames from 'classnames/bind';

import Header from '../Header';
import styles from './index.module.scss';
import { GlobalLayoutProps } from './type';

const cx = classNames.bind(styles);
const font = Noto_Sans_KR({ subsets: ['latin'] });

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className={cx('container', font.className)}>
      <Header />
      <main className={cx('wrapper')}>{children}</main>
      <footer className={cx('footer')}>copyright</footer>
    </div>
  );
};

export default GlobalLayout;
