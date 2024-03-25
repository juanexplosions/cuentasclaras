import React, {useState} from "react";
import "./modal.css";

export default function Modal() {

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => setShowModal(!showModal)

    const handleBackgroundClick = (event) => {
        if (event.target.classList.contains("modal-background")) {
            toggleModal();
        }
    };

    return(
        <div className="modal-container">
            <button className="btn-faq" onClick={toggleModal}>¿Qué es?</button>
            {showModal && (
                <div className="modal-background" onClick={handleBackgroundClick}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>cuentasclaras</h2>
                            <button className="modal-bttn" onClick={toggleModal}>X</button>
                        </div>
                        <div className="modal-texts">

                            <h3>Este es un proyecto creado para practicar React.js y CSS.</h3>
                            <h3>Es de código abierto y puedes verlo en el <a href="https://github.com/juanexplosions/cuentasclaras" target="_blank">repositorio de GitHub.</a></h3>
                            <br /><br />
                            <div className="modal-line"></div>
                            <h4>Creado por <a href="https://www.instagram.com/juanexplosions/" target="_blank">@juanexplosions</a>. <br />
                            Content creator & web developer</h4>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}