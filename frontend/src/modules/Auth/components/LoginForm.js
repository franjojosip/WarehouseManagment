import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import '../styles/Login.css';


export default function LoginForm({ email, password, onEmailChange, onPasswordChange, onForgotPasswordClick, onSubmit, isSubmitDisabled }) {

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: "Unesite vrijednost u polje",
      },
    ],
  };

  return (
    <div className="Login">
      <Form style={{ margin: 15 }}>
        <h1>Prijava</h1>
        <Form.Group size="md" controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={email}
            minLength="4"
            required
            {...config}
            placeholder="Unesite email"
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="md" controlId="password">
          <Form.Label>Lozinka *</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={password}
            minLength="4"
            required
            {...config}
            placeholder="Unesite lozinku"
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </Form.Group>
        <div hidden={!isSubmitDisabled}>
          <p style={{ color: "red", textAlign:"right"}}>
            Provjerite sva polja !!!
          </p>
        </div>
        <a href="/forgotpassword">Zaboravljena lozinka?</a>
        <div className="modal-footer" style={{ padding: 0 }}>
          <Button type="submit" disabled={isSubmitDisabled} className="btn btn-success" onClick={(e) => { e.preventDefault(); onSubmit() }}>Prijavi se</Button>
        </div>
      </Form>
    </div>
  );
};