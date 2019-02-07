export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL"; 
export const RECEIVE_MODAL_DATA = "RECEIVE_MODAL_DATA";

export const openModal = (modal, modalData) => {
  
  return({
    type: OPEN_MODAL,
    modal,
    modalData,
  });
};

export const closeModal = () => {
  return({
    type: CLOSE_MODAL,
  });
};
