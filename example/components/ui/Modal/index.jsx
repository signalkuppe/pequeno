import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Script from '../../../../lib/Script';

const ModalStyle = createGlobalStyle`
    .modal__overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal__container {
      padding: 30px;
      max-width: 500px;
      max-height: 100vh;
      border-radius: 4px;
      overflow-y: auto;
      background: white;
    }

    .modal__content {
      margin-top: 2em;
      margin-bottom: 2em;
    }

    @keyframes mmfadeIn {
        from { opacity: 0; }
          to { opacity: 1; }
    }

    @keyframes mmfadeOut {
        from { opacity: 1; }
          to { opacity: 0; }
    }

    @keyframes mmslideIn {
      from { transform: translateY(15%); }
        to { transform: translateY(0); }
    }

    @keyframes mmslideOut {
        from { transform: translateY(0); }
        to { transform: translateY(-10%); }
    }

    .micromodal-slide {
      display: none;
    }

    .micromodal-slide.is-open {
      display: block;
    }

    .micromodal-slide[aria-hidden="false"] .modal__overlay {
      animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);
    }

    .micromodal-slide[aria-hidden="false"] .modal__container {
      animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);
    }

    .micromodal-slide[aria-hidden="true"] .modal__overlay {
      animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);
    }

    .micromodal-slide[aria-hidden="true"] .modal__container {
      animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);
    }

    .micromodal-slide .modal__container,
    .micromodal-slide .modal__overlay {
      will-change: transform;
    }
`;

export default function Modal({ id, title, children, ...props }) {
    // https://micromodal.vercel.app/
    const modalId = `modal-${id}`;
    const modalTitle = `modal-${id}-title`;
    const modalContent = `modal-${id}-content`;
    return (
        <>
            <ModalStyle />
            <div
                className="modal micromodal-slide"
                id={modalId}
                aria-hidden="true"
            >
                <div
                    className="modal__overlay"
                    tabIndex="-1"
                    data-micromodal-close
                >
                    <div
                        className="modal__container"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={modalTitle}
                    >
                        <h2 className="modal__title" id={modalTitle}>
                            {title}
                        </h2>

                        <main className="modal__content" id={modalContent}>
                            {children}
                        </main>
                        <footer className="modal__footer">
                            <button>Continue</button>
                            <button
                                data-micromodal-close
                                aria-label="Close this dialog window"
                            >
                                Close
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<script src="/libs/micromodal/micromodal.js" />',
                    },
                ]}
            />
        </>
    );
}
