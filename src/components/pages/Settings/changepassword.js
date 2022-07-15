import {Button, Modal} from 'react-bootstrap';
import { memo, useState } from 'react';

const ChangePasswordModal = ({title, showflag}) => {
  console.log("sub changepassword=?", title)
  console.log("sub showflag=?", showflag)
    const [show, setShow] = useState(showflag);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChangePassword = () => {

    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Password forgotten?
            </Button>
            <Button variant="primary" onClick={handleChangePassword}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default memo(ChangePasswordModal);