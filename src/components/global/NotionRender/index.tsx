import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap, CodeBlock } from 'notion-types';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

import Mermaid from './Mermaid';
interface Props {
  id: string;
  recordMap: ExtendedRecordMap;
}

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code));
const NotionRender: React.FC<Props> = ({ recordMap, id }) => {
  const [theme, setTheme] = useState(document.body.getAttribute('data-theme'));

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTheme(document.body.getAttribute('data-theme') as string);
        }
      }
    });
    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const components = {
    Code: ({ block }: { block: CodeBlock; defaultLanguage?: string }) => {
      const language = block.properties?.language?.[0]?.[0];

      if (language === 'Mermaid') {
        const code = block.properties?.title?.[0]?.[0] ?? '';
        return <Mermaid darkMode={theme === 'dark'} code={code} />;
      }

      return <Code block={block} defaultLanguage={language} />;
    },
  };

  return (
    <>
      <NotionRenderer
        components={components}
        recordMap={recordMap}
        fullPage={true}
        darkMode={theme === 'dark'}
        rootPageId={id}
        previewImages
      />
    </>
  );
};

export default NotionRender;
