import { GetStaticProps } from 'next';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';
import { getData } from '@/lib/notion';

interface RendererProps {
  recordMap: ExtendedRecordMap;
  id: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const id = process.env.NOTION_RESUME_ID as string;
  const recordMap = await getData(id);

  return {
    props: {
      recordMap,
      id,
    },
  };
};

const Resume: NextPageWithLayout<RendererProps> = ({ recordMap, id }) => {
  if (!recordMap) {
    return <div>존재하지않는 페이지</div>;
  }

  return <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} rootPageId={id} previewImages />;
};

Resume.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Resume;
