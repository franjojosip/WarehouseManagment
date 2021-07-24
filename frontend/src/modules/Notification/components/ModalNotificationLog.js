import { Form, Button } from 'react-bootstrap';
import React from "react";

import "../../../common/styles/Modal.css";

export default function ModalNotificationLog({ modalTarget, notification_name, notification_type, notification_products, email, date_created }) {
  let isDisabled = true;
  return (
    <div className="modal fade" id={modalTarget} tabIndex="-1" aria-labelledby="modalTarget" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="title" id="modalTarget">Prikaz detalja obavijesti</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Form style={{ margin: 15 }}>
            <Form.Group size="md" controlId="notification_name">
              <Form.Label>Naziv Notifikacije</Form.Label>
              <Form.Control
                type="text"
                value={notification_name}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="notification_type">
              <Form.Label>Tip Notifikacije</Form.Label>
              <Form.Control
                type="text"
                value={notification_type}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="notification_products">
              <Form.Label>Proizvodi za nadopuniti</Form.Label>
              <Form.Control
                type="text"
                value={notification_products.join(", ")}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="email">
              <Form.Label>Email Primatelja</Form.Label>
              <Form.Control
                type="text"
                value={email}
                disabled={isDisabled}
              />
            </Form.Group>
            <Form.Group size="md" controlId="date_created">
              <Form.Label>Datum slanja obavijesti</Form.Label>
              <Form.Control
                type="text"
                value={date_created}
                disabled={isDisabled}
              />
            </Form.Group>
            <div className="modal-footer" style={{ padding: 0 }}>
              <Button className="btn btn-primary" data-dismiss="modal">Uredu</Button>
            </div>
          </Form>
        </div>
      </div>
    </div >
  );
};