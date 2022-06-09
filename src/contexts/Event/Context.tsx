/* eslint-disable consistent-return */
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ToastService } from '../../components/toast/toast';
import { api } from '../../routes/providers/api';
import { IEvent } from './types';

type PassiveTransponderProviderProps = {
    children: ReactNode;
};

type PassiveTransponderContextData = {
    setEvent: (data: IEvent) => void;
};

const PassiveTransponderContext = createContext({} as PassiveTransponderContextData);

export function PassiveTransponderProvider({ children }: PassiveTransponderProviderProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const setEvent = useCallback((data: IEvent) => {
        setIsLoading(true);
        api.post<IEvent>(`/events`, data)
            .then((response) => {
                ToastService.success('SUCCESS_OPERATION');
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
            setEvent,
            isLoading
        };
    }, [
        isLoading
    ]);

    return <PassiveTransponderContext.Provider value={data}>{children}</PassiveTransponderContext.Provider>;
}

export function useEvent(): PassiveTransponderContextData {
    const context = useContext(PassiveTransponderContext);

    return context;
}
