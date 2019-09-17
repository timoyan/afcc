import * as React from 'react';
import { css } from 'react-emotion';
import { Modal } from '../modal';

interface IModalInvitationCompleteProps {
    handleClose: () => void;
    testid?: string;
}

export class ModalInvitationComplete extends React.PureComponent<
    IModalInvitationCompleteProps
> {
    static displayName: string = 'ModalInvitationComplete';

    render() {
        return (
            <Modal testId={this.props.testid}>
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
                    data-testid={'InvitationCompleteButton'}
                >
                    OK
                </button>
            </Modal>
        );
    }
}
