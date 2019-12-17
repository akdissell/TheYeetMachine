import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <HomeWrapper>
                    Home
                </HomeWrapper>
                <MessageWrapper>
                    This is where we enter THE YEET MACHINE
                </MessageWrapper>
                <MessageWrapper>
                    <Link to={'/input'} className="nav-link">
                        <YeetButton>
                            YEET
                        </YeetButton>
                    </Link>
                </MessageWrapper>
            </React.Fragment>
        );
    }
}

const HomeWrapper = styled.div`
    margin: 10px;
    display: flex;
    justify-content: center;
    font-size: xx-large;
    font-weight: bold;
`
const MessageWrapper = styled.div`
    margin: 10px;
`
const YeetButton = styled.button`
    background-color: #446272;
    color: white;
    border-color: #32292F;
`