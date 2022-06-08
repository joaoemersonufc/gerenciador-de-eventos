import { ReactNode } from 'react';
import { Login } from '../../contexts/Login';

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps): JSX.Element {
    return (
        <Login>{children}</Login>
    );
}
