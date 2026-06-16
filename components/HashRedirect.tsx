'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      const newPath = hash.slice(1);
      window.location.replace(newPath);
    }
  }, [router]);

  return null;
}
