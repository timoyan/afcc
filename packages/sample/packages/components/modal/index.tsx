import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'react-emotion';

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

interface IModalProps {
    handleClose?: () => void;
    testId?: string;
}

export class Modal extends React.PureComponent<IModalProps> {
    static displayName: string = 'ModalInvitationForm';

    handleOverlayClick = () => {
        const { handleClose } = this.props;
        if (typeof handleClose === 'function') {
            handleClose();
        }
    };

    render() {
        const { children, testId } = this.props;
        return ReactDOM.createPortal(
            <Wrapper data-testid={testId}>
                <Overlay data-testid="ModalOverlay" onClick={this.handleOverlayClick} />
                <Body>{children}</Body>
            </Wrapper>,
            document.body
        );
    }
}
