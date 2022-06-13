import { ReactNode } from 'react';
import { PassiveTransponderProvider } from './Context';

interface ContextProps {
  children: ReactNode;
}

export function Reports({ children }: ContextProps): JSX.Element {
  return <PassiveTransponderProvider>{children}</PassiveTransponderProvider>;
}
