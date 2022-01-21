import React from 'react'
import styled from 'styled-components'
import CondensedMovieDetails from './condensed_movie_details/condensed_movie_details'
import ScreeningDetails from './screening_details/screening_details'
import SeatChart from './seat_chart/seat_chart'
import {
    Link
} from "react-router-dom";

function booking() {
    return (
        <Container>
            <BookingSection>
                <CondensedMovieDetails />
                <ScreeningDetails />
                <SeatChart />
                <BookButton>
                    <Link to="/ticket" style={{"text-decoration":"none"}}>
                        <BookTicket>
                            <img src="/images/ticket.png" alt="" />
                            <span>BOOK TICKETS</span>
                        </BookTicket>
                    </Link>
                </BookButton>
            </BookingSection>
            <MoviePoster>
                <Wrap>
                    <img src="https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTkxYjAtZDIyZmE1Y2U1ZmQ2XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg" alt="Movie Poster" />
                </Wrap>
            </MoviePoster>
        </Container>
    )
}

export default booking

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
const MoviePoster = styled.div`
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
    padding: 20px 24px; 
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