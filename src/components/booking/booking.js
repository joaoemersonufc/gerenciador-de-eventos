import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import styled from 'styled-components';
import { useEvent } from '../../contexts/Event/Context';
import CondensedEventDetails from './condensed_event_details/condensed_event_details';
import PaymentForms from './payment_forms/payment_forms';
import ScreeningDetails from './screening_details/screening_details';
import SeatChart from './seat_chart/seat_chart';

function setZoom() {
    if (navigator.appVersion.indexOf("Win") !== -1)
    {
        document.body.style.zoom = "75%";
    }
}

const Booking = () => {
    let history = useHistory();
    const [places, setPlaces] = useState({})
    const { getEventById, eventById, getAvaliableSeats, avaliableSeats, sendSales } = useEvent();
    const { event_id } = useParams();
    setZoom()

    useEffect(() => {
        getEventById(event_id);
        getAvaliableSeats(event_id, window.location.href.split('?')[1]);
    }, [event_id]);

    useEffect(() => {
        setPlaces(avaliableSeats)
    }, [avaliableSeats])

    console.log(localStorage.getItem('@seats').split(','))

    const handleSales = () => {
        const ticket = localStorage.getItem('@seats').length === 1 ? {ds_assento: localStorage.getItem('@seats'), ds_tipo: localStorage.getItem('@typeTicket')} : localStorage.getItem('@seats').split(',').map(seat => ({ds_assento: seat, ds_tipo: localStorage.getItem('@typeTicket')}))
        sendSales({
            id_sessao: window.location.href.split('?')[1],
            nr_protocolo:  Math.floor(Math.random() * 99999) + 1,
            ds_formapagamento: localStorage.getItem('@paymentForms'),
            ds_tipovenda: 'Online',
            ds_nomecliente: localStorage.getItem('@EventsManager:user').ds_nome,
            ds_tipodocumento: localStorage.getItem('@typeDocument'),
            tickets: ticket,
        });
        history?.push('/ticket/'+event_id+'?'+window.location.href.split('?')[1])
    }
    
    return (
        <Container>
            <BookingSection>
                <CondensedEventDetails event={eventById} />
                <ScreeningDetails sessions={eventById?.sessoes} session={window.location.href.split('?')[1]} />
                <PaymentForms />
                <SeatChart seats={places}/>
                <BookButton>
                    <BookTicket onClick={() => localStorage.getItem('@EventsManager:token') ? handleSales() : history?.push('/login') }>
                        <img src="/images/ticket.png" alt="" />
                        <span>GARANTA SEU INGRESSO</span>
                    </BookTicket>
                </BookButton>
            </BookingSection>
            <EventPoster>
                <Wrap>
                    <img src={'https://st.depositphotos.com/56480434/54377/v/450/depositphotos_543770714-stock-illustration-ticket-pass-event-voucher-solid.jpg'} alt={eventById.ds_evento} />
                </Wrap>
            </EventPoster>
        </Container>
    )
}

export default Booking

const Container = styled.main`
    min-height: calc(100vh - 140px);
    padding: 0 calc(3.5vw + 5px);
    background: #0c111b;
    position: relative;
    overflow-x: hidden;
    display: flex;

    @media (max-width: 900px) {
        flex-direction: column-reverse;
    }
`

const BookingSection = styled.div`
    margin-top: 40px;
    height: 100%;
    width: 40%;
    background: #0c111b;
    border-radius: 10px;
    padding: 10px 30px;

    @media (max-width: 900px) {
        padding: 10px 20px;
        width:100%;
    }
`
const EventPoster = styled.div`
    width: auto;
    margin: 0 auto;
    margin-top: 90px;
`
const Wrap = styled.div`
    border-radius: 10px;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
    rgba(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    overflow: hidden;

    img {
        height: 65vh;
        width: auto;
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: rgba(0 0 0 / 80%) 0px 40px 58px -16px,
        rgba(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249, 0.8);
    }
`
const BookButton = styled.div`
    margin: 40px 0px;
`

const BookTicket = styled.button`
    border-radius: 4px;
    font-size: 15px;
    padding: 15px 20px; 
    background: rgb(249, 249, 249, 0.8);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background: rgb(249, 249, 249);
    }

    img {
        vertical-align:middle;
    }

    @media (max-width: 900px) {
        width:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`