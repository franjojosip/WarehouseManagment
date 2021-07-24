import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import "../../../common/styles/Modal.css";


export default function ModalStock({ modalTarget, cities, locations, warehouses, products, onSubmit, city_name, location_name, warehouse_name, product_name, quantity, min_quantity, onCityChange, onLocationChange, onWarehouseChange, onProductChange, onQuantityChange, onMinimumQuantityChange, isSubmitDisabled }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Kreiraj novo stanje";
    submitText = "Dodaj"
  }
  else if (modalTarget === "modalTargetEdit") {
    submitClassName = "btn btn-success";
    modalTitle = "Izmijenite ovo stanje";
    submitText = "Izmijeni";
  }
  else {
    submitClassName = "btn btn-danger";
    modalTitle = "Želite li sigurno obrisati ovo stanje?";
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
            {
              isDisabled ?
                null
                :
                <div className="modal-header" style={{ marginBottom: 5, marginTop: 0, padding: 0 }}>
                  <p><b>Prije odabira skladišta potrebno je odabrati Grad i Lokaciju</b></p>
                </div>
            }
            <Form.Group size="md" controlId="city_name">
              <Form.Label style={{ marginTop: 5 }}>Grad *</Form.Label>
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
              <Form.Label>Lokacija *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={city_name}
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
            <Form.Group size="md" controlId="warehouse_name">
              <Form.Label>Skladište *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={warehouse_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="customDropdown" variant="secondary" title={warehouse_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {warehouses.map((warehouse) => {
                      return <Dropdown.Item key={warehouse.warehouse_id} onSelect={() => onWarehouseChange(warehouse)}>{warehouse.warehouse_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="product_name">
              <Form.Label>Naziv proizvoda *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={product_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="customDropdown" variant="secondary" title={product_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {products.map((product) => {
                      return <Dropdown.Item key={product.product_id} onSelect={() => onProductChange(product)}>{product.product_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="quantity">
              <Form.Label>Količina *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={quantity}
                    disabled={isDisabled}
                  />
                  :
                  <Form.Control
                    type="number"
                    value={quantity}
                    min="1"
                    required
                    {...config}
                    onChange={(e) => {
                      onQuantityChange(e.target.value);
                    }}
                    placeholder="Unesite količinu (minimalno 1)"
                    disabled={isDisabled}
                  />
              }
            </Form.Group>
            <Form.Group size="md" controlId="product_name">
              <Form.Label>Minimalna Količina *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={min_quantity}
                    disabled={isDisabled}
                  />
                  :
                  <Form.Control
                    type="number"
                    value={min_quantity}
                    min="1"
                    required
                    {...config}
                    onChange={(e) => {
                      onMinimumQuantityChange(e.target.value);
                    }}
                    placeholder="Unesite minimalnu količinu (minimalno 1)"
                    disabled={isDisabled}
                  />
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