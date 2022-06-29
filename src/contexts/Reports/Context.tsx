/* eslint-disable consistent-return */
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ToastService } from '../../components/toast/toast';
import { api } from '../../routes/providers/api';
import { IReport, IValue } from './types';

type PassiveTransponderProviderProps = {
    children: ReactNode;
};

type PassiveTransponderContextData = {
    getReports: (data: IReport) => void;
};

const PassiveTransponderContext = createContext({} as PassiveTransponderContextData);

export function PassiveTransponderProvider({ children }: PassiveTransponderProviderProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [reports, setReports] = useState([] as IValue[]);

    const getReports = useCallback((data: IReport) => {
        setIsLoading(true);
        api.post(`/reports`, data, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('@EventsManager:token') || '' }
        }).then((response) => {
            ToastService.success('Operação bem-sucedida');
            setReports(response.data)
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
            reports,
            isLoading
        };
    }, [
        isLoading,
        reports
    ]);

    return <PassiveTransponderContext.Provider value={data}>{children}</PassiveTransponderContext.Provider>;
}

export function useReports(): PassiveTransponderContextData {
    const context = useContext(PassiveTransponderContext);

    return context;
}
