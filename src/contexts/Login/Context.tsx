/* eslint-disable consistent-return */
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastService } from '../../components/toast/toast';
import { api } from '../../routes/providers/api';
import { ISignIn, ISignUp } from './types';

type PassiveTransponderProviderProps = {
    children: ReactNode;
};

type PassiveTransponderContextData = {
    getSignIn: (data: ISignIn) => void;
    getSignUp: (data: ISignUp) => void;
    isSigned: boolean;
    isLoading: boolean;
};

const PassiveTransponderContext = createContext({} as PassiveTransponderContextData);

export function PassiveTransponderProvider({ children }: PassiveTransponderProviderProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [isSigned, setIsSigned] = useState(false);
    const { push } = useHistory();

    const getSignIn = useCallback((data: ISignIn) => {
        setIsLoading(true);
        api.post<ISignIn>(`/users/auth`, data,)
            .then(() => {
                ToastService.success('SUCCESS_OPERATION');
                // push('/passive-transponder/list');
                setIsSigned(true);
            })
            .catch((reason) => {
                ToastService.dealWithErrorRequest(reason);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const getSignUp = useCallback(
        (data: ISignUp) => {
            setIsLoading(true);
            api
                .post(`/users`, data)
                .then(() => {
                    ToastService.success('SUCCESS_OPERATION');
                    // push('/passive-transponder/list');
                })
                .catch((reason) => {
                    ToastService.dealWithErrorRequest(reason);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, []);

    const data = useMemo(() => {
        return {
            getSignIn,
            getSignUp,
            isSigned,
            isLoading,
        };
    }, [
        isSigned,
        isLoading,
    ]);

    return <PassiveTransponderContext.Provider value={data}>{children}</PassiveTransponderContext.Provider>;
}

export function useLogin(): PassiveTransponderContextData {
    const context = useContext(PassiveTransponderContext);

    return context;
}
