import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import classNames from 'classnames/bind';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { DatabaseItemType, TagType } from '@/types/notion';
import { database, getTags } from './lib/notion';
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
  const [posts, setPosts] = useState(db);

  const filterPostsByTag = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const tag = target.dataset.query as string;

    let _db = db;
    if (tag !== 'all') {
      _db = _db.filter((post) => post.properties.tags.multi_select.some(({ name }) => name.includes(tag)));
    }
    setPosts(_db);
  };

  return (
    <div className={cx('container')}>
      <aside className={cx('tags')}>
        <button data-query="all" onClick={filterPostsByTag} type="button">
          All
        </button>
        {tags.map((tag) => {
          return (
            <button data-query={tag.name} onClick={filterPostsByTag} type="button" key={tag.id}>
              {tag.name}
            </button>
          );
        })}
      </aside>
      <ul className={cx('posts')}>
        {posts.map((data) => {
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
