import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { eventData } from "../../data/data.js";
import ScreeningDetails from './eventing_details/eventing_details';
import EventDetails from './event_details/event_details';

function setZoom() {
    if (navigator.appVersion.indexOf("Win") !== -1)
    {
        document.body.style.zoom = "90%";
    }
}

const Event = () => {
    const { event_id } = useParams();
    setZoom()
    return (
        <Container>
            <EventDetails event={eventData[event_id-1]} />
            <ScreeningDetails event={eventData[event_id-1]} /> 
        </Container>
    )
}

export default Event

const Container = styled.div`
    min-height: calc(100vh - 160px);
    padding: 0 calc(3.5vw + 5px);
`