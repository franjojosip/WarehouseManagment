import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Multiselect from 'multiselect-react-dropdown';

import "../../../common/styles/Modal.css";


export default function ModalWarehouse({ modalTarget, users, cities, selectedUsers, locations, onSubmit, name, city_name, location_name, onNameChange, onCityChange, onLocationChange, isSubmitDisabled, onSelect, onRemove }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Kreiraj novo skladište";
    submitText = "Dodaj"
  }
  else if (modalTarget === "modalTargetEdit") {
    submitClassName = "btn btn-success";
    modalTitle = "Izmijenite ovo skladište";
    submitText = "Izmijeni";
  }
  else {
    submitClassName = "btn btn-danger";
    modalTitle = "Želite li sigurno obrisati ovo skladište?";
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

  let warehouseUsers = selectedUsers.map((user) => { return { name: user.name, id: user.id } });

  let multiSelectDropdownStyle = {
    chips: {
      background: "#C2C2C2",
      padding: 8,
      paddingLeft: 12,
      paddingRight: 12,
      color: "black",
      textWeight: "500"
    }
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
            <Form.Group size="md" controlId="warehouse_name">
              <Form.Label>Naziv Skladišta *</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                minLength="5"
                required
                {...config}
                placeholder="Unesite naziv skladišta"
                onChange={(e) => onNameChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="city_name">
              <Form.Label>Naziv Grada *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={city_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="customDropdown" variant="secondary" title={city_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {cities.map((city) => {
                      return <Dropdown.Item key={city.city_id} onSelect={() => onCityChange(city)}>{city.city_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="location_name">
              <Form.Label>Naziv Lokacije *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={location_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="customDropdown" variant="secondary" title={location_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {locations.map((location) => {
                      return <Dropdown.Item key={location.location_id} onSelect={() => onLocationChange(location)}>{location.location_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="workers">
              <Form.Label>Popis radnika</Form.Label>
              <Multiselect
                options={users}
                selectedValues={warehouseUsers}
                onSelect={onSelect}
                onRemove={onRemove}
                placeholder="Odaberite radnike"
                displayValue="name"
                closeIcon="circle2"
                style={multiSelectDropdownStyle}
                disable={isDisabled}
              />
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