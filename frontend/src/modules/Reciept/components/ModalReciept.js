import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import '../styles/ModalReciept.css';


export default function ModalReciept({ modalTarget, onSubmit, warehouse_name, product_name, quantity, warehouses, products, onWarehouseChange, onProductChange, onQuantityChange, isSubmitDisabled }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Kreiraj novo preuzimanje";
    submitText = "Dodaj"
  }
  else if (modalTarget === "modalTargetEdit") {
    submitClassName = "btn btn-success";
    modalTitle = "Izmijenite ovo preuzimanje";
    submitText = "Izmijeni";
  }
  else {
    submitClassName = "btn btn-danger";
    modalTitle = "Želite li sigurno obrisati ovo preuzimanje?";
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
                  <DropdownButton id="categoryDropdown" variant="secondary" title={warehouse_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {warehouses.map((warehouse) => {
                      return <Dropdown.Item key={warehouse.warehouse_id} onSelect={() => onWarehouseChange(warehouse)}>{warehouse.warehouse_name}</Dropdown.Item>;
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
                  <DropdownButton id="categoryDropdown" variant="secondary" title={product_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {products.map((product) => {
                      return <Dropdown.Item key={product.product_id} onSelect={() => onProductChange(product)}>{product.product_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="product_name">
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