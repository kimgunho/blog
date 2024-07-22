import React, { useState, useEffect } from 'react';
import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface Props {
  id: string;
  recordMap: ExtendedRecordMap;
}

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

  return (
    <NotionRenderer
      key={id}
      recordMap={recordMap}
      fullPage={true}
      darkMode={theme === 'dark'}
      rootPageId={id}
      previewImages
    />
  );
};

export default NotionRender;
