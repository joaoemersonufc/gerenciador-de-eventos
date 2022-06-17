import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEvent } from '../../contexts/Event/Context';
import ScreeningDetails from './eventing_details/eventing_details';
import EventDetails from './event_details/event_details';

function setZoom() {
    if (navigator.appVersion.indexOf("Win") !== -1)
    {
        document.body.style.zoom = "90%";
    }
}

const Event = () => {
    const { getEventById, eventById } = useEvent();
    const { event_id } = useParams();
    setZoom();

    useEffect(() => {
        getEventById(event_id)
    }, [event_id])

    return (
        <Container>
            <EventDetails event={eventById} />
            <ScreeningDetails event={eventById} /> 
        </Container>
    )
}

export default Event

const Container = styled.div`
    min-height: calc(100vh - 160px);
    padding: 0 calc(3.5vw + 5px);
`