import React, { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return [modal, toggleModal, handleSubmit, setModal];
};
