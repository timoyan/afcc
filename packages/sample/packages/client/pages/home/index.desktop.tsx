import * as React from 'react';
import styled, { css } from 'react-emotion';

const Wrapper = styled('div')({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
});

const IntroCSS = css({
    fontWeight: 'bold',
    fontSize: '3rem',
    wordSpacing: '0.5rem'
});

const NotedCSS = css({
    marginTop: '10px'
});

export const Home = () => (
    <Wrapper>
        <span className={IntroCSS}>A better way</span>
        <span className={IntroCSS}>to enjoy every day.</span>
        <span className={NotedCSS}>Be the first to know when we launch.</span>
        <span>Request an invite</span>
    </Wrapper>
);
