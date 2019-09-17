import { Modal } from '@sample/components/modal';
import { ModalInvitationComplete } from '@sample/components/modal-invitation-complete';
import { ModalInvitationForm } from '@sample/components/modal-invitation-form';
// import * as TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { HomeComponent } from '../client/pages/home';

test('Modal Testing', async () => {
    // Arrange
    const handleClose = jest.fn();

    // Act
    const { getByText, getByTestId, rerender } = render(
        <Modal handleClose={handleClose}>
            <div>test</div>
        </Modal>
    );

    // Assert
    expect(getByText('test')).toBeTruthy();

    // Act
    getByTestId('ModalOverlay').click();

    // Assert
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Act
    rerender(
        <Modal>
            <div>test</div>
        </Modal>
    );

    // Act
    getByTestId('ModalOverlay').click();
});

test('Modal Invitation Form Testing', async () => {
    // Arrange
    const handleClose = jest.fn();
    const handleInputChange = jest.fn();
    const handleSubmit = jest.fn();

    // Act
    const { getByTestId, rerender } = render(
        <ModalInvitationForm
            handleClose={handleClose}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            formData={{
                fullName: {
                    value: undefined,
                    isValid: true
                },
                email: {
                    value: undefined,
                    isValid: true
                },
                confirmEmail: {
                    value: undefined,
                    isValid: true
                },
                serverErrorMessage: undefined
            }}
            isProcessing={false}
            testid="ModalInvitationFormModal"
        />
    );

    // Assert
    expect(getByTestId('ModalInvitationFormModal')).toBeTruthy();

    // Act
    const fullNameTextbox = getByTestId('fullNameTextbox');
    userEvent.type(fullNameTextbox, 'f');

    // Assert
    expect(handleInputChange).toHaveBeenCalledTimes(1);

    // Act
    const submitButton = getByTestId('InvitationSubmitButton');
    userEvent.click(submitButton);

    // Assert
    expect(handleSubmit).toHaveBeenCalledTimes(1);

    // Act
    rerender(
        <ModalInvitationForm
            handleClose={handleClose}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            formData={{
                fullName: {
                    value: 'ff',
                    isValid: false
                },
                email: {
                    value: undefined,
                    isValid: true
                },
                confirmEmail: {
                    value: undefined,
                    isValid: true
                },
                serverErrorMessage: undefined
            }}
            isProcessing={false}
            testid="ModalInvitationFormModal"
        />
    );

    // Assert
    expect(getByTestId('fullNameTextbox')).toHaveStyle(`outline: 1.5px solid red;`);
});

test('Modal Invitation Complete Testing', async () => {
    // Arrange
    const handleClose = jest.fn();

    // Act
    const { getByTestId } = render(
        <ModalInvitationComplete
            handleClose={handleClose}
            testid="ModalInvitationCompleteModal"
        />
    );

    // Arrange
    expect(getByTestId('ModalInvitationCompleteModal')).toBeTruthy();
});

test('Home Page Component Testing', async () => {
    // Act
    const { getByText, getByTestId, queryByTestId } = render(<HomeComponent />);
    const requestButton = getByText('Request an invite');

    // Assert
    expect(requestButton).toBeTruthy();

    // Act
    userEvent.click(requestButton);
    const invitationFormModal = getByTestId('ModalInvitationFormModal');

    // Assert
    expect(invitationFormModal).toBeTruthy();

    // Act
    const fullNameTextbox = getByTestId('fullNameTextbox');
    userEvent.type(fullNameTextbox, 'test');
    const emailTextbox = getByTestId('emailTextbox');
    userEvent.type(emailTextbox, 'bean@mail.com');
    const confirmEmailTextbox = getByTestId('confirmEmailTextbox');
    userEvent.type(confirmEmailTextbox, 'bean@mail.com');

    // Assert
    expect(fullNameTextbox).toHaveProperty('value', 'test');
    expect(emailTextbox).toHaveProperty('value', 'bean@mail.com');
    expect(confirmEmailTextbox).toHaveProperty('value', 'bean@mail.com');

    // Act
    const submitButton = getByTestId('InvitationSubmitButton');
    userEvent.click(submitButton);

    // Assert
    expect(getByTestId('ModalInvitationCompleteModal')).toBeTruthy();

    // Act
    const completeButton = getByTestId('InvitationCompleteButton');
    userEvent.click(completeButton);

    // Assert
    expect(queryByTestId('ModalInvitationCompleteModal')).toBeNull();
});
