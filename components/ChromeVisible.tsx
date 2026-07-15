'use client';

import { usePathname } from 'next/navigation';

/**
 * Esconde o NeuralBackground global na home imersiva, que já tem seu
 * próprio canvas 3D (evita dois canvas animados simultâneos).
 */
export default function ChromeVisible({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <>{children}</>;
}
