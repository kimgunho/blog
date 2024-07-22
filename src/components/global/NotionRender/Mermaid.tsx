import React, { useEffect } from 'react';
import mermaid from 'mermaid';

interface Props {
  code: string;
  darkMode: boolean;
}

const Mermaid: React.FC<Props> = ({ darkMode, code }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: darkMode ? 'dark' : 'default',
      themeVariables: {
        dark: {
          background: '#1e1e1e',
          primaryColor: '#ffffff',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#ffffff',
          lineColor: '#d3d3d3',
          secondaryColor: '#383838',
          tertiaryColor: '#2e2e2e',
        },
        default: {
          background: '#ffffff',
          primaryColor: '#000000',
          primaryTextColor: '#000000',
          primaryBorderColor: '#000000',
          lineColor: '#333333',
          secondaryColor: '#f5f5f5',
          tertiaryColor: '#e5e5e5',
        },
      },
    });
    mermaid.contentLoaded();
  }, [code, darkMode]);

  return (
    <div
      className="mermaid"
      style={{
        width: '100%',
        height: 'auto',
        margin: '20px auto',
      }}>
      {code}
    </div>
  );
};

export default Mermaid;
