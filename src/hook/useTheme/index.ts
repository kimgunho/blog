import { useEffect, useState } from 'react';

const useTheme = (): [boolean, () => void] => {
  const [isDark, setDark] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem('@theme');
    if (theme) {
      setDark(Boolean(JSON.parse(theme)));
    }
  }, []);

  const toggle = () => {
    localStorage.setItem('@theme', JSON.stringify(!isDark));
    setDark(!isDark);
  };

  return [isDark, toggle];
};

export default useTheme;
