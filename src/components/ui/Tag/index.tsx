import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  tag: string;
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const Tag: React.FC<Props> = ({ tag, active, onClick }) => {
  return (
    <button className={cx('tag', { active })} data-query={tag} onClick={onClick} type="button">
      {tag}
    </button>
  );
};

export default Tag;
