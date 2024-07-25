import dynamic from 'next/dynamic';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ExtendedRecordMap } from 'notion-types';

import GlobalLayout from '@/components/global/GlobalLayout';
import Seo from '@/components/global/Seo';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { getData } from '@/lib/notion';

interface Props {
  data: {
    recordMap: ExtendedRecordMap;
    title: string;
    summary: string;
  };
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  if (!params?.id) {
    return { notFound: true };
  }

  const data = await getData(params.id as string);
  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      data: data,
      id: params.id,
    },
  };
};

const Notion = dynamic(() => import('@/components/global/NotionRender'), { ssr: false });
const Detail: NextPageWithLayout<Props> = ({ data, id }) => {
  return (
    <>
      <Seo title={data.title} description={data.summary} />
      <Notion recordMap={data.recordMap} id={id} />
    </>
  );
};

Detail.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Detail;
