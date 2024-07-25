import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
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

const Notion = dynamic(() => import('@/components/global/NotionRender'), { ssr: false });
const Resume: NextPageWithLayout<Props> = ({ data, id }) => {
  return (
    <>
      <Seo title={data.title} description={data.summary} />
      <Notion recordMap={data.recordMap} id={id} />
    </>
  );
};

Resume.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Resume;

export const getServerSideProps: GetServerSideProps = async () => {
  const id = process.env.NOTION_RESUME_ID as string;
  const data = await getData(id);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      id,
    },
  };
};
