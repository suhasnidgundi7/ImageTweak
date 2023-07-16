"use client";

import React from "react";
import Modal from "react-modal";
import { useManagedUI } from "../utils/context/ManagedUI";

Modal.setAppElement("body");

const CModal = (props) => {
  const { isModalOpen, setModalOpen } = useManagedUI();

  const {
    isOpen,
    handleAfterOpen,
    handleAfterClose,
    handleRequestClose,
    closeTimeoutMS,
    style,
    contentLabel,
    portalClassName,
    overlayClassName,
    id,
    className,
    bodyOpenClassName,
    htmlOpenClassName,
    ariaHideApp,
    shouldFocusAfterRender,
    shouldCloseOnOverlayClick,
    shouldCloseOnEsc,
    shouldReturnFocusAfterClose,
    role,
    preventScroll,
    parentSelector,
    aria,
    data,
    testId,
    overlayRef,
    contentRef,
    overlayElement,
    contentElement,
    modalTitle,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
      onRequestClose={handleRequestClose}
      closeTimeoutMS={closeTimeoutMS}
      style={style}
      contentLabel={contentLabel}
      portalClassName={portalClassName}
      overlayClassName={overlayClassName}
      id={id}
      className={className}
      bodyOpenClassName={bodyOpenClassName}
      htmlOpenClassName={htmlOpenClassName}
      ariaHideApp={ariaHideApp}
      shouldFocusAfterRender={shouldFocusAfterRender}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={shouldCloseOnEsc}
      shouldReturnFocusAfterClose={shouldReturnFocusAfterClose}
      role={role}
      preventScroll={preventScroll}
      parentSelector={parentSelector}
      aria={aria}
      data={data}
      testId={testId}
      overlayRef={overlayRef}
      contentRef={contentRef}
      overlayElement={overlayElement}
      contentElement={contentElement}
      modalTitle={modalTitle}
    >
      {/* Modal content */}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{props.modalTitle}</h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setModalOpen(false)}
            ></button>
          </div>
          <hr />
          {props.children}
        </div>
      </div>
    </Modal>
  );
};

export default CModal;
