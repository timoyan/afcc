import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { css } from 'react-emotion';

const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
});

const Overlay = styled('div')({
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    backgroundColor: 'lightgray',
    opacity: 0.5,
    zIndex: 1
});

const Body = styled('div')({
    display: 'flex',
    flexFlow: 'column nowrap',
    backgroundColor: 'white',
    padding: '40px 20px',
    width: '350px',
    alignItems: 'center',
    zIndex: 2,
    '@media (max-width: 480px)': {
        maxWidth: '80vw'
    }
});

interface IModalInvitationCompleteProps {
    handleClose: () => void;
}

export class ModalInvitationComplete extends React.PureComponent<
    IModalInvitationCompleteProps
> {
    static displayName: string = 'ModalInvitationComplete';

    render() {
        return ReactDOM.createPortal(
            <Wrapper>
                <Overlay />
                <Body>
                    <span
                        className={css({
                            fontStyle: 'italic',
                            fontSize: '1.5rem',
                            textAlign: 'center'
                        })}
                    >
                        All done!
                    </span>
                    <span
                        className={css({
                            borderBottom: '2px solid black',
                            width: '30px',
                            marginTop: '10px',
                            marginBottom: '30px'
                        })}
                    />
                    <p
                        className={css({
                            fontSize: '1.25rem',
                            textAlign: 'center',
                            wordSpacing: '0.5rem'
                        })}
                    >
                        You will be one of the first to experience Broccoli & Co. when we
                        luanch.
                    </p>
                    <button
                        className={css({
                            width: '100%',
                            marginTop: '3rem',
                            height: '3rem'
                        })}
                        onClick={this.props.handleClose}
                    >
                        OK
                    </button>
                </Body>
            </Wrapper>,
            document.body
        );
    }
}
