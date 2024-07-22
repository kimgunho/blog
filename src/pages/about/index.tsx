import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import { ExtendedRecordMap } from 'notion-types';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { getData } from '@/lib/notion';

interface Props {
  recordMap: ExtendedRecordMap;
  id: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const id = process.env.NOTION_ABOUT_ID as string;
  const recordMap = await getData(id);

  return {
    props: {
      recordMap,
      id,
    },
  };
};

const Notion = dynamic(() => import('@/components/global/NotionRender'), { ssr: false });
const About: NextPageWithLayout<Props> = ({ recordMap, id }) => {
  return <Notion recordMap={recordMap} id={id} />;
};

About.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default About;
