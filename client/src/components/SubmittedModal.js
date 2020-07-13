import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const SubmittedModal = ({ show, close, buy, qty, history }) => {

  return (
    <>
      <Modal show={show} animation={true}>
        <Modal.Header>
          <Modal.Title>Successfully Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You successfully {buy ? 'bought' : 'sold'} this stock!</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => history.push('/performance')}>
            Holdings
          </Button>
          <Button variant="success" onClick={() => close(false)}>
            Buy/Sell more!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default withRouter(SubmittedModal)