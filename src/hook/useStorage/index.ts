import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useStorage = (key: string, defaultValue: string): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(() => {
    let curValue;
    try {
      curValue = JSON.parse(localStorage.getItem(key) || defaultValue);
    } catch (error) {
      curValue = defaultValue;
    }
    return curValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useStorage;
