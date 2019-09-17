import { UsersAPI } from '@sample/apis/users';
import { ModalInvitationComplete } from '@sample/components/modal-invitation-complete';
import {
    IInivitationForm,
    IInivitationFormField,
    ModalInvitationForm
} from '@sample/components/modal-invitation-form';
import { produce } from 'immer';
import * as React from 'react';
import styled, { css } from 'react-emotion';
import { of } from 'rxjs';
import { AjaxError, AjaxResponse } from 'rxjs/ajax';
import { catchError, switchMap } from 'rxjs/operators';

const Wrapper = styled('div')({
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
});

const IntroCSS = css({
    fontWeight: 900,
    fontSize: '4.5rem',
    wordSpacing: '0.5rem',
    lineHeight: 1,
    '@media (max-width: 480px)': {
        fontSize: '3rem'
    }
});

const NotedCSS = css({
    marginTop: '25px',
    fontSize: '2rem',
    wordSpacing: '0.25rem',
    '@media (max-width: 480px)': {
        fontSize: '1.5rem'
    }
});

const ButtonCSS = css({
    marginTop: '25px',
    padding: '1.3rem 2rem',
    border: '1px solid black',
    fontSize: '2rem',
    wordSpacing: '0.25rem',
    cursor: 'pointer',
    '@media (max-width: 480px)': {
        fontSize: '1.5rem'
    }
});

interface IHomeState {
    isInvitationFormShown: boolean;
    isInvitationFormCompleted: boolean;
    isProcessing: boolean;
    formData: IInivitationForm;
}

const getDefaultFormDataState = (): IInivitationForm => {
    return {
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
    };
};

export class HomeComponent extends React.Component<{}, IHomeState> {
    constructor(props) {
        super(props);

        this.state = {
            isInvitationFormShown: false,
            isInvitationFormCompleted: false,
            isProcessing: false,
            formData: getDefaultFormDataState()
        };
    }

    toggleForm = () => {
        const isShown = !this.state.isInvitationFormShown;

        const newState = produce(this.state, draft => {
            draft.isInvitationFormShown = isShown;
            if (isShown) {
                draft.formData = getDefaultFormDataState();
            }
        });

        this.setState(newState);
    };

    toggleComplete = () => {
        this.setState({ isInvitationFormCompleted: false });
    };

    handleInputChange = (name: string, value: string) => {
        this.setState(
            produce(this.state, draft => {
                draft.formData[name]['value'] = value;
            })
        );
    };

    handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newFormData = this.validateFormData();

        const hasError: boolean =
            (Object.values(newFormData) as IInivitationFormField[]).filter(
                (val: IInivitationFormField) => !!val && !val.isValid
            ).length > 0;

        if (hasError) {
            this.setState({ formData: newFormData });
        } else {
            this.setState({ isProcessing: true, formData: newFormData }, () => {
                const usersAPI = new UsersAPI();
                usersAPI
                    .register(newFormData.fullName.value, newFormData.email.value)
                    .pipe(
                        switchMap((value, index) => {
                            return of(value);
                        }),
                        catchError((err: AjaxError) => {
                            throw err;
                        })
                    )
                    .subscribe({
                        next: (val: AjaxResponse) => {
                            this.setState({
                                isInvitationFormCompleted: true,
                                isInvitationFormShown: false
                            });
                        },
                        error: (err: AjaxError) => {
                            this.setState(
                                produce(this.state, draft => {
                                    draft.formData.serverErrorMessage =
                                        err.response['errorMessage'];
                                    draft.isProcessing = false;
                                })
                            );
                        },
                        complete: () => {
                            this.setState({ isProcessing: false });
                        }
                    });
            });
        }
    };

    validateFormData = () => {
        const emailReg: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return produce<IInivitationForm>(this.state.formData, draft => {
            draft.fullName.isValid = (draft.fullName.value || '').length >= 3;

            draft.email.isValid = emailReg.test(draft.email.value || '');

            draft.confirmEmail.isValid =
                draft.confirmEmail.value !== undefined &&
                draft.confirmEmail.value === draft.email.value;

            draft.serverErrorMessage = '';
        });
    };

    render() {
        return (
            <Wrapper>
                <span className={IntroCSS}>A better way</span>
                <span className={IntroCSS}>to enjoy every day.</span>
                <span className={NotedCSS}>Be the first to know when we launch.</span>
                <span
                    className={ButtonCSS}
                    onClick={this.toggleForm}
                    data-qa-element="RequestInviteButton"
                >
                    Request an invite
                </span>
                {this.state.isInvitationFormShown && (
                    <ModalInvitationForm
                        handleClose={this.toggleForm}
                        handleInputChange={this.handleInputChange}
                        handleSubmit={this.handleFormSubmit}
                        formData={this.state.formData}
                        isProcessing={this.state.isProcessing}
                        testid={'ModalInvitationFormModal'}
                    />
                )}
                {this.state.isInvitationFormCompleted && (
                    <ModalInvitationComplete handleClose={this.toggleComplete} />
                )}
            </Wrapper>
        );
    }
}
