import { ReactNode } from 'react';
import { Event } from '../../contexts/Event';
import { Login } from '../../contexts/Login';

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps): JSX.Element {
    return (
        <Event>
            <Login>{children}</Login>
        </Event>
    );
}
