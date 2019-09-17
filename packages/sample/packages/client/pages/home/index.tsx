import { UsersAPI } from '@sample/apis';
import {
    IIModalInvitationFormData,
    IIModalInvitationFormError,
    ModalInvitationForm
} from '@sample/components/modal-invitation-form';
import { ModalInvitationComplete } from '@sample/components/modal-invitiation-complete';
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
    formData: IIModalInvitationFormData;
    formError: IIModalInvitationFormError;
}

const getDefaultFormDataState = (): IIModalInvitationFormData => {
    return {
        fullName: undefined,
        email: undefined,
        confirmEmail: undefined
    };
};

const getDefaultFormErrorState = (): IIModalInvitationFormError => {
    return {
        fullName: false,
        email: false,
        confirmEmail: false,
        serverError: undefined
    };
};

export class HomeComponent extends React.Component<{}, IHomeState> {
    constructor(props) {
        super(props);

        this.state = {
            isInvitationFormShown: false,
            isInvitationFormCompleted: false,
            isProcessing: false,
            formData: getDefaultFormDataState(),
            formError: getDefaultFormErrorState()
        };
    }

    toggleForm = () => {
        const isShown = !this.state.isInvitationFormShown;

        const newState = produce(this.state, draft => {
            draft.isInvitationFormShown = isShown;
            if (isShown) {
                draft.formData = getDefaultFormDataState();
                draft.formError = getDefaultFormErrorState();
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
                draft.formData[name] = value;
            })
        );
    };

    handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { formData } = this.state;
        if (this.validateFormData()) {
            this.setState({ isProcessing: true }, () => {
                const usersAPI = new UsersAPI();
                usersAPI
                    .register(formData.fullName, formData.email)
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
                                    draft.formError.serverError =
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
        const { formData } = this.state;
        const formError: IIModalInvitationFormError = getDefaultFormErrorState();

        if ((formData.fullName || '').length < 3) {
            formError.fullName = true;
        }

        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                formData.email || ''
            )
        ) {
            formError.email = true;
        }

        if (
            formData.confirmEmail !== formData.email ||
            formData.confirmEmail === undefined
        ) {
            formError.confirmEmail = true;
        }

        const hasError: boolean =
            (Object.values(formError) as boolean[]).filter(val => val === true).length > 0;

        this.setState({ formError });

        return !hasError;
    };

    render() {
        return (
            <React.Fragment>
                <Wrapper>
                    <span className={IntroCSS}>A better way</span>
                    <span className={IntroCSS}>to enjoy every day.</span>
                    <span className={NotedCSS}>Be the first to know when we launch.</span>
                    <span className={ButtonCSS} onClick={this.toggleForm}>
                        Request an invite
                    </span>
                    {this.state.isInvitationFormShown && (
                        <ModalInvitationForm
                            handleClose={this.toggleForm}
                            handleInputChange={this.handleInputChange}
                            handleSubmit={this.handleFormSubmit}
                            data={this.state.formData}
                            error={this.state.formError}
                            isProcessing={this.state.isProcessing}
                        />
                    )}
                    {this.state.isInvitationFormCompleted && (
                        <ModalInvitationComplete handleClose={this.toggleComplete} />
                    )}
                </Wrapper>
            </React.Fragment>
        );
    }
}
