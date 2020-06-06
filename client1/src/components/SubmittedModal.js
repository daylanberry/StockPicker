import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const SubmittedModal = ({ show, close }) => {

  return (
    <>
      <Modal show={show} animation={true}>
        <Modal.Header>
          <Modal.Title>Successfully Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You successfully bought this stock!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => close(false)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default SubmittedModal