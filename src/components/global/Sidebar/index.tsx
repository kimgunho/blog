import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
  return <div className={cx('container')}>side...</div>;
};

export default Sidebar;
