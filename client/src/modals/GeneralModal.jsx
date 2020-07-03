import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const GeneralModal = () => {
  const [size, setSize] = useState('tiny');
  const [show, showModal] = useState({ confirm: false, parts: [] });
  const [contents, setContents] = useState({});

  const Modal = () => {
    if (show.confirm)
      return ReactDOM.createPortal(
        <div
          className="ui active dimmer"
          onClick={() => showModal({ confirm: false })}
        >
          <div className={`ui ${size} test modal transition visible active`}>
            {show.parts.includes('header') ? (
              <div className="header">{contents.header()}</div>
            ) : null}
            {show.parts.includes('content') ? (
              <div className="content">{contents.content()}</div>
            ) : null}
            {show.parts.includes('actions') ? (
              <div className="actions">{contents.actions()}</div>
            ) : null}
          </div>
        </div>,
        document.querySelector('#loader')
      );
    else return null;
  };

  return { setSize, showModal, setContents, Modal };
};

export default GeneralModal;
