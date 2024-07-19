import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { getData } from '../lib/notion';
import { useState } from 'react';

interface RendererProps {
  recordMap: ExtendedRecordMap;
  id: string;
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  if (!params?.id) {
    return { notFound: true };
  }

  const recordMap = await getData(params.id as string);

  return {
    props: {
      recordMap,
      id: params.id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Detail: NextPageWithLayout<RendererProps> = ({ recordMap, id }) => {
  const [isDark, setDart] = useState(false);

  return <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={isDark} rootPageId={id} previewImages />;
};

Detail.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Detail;
