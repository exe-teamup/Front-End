import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/auth';

export const useAuthReady = () => {
  const init = useAuthStore(state => state.initAuthListener);
  const status = useAuthStore(state => state.status);
  const ran = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!ran.current) {
      ran.current = true;
      init();
    }
  }, [init]);

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setIsReady(true);
    }
  }, [status]);

  return isReady;
};
