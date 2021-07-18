import '../styles/ModalCity.css';
import { Form, Button } from 'react-bootstrap';
import React from "react";


export default function ModalCity({ modalTarget, onSubmit, name, zip_code, onNameChange, onZipCodeChange, isSubmitDisabled }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Kreiraj novi grad";
    submitText = "Dodaj"
  }
  else if (modalTarget === "modalTargetEdit") {
    submitClassName = "btn btn-success";
    modalTitle = "Izmijenite ovaj grad";
    submitText = "Izmijeni";
  }
  else {
    submitClassName = "btn btn-danger";
    modalTitle = "Želite li sigurno obrisati ovaj grad?";
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
            <Form.Group size="md" controlId="city_name">
              <Form.Label>Naziv Grada *</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                minLength="2"
                required
                {...config}
                placeholder="Unesite naziv grada"
                onChange={(e) => onNameChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="city_zip_code">
              <Form.Label>Poštanski broj [5 znamenki] *</Form.Label>
              <Form.Control
                type="text"
                value={zip_code}
                required
                minLength="5"
                maxLength="5"
                {...config}
                onChange={(e) => {
                  onZipCodeChange(e.target.value);
                }}
                placeholder="Unesite poštanski broj"
                disabled={isDisabled}
              />
            </Form.Group>
            <div className="modal-footer" style={{ padding: 0 }}>
              <Button className="btn btn-primary" data-dismiss="modal">Odustani</Button>
              <Button type="submit" disabled={isSubmitDisabled} className={submitClassName} onClick={onSubmit}>{submitText}</Button>
            </div>
          </Form>
        </div>
      </div>
    </div >
  );
};