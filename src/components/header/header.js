/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import {
    Link
} from "react-router-dom";
import styled from 'styled-components';


function header() {
    return (
        <Nav>
            <Link to="/" style={{"text-decoration":"none"}}>
                <Logo src="/images/logo.png" alt="logo" />
            </Link>
            <NavMenu>
                <a href="/">
                    <img src="/images/home.svg" alt="home icon" />
                    <span>HOME</span>
                </a>
                <a>
                    <AiOutlineOrderedList/>
                    <span>HISTÓRICO</span>
                </a>
                <a>
                    <img src="/images/history.svg" alt="relatories icon" />
                    <span>RELATÓRIOS</span>
                </a>
                <a>
                    <BsPlusCircle/>
                    <span>CADASTRAR EVENTO</span>
                </a>
            </NavMenu>
            <Link to="/login">
                <UserImg src="/images/profile.jpg" alt="user icon" />
            </Link>
        </Nav>
    )
}

export default header

const Nav = styled.nav`
    height: 70px; 
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow: hidden;

    @media (max-width: 900px) {
        flex:1;
        display: flex;
        justify-content: space-between;
    }
`
const Logo = styled.img`
    width: 68px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a {
        text-decoration: none;
        color: white;
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            padding-left: 5px;
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left:0;
                right:0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0.5);
            }
        }

        &:hover {
            span:after { 
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }

    @media (max-width: 900px) {
        display: none;
    }
`

const UserImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
`
