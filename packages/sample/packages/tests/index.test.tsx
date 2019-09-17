import { Modal } from '@sample/components/modal';
import { ModalInvitationForm } from '@sample/components/modal-invitation-form';
import { ModalInvitationComplete } from '@sample/components/modal-invitiation-complete';
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

describe('modal', () => {
    it('Snapshot Testing', () => {
        const tree = TestRenderer.create(<Modal />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe('modal-invitation-form', () => {
    it('Snapshot Testing', () => {
        const tree = TestRenderer.create(
            <ModalInvitationForm
                handleClose={undefined}
                handleInputChange={undefined}
                handleSubmit={undefined}
                data={{ fullName: '', email: '', confirmEmail: '' }}
                error={{
                    fullName: false,
                    email: false,
                    confirmEmail: false,
                    serverError: ''
                }}
                isProcessing={false}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

describe('modal-invitiation-complete', () => {
    it('Snapshot Testing', () => {
        const tree = TestRenderer.create(
            <ModalInvitationComplete handleClose={undefined} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
