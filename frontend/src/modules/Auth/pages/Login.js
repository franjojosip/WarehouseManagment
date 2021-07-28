import React from "react";
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from '../stores/AuthenticationViewStore';
import LoginForm from "../components/LoginForm";
import Loading from '../../../common/layouts/Loading';
import { ToastContainer } from 'react-toastify';

import "../styles/Login.css";

@inject(
  i => ({
    viewStore: new AuthenticationViewStore(i.rootStore)
  })
)
@observer
class Login extends React.Component {
  render() {
    const { email, password, onEmailChange, onPasswordChange, onForgotPasswordClick, isSubmitDisabled, onLogin, isLoaderVisible, errorMessage } = this.props.viewStore;

    return (
      <React.Fragment>
        <Loading visible={isLoaderVisible} />
        <ToastContainer style={{ fontSize: 15 }} />
        <LoginForm errorMessage={errorMessage} email={email} password={password} onForgotPasswordClick={onForgotPasswordClick} onSubmit={onLogin} onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} isSubmitDisabled={isSubmitDisabled} />
      </React.Fragment>
    );
  };
}

export default Login;