import { UsersAPI } from '@sample/apis';
import {
    IIModalInvitationFormData,
    IIModalInvitationFormError,
    ModalInvitationForm
} from '@sample/components/modal-invitation-form';
import { produce } from 'immer';
import * as React from 'react';
import styled, { css } from 'react-emotion';
import { of } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
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
    formData: IIModalInvitationFormData;
    formError: IIModalInvitationFormError;
}

export class HomeComponent extends React.Component<{}, IHomeState> {
    constructor(props) {
        super(props);

        this.state = {
            isInvitationFormShown: false,
            formData: {
                fullName: undefined,
                email: undefined,
                confirmEmail: undefined
            },
            formError: {
                fullName: undefined,
                email: undefined,
                confirmEmail: undefined
            }
        };
    }

    toggleForm = () => {
        const isShown = !this.state.isInvitationFormShown;

        const newState = produce(this.state, draft => {
            draft.isInvitationFormShown = isShown;
            if (isShown) {
                draft.formData = {
                    fullName: undefined,
                    email: undefined,
                    confirmEmail: undefined
                };

                draft.formError = {
                    fullName: undefined,
                    email: undefined,
                    confirmEmail: undefined
                };
            }
        });

        this.setState(newState);
    };

    handleInputChange = (name: string, value: string) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    };

    handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { formData } = this.state;
        if (this.validateFormData()) {
            const usersAPI = new UsersAPI();
            usersAPI
                .register(formData.fullName, formData.email)
                .pipe(
                    switchMap((value, index) => {
                        console.log(value);
                        return of();
                    }),
                    catchError((err: AjaxError) => {
                        console.log(err);
                        return of();
                    })
                )
                .subscribe();
        }
    };

    validateFormData = () => {
        const { formData } = this.state;
        const formError: IIModalInvitationFormError = {
            fullName: undefined,
            email: undefined,
            confirmEmail: undefined
        };

        if ((formData.fullName || '').length < 3) {
            formError.fullName = 'Error';
        }

        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                formData.email || ''
            )
        ) {
            formError.email = 'Error';
        }

        if (
            formData.confirmEmail !== formData.email ||
            formData.confirmEmail === undefined
        ) {
            formError.confirmEmail = 'Error';
        }

        const hasError: boolean =
            (Object.values(formError) as string[]).filter(val => val === 'Error').length >
            0;

        if (hasError) {
            this.setState({ formError });
        }

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
                        />
                    )}
                </Wrapper>
            </React.Fragment>
        );
    }
}
