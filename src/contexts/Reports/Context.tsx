/* eslint-disable consistent-return */
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ToastService } from '../../components/toast/toast';
import { api } from '../../routes/providers/api';

type PassiveTransponderProviderProps = {
    children: ReactNode;
};

type PassiveTransponderContextData = {
    getReports: (type: string) => void;
};

const PassiveTransponderContext = createContext({} as PassiveTransponderContextData);

export function PassiveTransponderProvider({ children }: PassiveTransponderProviderProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const getReports = useCallback((type: string) => {
        setIsLoading(true);
        api.post(`/reports`, data)
            .then((response) => {
                ToastService.success('Operação bem-sucedida');
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
            getReports,
            isLoading
        };
    }, [
        isLoading
    ]);

    return <PassiveTransponderContext.Provider value={data}>{children}</PassiveTransponderContext.Provider>;
}

export function useReports(): PassiveTransponderContextData {
    const context = useContext(PassiveTransponderContext);

    return context;
}
