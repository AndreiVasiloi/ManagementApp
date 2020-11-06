// import React from 'react';
// import ModalWrapper from '../../app/common/modals/ModalWrapper';

import React from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { closeRegisterModal, openRegisterModal } from '../../app/common/modals/modalReducer';
import LoginForm from '../auth/LoginForm';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '40%',
      transform             : 'translate(-50%, -50%)'
    }
  };
export default function TestModal() {
    var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { showRegisterModal } = useSelector((state) => state.modals);
  console.log(showRegisterModal);
  function openModal() {
    dispatch(openRegisterModal(true))
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    dispatch(closeRegisterModal(false))
  }
    return (
        <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={showRegisterModal}
        //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <h2>Login</h2>
        <Icon name='close' />
         <LoginForm/>
        </Modal>
      </div>
    )
}







// export default function TestModal({data}) {
//     return (
//         <ModalWrapper size='mini' header='Test Modal'>
//             <div>The data is: {data}</div>
//         </ModalWrapper>
//     )
// }