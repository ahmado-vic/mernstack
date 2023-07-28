import { useEffect, useState } from 'react';

function usePersist() {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('PERSIST')) || false
  );

  useEffect(() => {
    localStorage.setItem('PERSIST', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
}

export default usePersist;
