import { Modal } from 'react-bootstrap'


const CoinDetailsModal = ({ selectedCoin, setSelectedCoin }:any) => {
   
    const handleClose = () => {
        setSelectedCoin(null)
    }

  return (
      <Modal show={selectedCoin?true:false}>
          <Modal.Header> Modal Header <button onClick={handleClose}>Close</button> </Modal.Header>
          <Modal.Body> {selectedCoin} </Modal.Body>
      </Modal>
  );
};

export default CoinDetailsModal;
