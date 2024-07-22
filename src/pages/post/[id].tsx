import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ExtendedRecordMap } from 'notion-types';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { getData } from '@/lib/notion';

interface Props {
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

const Notion = dynamic(() => import('@/components/global/NotionRender'), { ssr: false });
const Detail: NextPageWithLayout<Props> = ({ recordMap, id }) => {
  return <Notion recordMap={recordMap} id={id} />;
};

Detail.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Detail;
