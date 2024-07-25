import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import classNames from 'classnames/bind';

import GlobalLayout from '@/components/global/GlobalLayout';
import Card from '@/components/ui/Card';
import Seo from '@/components/global/Seo';
import useStorage from '@/hook/useStorage';
import CONFIG from '@/define/site.config';
import { database, getTags } from '@/lib/notion';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { DatabaseItemType, TagType } from '@/types/notion';
import styles from './index.module.scss';

const cx = classNames.bind(styles);
interface Props {
  db: DatabaseItemType[];
  tags: TagType[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await database();
  const tags = await getTags();

  return {
    props: {
      db,
      tags,
    },
  };
};

const Tag = dynamic(() => import('@/components/ui/Tag'), { ssr: false });
const Home: NextPageWithLayout<Props> = ({ db, tags }) => {
  const [posts, setPosts] = useState<DatabaseItemType[]>(db);
  const [curTag, setCurTag] = useStorage('@tag', 'all');

  useEffect(() => {
    let _db = db;
    if (curTag !== 'all') {
      _db = _db.filter((post) => post.properties.tags.multi_select.some(({ name }) => name.includes(curTag)));
    }
    setPosts(_db);
  }, [curTag, db]);

  const select = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const tag = target.dataset.query as string;
    setCurTag(tag);
  };

  return (
    <>
      <Seo title={CONFIG.header.title} description={CONFIG.header.description} />
      <div className={cx('container')}>
        <aside className={cx('tags')}>
          <Tag onClick={select} tag="all" active={curTag === 'all'} />
          {tags.map((tag) => {
            return <Tag key={tag.id} onClick={select} tag={tag.name} active={tag.name === curTag} />;
          })}
        </aside>
        <div className={cx('contents')}>
          {posts.length === 0 && <p className={cx('empty')}>데이터가 존재하지않습니다.</p>}
          <div className={cx('posts')}>
            {posts.map((data) => {
              return <Card key={data.id} data={data} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Home;
