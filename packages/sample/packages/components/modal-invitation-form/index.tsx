import { CSSObject } from 'create-emotion';
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

const Textbox = styled('input')<{ isValid: boolean }>(
    {
        width: '100%',
        margin: '5px 0',
        height: '3rem'
    },
    ({ isValid = true }) => {
        const styles: CSSObject = {};
        if (!isValid) {
            styles.outline = '1.5px solid red';
        }
        return styles;
    }
);

export interface IIModalInvitationFormData {
    email: string;
    fullName: string;
    confirmEmail: string;
}

export interface IIModalInvitationFormError extends IIModalInvitationFormData {}

interface IModalInvitationFormProps {
    handleClose: () => void;
    handleInputChange: (name: string, value: string) => void;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    data: IIModalInvitationFormData;
    error: IIModalInvitationFormError;
}

export class ModalInvitationForm extends React.PureComponent<IModalInvitationFormProps> {
    static displayName: string = 'ModalInvitationForm';

    handleOverlayClick = () => {
        this.props.handleClose();
    };

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.props.handleInputChange(name, value);
    };

    render() {
        const { data, error } = this.props;
        return ReactDOM.createPortal(
            <Wrapper>
                <Overlay onClick={this.handleOverlayClick} />
                <Body>
                    <span
                        className={css({
                            fontStyle: 'italic',
                            fontSize: '1.5rem',
                            textAlign: 'center'
                        })}
                    >
                        Request an invite
                    </span>
                    <span
                        className={css({
                            borderBottom: '2px solid black',
                            width: '30px',
                            marginTop: '10px',
                            marginBottom: '30px'
                        })}
                    />
                    <Textbox
                        type="text"
                        placeholder="Full name"
                        name="fullName"
                        onChange={this.handleTextChange}
                        value={data.fullName || ''}
                        isValid={error.fullName === undefined}
                    />
                    <Textbox
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleTextChange}
                        value={data.email || ''}
                        isValid={error.email === undefined}
                    />
                    <Textbox
                        type="text"
                        placeholder="Confirm email"
                        name="confirmEmail"
                        onChange={this.handleTextChange}
                        value={data.confirmEmail || ''}
                        isValid={error.confirmEmail === undefined}
                    />
                    <button
                        className={css({
                            width: '100%',
                            marginTop: '3rem',
                            height: '3rem'
                        })}
                        onClick={this.props.handleSubmit}
                    >
                        Send
                    </button>
                </Body>
            </Wrapper>,
            document.body
        );
    }
}
