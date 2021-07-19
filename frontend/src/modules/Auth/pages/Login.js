import React from "react";
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from '../stores/AuthenticationViewStore';
import LoginForm from "../components/LoginForm";

import "../styles/Login.css";

@inject(
  i => ({
    viewStore: new AuthenticationViewStore(i.rootStore)
  })
)
@observer
class Login extends React.Component {
  render() {
    const { email, password, onEmailChange, onPasswordChange, onForgotPasswordClick, isSubmitDisabled, onLogin } = this.props.viewStore;

    return (
      <LoginForm email={email} password={password} onForgotPasswordClick={onForgotPasswordClick} onSubmit={onLogin} onEmailChange={onEmailChange} onPasswordChange={onPasswordChange} isSubmitDisabled={isSubmitDisabled} />
    );
  };
}

export default Login;