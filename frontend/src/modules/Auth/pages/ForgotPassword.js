import React from "react";
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from '../stores/AuthenticationViewStore';
import ForgotPasswordForm from "../components/ForgotPasswordForm";

import "../styles/ForgotPassword.css";

@inject(
    i => ({
        viewStore: new AuthenticationViewStore(i.rootStore)
    })
)
@observer
class ForgotPassword extends React.Component {
    render() {
        const { email, onResetPasswordEmailChange, isSubmitDisabled, onForgotPasswordSubmit } = this.props.viewStore;

        return (
            <ForgotPasswordForm email={email} onSubmit={onForgotPasswordSubmit} onEmailChange={onResetPasswordEmailChange} isSubmitDisabled={isSubmitDisabled} />
        );
    };
}

export default ForgotPassword;