import { useEffect } from 'react';

function useClickOutside(ref, state, handler) {
  useEffect(() => {
    // Run if clicked on outside of element
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (state) handler();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, state]);
}

export default useClickOutside;
