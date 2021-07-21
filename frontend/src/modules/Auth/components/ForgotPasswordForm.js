import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import '../styles/ForgotPassword.css';


export default function ForgotPasswordForm({ email, onEmailChange, onSubmit, isSubmitDisabled }) {

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
    <div className="ForgotPassword">
      <Form style={{ margin: 15 }}>
        <h1>Zaboravljena lozinka</h1>
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
        <div hidden={!isSubmitDisabled}>
          <p style={{ color: "red", textAlign:"right"}}>
            Provjerite sva polja !!!
          </p>
        </div>
        <div className="modal-footer" style={{ padding: 0 }}>
          <a href="/login" className="btn btn-primary">Nazad</a>
          <Button type="submit" disabled={isSubmitDisabled} className="btn btn-success" onClick={(e) => { e.preventDefault(); onSubmit() }}>Resetiraj lozinku</Button>
        </div>
      </Form>
    </div>
  );
};