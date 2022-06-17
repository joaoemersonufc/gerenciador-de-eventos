/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from 'styled-components';
import { useEvent } from '../../../contexts/Event/Context';
// import { eventData } from "./../../../data/data.js";

function slider() {

    const { getEvent, eventList } = useEvent();

    useEffect(() => {
        getEvent();
    }, [])

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    return (
        <Carousel {...settings}>
            {eventList.map((event, index) =>  
            {
                if(index > 3) return;
                return(
                    <Link to={'/event/'+event.id_evento}>
                        <Wrap>
                            <img src='https://st.depositphotos.com/56480434/54377/v/450/depositphotos_543770714-stock-illustration-ticket-pass-event-voucher-solid.jpg' alt={event.ds_evento} />
                        </Wrap>
                    </Link>
                )
            }
            )}
        </Carousel>
    )
}

export default slider

const Carousel = styled(Slider)`
    margin-top: 20px;

    ul li button {
        &:before {
            font-size: 10px;
            color: rgb(150, 158, 171);
        }
    }
    li.slick-active button:before {
        color: white;
    }

    .slick-list {
        overflow: visible;
    }

    button {
        z-index: 1;
    }


`

const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    img {
        border-radius: 4px;
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        cursor: pointer;
        display: block;
        position: relative;
        padding: 4px;
        width: 100%;
        height: 390px;
        object-fit: cover;
    }

    &:hover {
        padding: 0;
        border: 4px solid rgba(249, 249, 249, 0.8);
        transition-duration: 300ms;
    }
`
