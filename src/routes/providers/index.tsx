import { ReactNode } from 'react';
import { Event } from '../../contexts/Event';
import { Login } from '../../contexts/Login';
import { Reports } from '../../contexts/Reports';

type ProvidersProps = {
    children: ReactNode;
};

export function Providers({ children }: ProvidersProps): JSX.Element {
    return (
        <Reports>
            <Event>
                <Login>{children}</Login>
            </Event>
        </Reports>
    );
}
