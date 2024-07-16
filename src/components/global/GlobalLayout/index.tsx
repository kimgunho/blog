import React from 'react';
import { Noto_Sans_KR } from 'next/font/google';
import classNames from 'classnames/bind';

import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './index.module.scss';
import { GlobalLayoutProps } from './type';

const cx = classNames.bind(styles);
const font = Noto_Sans_KR({ subsets: ['latin'] });

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className={cx('container', font.className)}>
      <Header />
      <div className={cx('wrapper')}>
        <Sidebar />
        <main>{children}</main>
      </div>
      <footer className={cx('footer')}>copyright</footer>
    </div>
  );
};

export default GlobalLayout;
