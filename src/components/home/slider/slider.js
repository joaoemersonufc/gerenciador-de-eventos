import React from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from 'styled-components';
import { eventData } from "./../../../data/data.js";

function slider() {
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
            <Link to={'/event/'+eventData[0]["id"]}>
                <Wrap>
                    <img src="/images/banner1.jpg" alt={eventData[0]["name"]} />
                </Wrap>
            </Link>
            <Link to={'/event/'+eventData[1]["id"]}>
                <Wrap>
                    <img src="/images/banner2.png" alt={eventData[1]["name"]} />
                </Wrap>
            </Link>
            <Link to={'/event/'+eventData[2]["id"]}>
                <Wrap>
                    <img src="/images/banner3.jpg" alt={eventData[2]["name"]} />
                </Wrap>
            </Link>
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
