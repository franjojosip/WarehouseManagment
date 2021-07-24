import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import "../../../common/styles/Modal.css";


export default function ModalUser({ modalTarget, roles, onSubmit, fname, lname, email, phone, password, role_name, onRoleChange, onFirstNameChange, onLastNameChange, onEmailChange, onPhoneChange, onPasswordChange, isSubmitDisabled }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;
  let isCreate = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Kreiraj novog korisnika";
    submitText = "Dodaj"
    isCreate = true;
  }
  else if (modalTarget === "modalTargetEdit") {
    submitClassName = "btn btn-success";
    modalTitle = "Izmijenite korisnika";
    submitText = "Izmijeni";
  }
  else {
    submitClassName = "btn btn-danger";
    modalTitle = "Želite li sigurno obrisati ovog korisnika?";
    submitText = "Obriši";
    isDisabled = true;
  }
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
    <div className="modal fade" id={modalTarget} tabIndex="-1" aria-labelledby="modalTarget" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title" id="modalTarget">{modalTitle}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Form style={{ margin: 15 }}>
            <Form.Group size="md" controlId="fname">
              <Form.Label>Ime *</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={fname}
                minLength="4"
                required
                {...config}
                placeholder="Unesite ime"
                onChange={(e) => onFirstNameChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="lname">
              <Form.Label>Prezime *</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={lname}
                minLength="4"
                required
                {...config}
                placeholder="Unesite prezime"
                onChange={(e) => onLastNameChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                minLength="4"
                required
                {...config}
                placeholder="Unesite email"
                onChange={(e) => onEmailChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="phone">
              <Form.Label>Broj mobitela *</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={phone}
                minLength="6"
                maxLength="10"
                required
                {...config}
                placeholder="Unesite broj mobitela"
                onChange={(e) => onPhoneChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="password">
              <Form.Label>Lozinka *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="password"
                    value={password}
                    disabled={isDisabled}
                  />
                  :
                  <Form.Control
                    autoFocus
                    type="text"
                    value={password}
                    minLength="4"
                    required
                    {...config}
                    placeholder="Unesite lozinku"
                    onChange={(e) => onPasswordChange(e.target.value)}
                  />
              }

            </Form.Group>
            <Form.Group size="md" controlId="role_name">
              <Form.Label>Uloga *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={role_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="customDropdown" variant="secondary" title={role_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {roles.map((role) => {
                      return <Dropdown.Item key={role.role_id} onSelect={() => onRoleChange(role)}>{role.role_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <div hidden={isDisabled || !isSubmitDisabled}>
              <p style={{ color: "red" }}>
                Provjerite sva polja !!!
              </p>
            </div>
            <div className="modal-footer" style={{ padding: 0 }}>
              <Button className="btn btn-primary" data-dismiss="modal">Odustani</Button>
              <Button type="submit" disabled={isSubmitDisabled} className={submitClassName} onClick={(e) => { e.preventDefault(); onSubmit() }}>{submitText}</Button>
            </div>
          </Form>
        </div>
      </div>
    </div >
  );
};