/** @format */

import { useEffect, useRef } from 'react';

/** @format */
function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.body.addEventListener('click', handleClick, listenCapturing);

    return () =>
      document.body.removeEventListener('click', handleClick, listenCapturing);
  }, [handler]);

  return ref;
}

export default useOutsideClick;
