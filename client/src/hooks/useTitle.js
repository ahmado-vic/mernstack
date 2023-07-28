import React, { useEffect } from 'react';

function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return title;
}

export default useTitle;
