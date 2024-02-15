import { Input } from 'antd';
import React, { useEffect, useState } from 'react';

interface IInputSearchProps extends React.ComponentProps<typeof Input.Search> {
  onSearch?: (value: string) => void;
}
const { Search } = Input;

const InputSearch: React.FC<IInputSearchProps> = ({ onSearch, ...props }) => {
  const [text, setText] = useState<string>('');
  useEffect(() => {
    if (onSearch) {
      const delayDebounceFn = setTimeout(() => {
        // Realizar la búsqueda después del tiempo de espera
        onSearch(text);
      }, 500); // Establece un tiempo de espera de 500 ms

      return () => {
        // Limpiar el timeout si el término de búsqueda cambia antes de que se complete el tiempo de espera
        clearTimeout(delayDebounceFn);
      };
    }
  }, [text]);

  const onSearchText = (value: string) => setText(value);

  return <Search {...props} onChange={(e) => onSearchText(e.target.value)} />;
};

export default InputSearch;
