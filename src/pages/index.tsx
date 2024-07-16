import React from 'react';

import GlobalLayout from '@/components/global/GlobalLayout';
import { NextPageWithLayout } from '@/types/nextLayoutWithPage';

const Home: NextPageWithLayout = () => {
  return <main>aa</main>;
};

Home.getLayout = (page) => <GlobalLayout>{page}</GlobalLayout>;

export default Home;
