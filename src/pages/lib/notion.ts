import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { TagType } from './type';

export const notion = new NotionAPI();

export const getData = async (pageId: string) => {
  return await notion.getPage(pageId);
};

const client = new Client({
  auth: process.env.NOTION_SECRET,
});

export const database = async () => {
  const response = await client.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    // filter: {
    //   property: 'tags',
    //   multi_select: {
    //     contains: 'Docs',
    //   },
    // },
  });

  return response.results as DatabaseObjectResponse[];
};

export const getTags = async () => {
  const response = await client.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });

  return (response as any).properties['tags'].multi_select.options as TagType[];
};
