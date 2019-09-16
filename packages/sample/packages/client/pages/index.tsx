import 'normalize.css';
import * as React from 'react';
import styled, { injectGlobal } from 'react-emotion';
import { Home } from './home';

injectGlobal({
    '*': {
        boxSizing: 'border-box'
    },
    html: {
        fontSize: '12px',
        minHeight: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '100vw'
    },
    body: {
        flex: 1,
        display: 'flex',
        flexFlow: 'column nowrap'
    },
    '#root': {
        flex: 1,
        display: 'flex',
        flexFlow: 'column nowrap'
    }
});

const Container = styled(`div`)({
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '0px',
    flex: 1,
    minWidth: 'min-content'
});

const Header = styled('header')({
    display: 'flex',
    flexflow: 'row nowrap',
    height: '6rem',
    fontSize: '2rem',
    '& span': {
        display: 'inline-flex',
        alignItems: 'center',
        fontWeight: 'bold',
        marginLeft: '100px'
    },
    '@media (max-width: 480px)': {
        '& span': {
            marginLeft: 0,
            justifyContent: 'center',
            flex: 1
        }
    }
});

const Footer = styled(`footer`)({
    display: 'flex',
    flexFlow: 'column wrap',
    height: '6rem',
    fontSize: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    '& > span': {
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: '1.6rem',
        fontStyle: 'italic',
        wordSpacing: '0.5rem'
    },
    '& .icon': {
        fontStyle: 'normal',
        padding: '0 0.5rem'
    }
});

const Main = styled(`div`)({
    display: 'flex',
    flexFlow: 'column nowrap',
    flex: 1,
    backgroundColor: 'rgb(246, 245, 243)'
});

export default () => (
    <Container>
        <Header>
            <span>BROCCOLI & CO.</span>
        </Header>
        <Main>
            <Home />
        </Main>
        <Footer>
            <span>
                Made with <span className={'icon'}>&hearts;</span> in Melbourne.
            </span>
            <span>
                <span className={'icon'}>&copy;</span> 2019 Broccoli
                <span className={'icon'}>&</span>Co. All rights reserved.
            </span>
        </Footer>
    </Container>
);
