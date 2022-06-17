/* eslint-disable consistent-return */
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ToastService } from '../../components/toast/toast';
import { api } from '../../routes/providers/api';
import { IEvent, IEventList, ISeats } from './types';

type PassiveTransponderProviderProps = {
    children: ReactNode;
};

type PassiveTransponderContextData = {
    getEvent: () => void;
    getAvaliableSeats: (event_id: string, session_id: string) => void;
    setEvent: (data: IEvent) => void;
};

const PassiveTransponderContext = createContext({} as PassiveTransponderContextData);

export function PassiveTransponderProvider({ children }: PassiveTransponderProviderProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [eventList, setEventList] = useState([] as IEventList[]);
    const [eventById, setEventById] = useState({} as IEventList);
    const [avaliableSeats, setAvaliableSeats] = useState({} as ISeats);

    const setEvent = useCallback((data: IEvent) => {
        setIsLoading(true);
        api.post<IEvent>(`/events`, data, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('@EventsManager:token') || '' } })
            .then(() => {
                ToastService.success('Operação bem-sucedida');
            })
            .catch((reason) => {
                ToastService.dealWithErrorRequest(reason);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const getEvent = useCallback(() => {
        setIsLoading(true);
        api.get<IEventList[]>(`/events`)
            .then((response) => {
                setEventList(response.data)
            })
            .catch((reason) => {
                ToastService.dealWithErrorRequest(reason);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const getEventById = useCallback((id: string) => {
        setIsLoading(true);
        api.get<IEventList>(`/events/` + id)
            .then((response) => {
                setEventById(response.data)
            })
            .catch((reason) => {
                ToastService.dealWithErrorRequest(reason);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const getAvaliableSeats = useCallback((event_id: string, session_id: string) => {
        setIsLoading(true);
        api.get<ISeats>(`/events/${event_id}/sessions/${session_id}/availability`)
            .then((response) => {
                setAvaliableSeats(response.data)
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
            getEventById,
            getEvent,
            getAvaliableSeats,
            avaliableSeats,
            eventList,
            eventById,
            isLoading
        };
    }, [
        eventList,
        eventById,
        getAvaliableSeats,
        avaliableSeats,
        isLoading
    ]);

    return <PassiveTransponderContext.Provider value={data}>{children}</PassiveTransponderContext.Provider>;
}

export function useEvent(): PassiveTransponderContextData {
    const context = useContext(PassiveTransponderContext);

    return context;
}
