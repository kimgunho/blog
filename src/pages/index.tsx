import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames/bind';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { database, getTags } from './lib/notion';
import { DatabaseItemType, TagType } from './lib/type';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  db: DatabaseItemType[];
  tags: TagType[];
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await database();
  const tags = await getTags();

  return {
    props: {
      db,
      tags,
    },
  };
};

const Home: NextPageWithLayout<Props> = ({ db, tags }) => {
  useEffect(() => {
    as();
  }, []);

  const as = async () => {
    const b = await database();
    console.log(b);
  };

  return (
    <div className={cx('container')}>
      <aside className={cx('tags')}>
        {tags.map((tag) => {
          return (
            <button type="button" key={tag.id}>
              {tag.name}
            </button>
          );
        })}
      </aside>
      <ul className={cx('posts')}>
        {db.map((data) => {
          return (
            <li key={data.id}>
              <strong>{data.properties.title.title[0].plain_text}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Home.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Home;
