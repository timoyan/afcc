import { CSSObject } from 'create-emotion';
import * as React from 'react';
import styled, { css } from 'react-emotion';
import { Modal } from '../modal';

const Textbox = styled('input')<{ isValid: boolean }>(
    {
        width: '100%',
        margin: '5px 0',
        height: '3rem'
    },
    ({ isValid }) => {
        const styles: CSSObject = {};
        if (!isValid) {
            styles.outline = '1.5px solid red';
        }
        return styles;
    }
);

const ErrorMessage = styled('span')({
    marginTop: '1rem',
    color: 'red'
});

export interface IInivitationForm {
    fullName: IInivitationFormField;
    email: IInivitationFormField;
    confirmEmail: IInivitationFormField;
    serverErrorMessage: string;
}

export interface IInivitationFormField {
    value: string;
    isValid: boolean;
}

interface IModalInvitationFormProps {
    handleClose: () => void;
    handleInputChange: (name: string, value: string) => void;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    formData: IInivitationForm;
    isProcessing: boolean;
    testid?: string;
}

export class ModalInvitationForm extends React.PureComponent<IModalInvitationFormProps> {
    static displayName: string = 'ModalInvitationForm';

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.props.handleInputChange(name, value);
    };

    render() {
        const { formData, isProcessing, handleSubmit, handleClose, testid } = this.props;
        return (
            <Modal handleClose={handleClose} testId={testid}>
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
                    value={formData.fullName.value || ''}
                    isValid={formData.fullName.isValid}
                    disabled={isProcessing}
                    data-testid="fullNameTextbox"
                />
                <Textbox
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleTextChange}
                    value={formData.email.value || ''}
                    isValid={formData.email.isValid}
                    disabled={isProcessing}
                    data-testid="emailTextbox"
                />
                <Textbox
                    type="text"
                    placeholder="Confirm email"
                    name="confirmEmail"
                    onChange={this.handleTextChange}
                    value={formData.confirmEmail.value || ''}
                    isValid={formData.confirmEmail.isValid}
                    disabled={isProcessing}
                    data-testid="confirmEmailTextbox"
                />
                <button
                    data-testid="InvitationSubmitButton"
                    className={css({
                        width: '100%',
                        marginTop: '3rem',
                        height: '3rem'
                    })}
                    onClick={handleSubmit}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Sending, please wait...' : 'Send'}
                </button>
                <ErrorMessage>{formData.serverErrorMessage}</ErrorMessage>
            </Modal>
        );
    }
}
