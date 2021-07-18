import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { inject, observer } from 'mobx-react';
import AuthenticationViewStore from '../stores/AuthenticationViewStore';
import "../Login.css";


@inject(
  i => ({
    viewStore: new AuthenticationViewStore(i.rootStore)
  })
)
@observer
class Login extends React.Component {
  render() {
    const { email, password, onEmailChange, onPasswordChange, onLogin } = this.props.viewStore;

    return (
      <div className="Login">
        <Form >
          <h1>Prijava</h1>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              required
              placeholder="Unesi email"
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type="password"
              value={password}
              required
              placeholder="Unesi lozinku"
              minLength="5"
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" onClick={(e) => { e.preventDefault(); onLogin() }}>
            Prijavi se
          </Button>
        </Form>
      </div>

    );
  };
}

export default Login;