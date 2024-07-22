import React from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import dayjs from 'dayjs';

import { DatabaseItemType } from '@/types/notion';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  data: DatabaseItemType;
}

const Card: React.FC<Props> = ({ data }) => {
  return (
    <Link className={cx('container')} href={`/post/${data.id}`}>
      <strong className={cx('title')}>{data.properties.title.title[0].plain_text}</strong>
      <p className={cx('summary')}>{data.properties.summary.rich_text[0]?.plain_text}</p>
      <p className={cx('updated')}>
        updated : {dayjs(data.properties.updatedAt.last_edited_time).format('YYYY.MM.DD')}
      </p>
    </Link>
  );
};

export default Card;
