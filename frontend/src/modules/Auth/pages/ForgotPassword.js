import React from "react";
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from '../stores/AuthenticationViewStore';
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';

import "../styles/ForgotPassword.css";

@inject(
    i => ({
        viewStore: new AuthenticationViewStore(i.rootStore)
    })
)
@observer
class ForgotPassword extends React.Component {
    render() {
        const { email, errorMessage, isLoaderVisible, onResetPasswordEmailChange, isSubmitDisabled, onForgotPasswordSubmit } = this.props.viewStore;

        return (
            <React.Fragment>
                <Loading visible={isLoaderVisible} />
                <ToastContainer style={{ fontSize: 15 }} />
                <ForgotPasswordForm email={email} onSubmit={onForgotPasswordSubmit} onEmailChange={onResetPasswordEmailChange} errorMessage={errorMessage} isSubmitDisabled={isSubmitDisabled} />
            </React.Fragment>
        );
    };
}

export default ForgotPassword;