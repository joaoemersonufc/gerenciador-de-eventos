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
        localStorage.removeItem('@EventsManager:token');
        localStorage.removeItem('@EventsManager:user');
        localStorage.removeItem('@EventsManager:role');
        api.post<ISignIn>(`/users/auth`, data)
            .then((response) => {
                push('/');
                setIsSigned(true);
                const { token, ...user } = response.data;

                if (token) {
                    localStorage.setItem('@EventsManager:token', token);
                    localStorage.setItem('@EventsManager:user', JSON.stringify(user));
                    localStorage.setItem('@EventsManager:user-name', user.ds_nome);
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    localStorage.setItem('@EventsManager:role', JSON.parse(jsonPayload).lvl);
                }

                api.defaults.headers.common['Authorization'] = `${token}`;
                window.location.reload()
                ToastService.success('Operação bem-sucedida');
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
                    ToastService.success('Operação bem-sucedida');
                    window.location.reload();
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
