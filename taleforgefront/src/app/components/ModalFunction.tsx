'use client'
import React, { useState } from'react';
import ModalDesign from './ModalDesign';
const Modal = () => {
    const showModal = () => {
        const modal = document.getElementById('my_modal_2')
        if (modal instanceof HTMLDialogElement) {
            modal.showModal()
        }
    };
    const handleClick = () => {
        alert('hello')
    }

    return (
        <div>
            <button className="btn" onClick={showModal}>
                open modal
            </button>
           <ModalDesign onClick={handleClick} />
        </div>
    )
}

export default Modal