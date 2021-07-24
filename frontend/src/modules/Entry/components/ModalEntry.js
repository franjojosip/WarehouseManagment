import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import React from "react";

import "../../../common/styles/Modal.css";

export default function ModalEntry({ modalTarget, warehouses, cities, locations, products, packagings, warehouse_name, city_name, location_name, product_name, packaging_name, quantity, onSubmit, onWarehouseChange, onCityChange, onLocationChange, onProductChange, onPackagingChange, onQuantityChange, isSubmitDisabled }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Dodaj proizvod na stanje";
    submitText = "Dodaj"
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
            <Form.Group size="md" controlId="warehouse_name">
              <Form.Label>Naziv Skladišta *</Form.Label>
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
            <Form.Group size="md" controlId="product_name">
              <Form.Label>Naziv Proizvoda *</Form.Label>
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

            <Form.Group size="md" controlId="packaging_name">
              <Form.Label>Naziv Ambalaže *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={packaging_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="customDropdown" variant="secondary" title={packaging_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {packagings.map((packaging) => {
                      return <Dropdown.Item key={packaging.packaging_id} onSelect={() => onPackagingChange(packaging)}>{packaging.packaging_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="quantity">
              <Form.Label>Količina *</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                required
                {...config}
                onChange={(e) => {
                  onQuantityChange(e.target.value);
                }}
                placeholder="Unesite količinu koju dodajete na stanje [min: 1]"
                disabled={isDisabled}
              />
            </Form.Group>
            <div hidden={isDisabled || !isSubmitDisabled}>
              <p style={{ color: "red" }}>
                Provjerite sva polja !!!
              </p>
            </div>
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