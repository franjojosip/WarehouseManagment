import React from "react";
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from '../stores/AuthenticationViewStore';
import ResetPasswordForm from "../components/ResetPasswordForm";
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';

import "../styles/ForgotPassword.css";

@inject(
    i => ({
        viewStore: new AuthenticationViewStore(i.rootStore)
    })
)
@observer
class ResetPassword extends React.Component {
    render() {
        const { oldPassword, newPassword, resetPasswordMessage, isLoaderVisible, onOldPasswordChange, onNewPasswordChange, isSubmitDisabled, onResetPasswordSubmit } = this.props.viewStore;

        return (
            <React.Fragment>
                <Loading visible={isLoaderVisible} />
                <ToastContainer style={{ fontSize: 15 }} />
                <ResetPasswordForm oldPassword={oldPassword} newPassword={newPassword} onSubmit={onResetPasswordSubmit} onOldPasswordChange={onOldPasswordChange} onNewPasswordChange={onNewPasswordChange} resetPasswordMessage={resetPasswordMessage} isSubmitDisabled={isSubmitDisabled} />
            </React.Fragment>
        );
    };
}

export default ResetPassword;