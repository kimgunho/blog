import { NotionAPI } from 'notion-client';
import { Client } from '@notionhq/client';
import { getPageProperty, getPageTitle } from 'notion-utils';
import { DatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { TagType } from '@/types/notion';

export const notion = new NotionAPI();

export const getData = async (pageId: string) => {
  try {
    const recordMap = await notion.getPage(pageId);
    const block = recordMap.block[pageId].value;
    const title = getPageTitle(recordMap);
    const summary = getPageProperty('summary', block, recordMap);

    return {
      title,
      summary,
      recordMap,
    };
  } catch (error) {
    return null;
  }
};

export const client = new Client({
  auth: process.env.NOTION_SECRET,
});

export const database = async () => {
  const response = await client.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    filter: {
      and: [
        {
          property: 'type',
          select: {
            equals: 'Post',
          },
        },
        {
          property: 'status',
          select: {
            equals: 'Public',
          },
        },
      ],
    },
  });

  return response.results as DatabaseObjectResponse[];
};

export const getTags = async () => {
  const response = await client.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID as string,
  });

  return (response as any).properties['tags'].multi_select.options as TagType[];
};
