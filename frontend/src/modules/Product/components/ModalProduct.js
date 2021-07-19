import React from "react";
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';

import '../styles/ModalProduct.css';


export default function ModalProduct({ modalTarget, categories, subcategories, packagings, onSubmit, name, category_name, subcategory_name, packaging_name, onNameChange, onCategoryChange, onSubcategoryChange, onPackagingChange, isSubmitDisabled }) {

  let submitClassName = "";
  let modalTitle = "";
  let submitText = "";
  let isDisabled = false;

  if (modalTarget === "modalTargetAdd") {
    submitClassName = "btn btn-success";
    modalTitle = "Kreiraj novi proizvod";
    submitText = "Dodaj"
  }
  else if (modalTarget === "modalTargetEdit") {
    submitClassName = "btn btn-success";
    modalTitle = "Izmijenite ovaj proizvod";
    submitText = "Izmijeni";
  }
  else {
    submitClassName = "btn btn-danger";
    modalTitle = "Želite li sigurno obrisati ovaj proizvod?";
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
            <Form.Group size="md" controlId="product_name">
              <Form.Label>Naziv Proizvoda *</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                minLength="2"
                required
                {...config}
                placeholder="Unesite naziv proizvoda"
                onChange={(e) => onNameChange(e.target.value)}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="category_name">
              <Form.Label>Naziv Kategorije *</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={category_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="formDropdown" variant="secondary" title={category_name} style={{ marginBottom: 10 }} disabled={isDisabled} required>
                    {categories.map((category) => {
                      return <Dropdown.Item key={"category-" + category.category_id} onSelect={() => onCategoryChange(category)}>{category.category_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
              }
            </Form.Group>
            <Form.Group size="md" controlId="subcategory_name">
              <Form.Label>Naziv Potkategorije</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={subcategory_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="formDropdown" variant="secondary" title={subcategory_name ? subcategory_name : "Odaberi potkategoriju"} style={{ marginBottom: 10 }} disabled={isDisabled}>
                    {subcategories.map((subcategory) => {
                      return <Dropdown.Item key={"subcategory-" + subcategory.subcategory_id} onSelect={() => onSubcategoryChange(subcategory)}>{subcategory.subcategory_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>

              }
            </Form.Group>
            <Form.Group size="md" controlId="packaging_name">
              <Form.Label>Naziv Ambalaže</Form.Label>
              {
                isDisabled ?
                  <Form.Control
                    type="text"
                    value={packaging_name}
                    disabled={isDisabled}
                  />
                  :
                  <DropdownButton id="formDropdown" variant="secondary" title={packaging_name ? packaging_name : "Odaberi ambalažu"} style={{ marginBottom: 10 }} disabled={isDisabled}>
                    {packagings.map((packaging) => {
                      return <Dropdown.Item key={"packaging-" + packaging.packaging_id} onSelect={() => onPackagingChange(packaging)}>{packaging.packaging_name}</Dropdown.Item>;
                    })}
                  </DropdownButton>
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