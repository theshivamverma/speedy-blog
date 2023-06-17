import React, { useState } from 'react';
import Modal from "react-modal";
import { customStyles, tones } from "./data";

import styles from "./BlogEditor.module.css";

Modal.setAppElement("#root");

type ToneModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const ToneModal: React.FC<ToneModalProps> = ({ isModalOpen, closeModal }) => {
  const [selectedTone, setSelectedTone] = useState<string>("formal");
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Select tone"
    >
      <div className={styles.toneModalContainer}>
        <h2 className={styles.modalHeader}>Select Tone</h2>
        <div className={styles.cardsContainer}>
          {tones.map(({ text: tone, emoji }) => (
            <div
              className={`${styles.toneCard} ${
                tone === selectedTone && styles.activeCard
              }`}
              onClick={() => setSelectedTone(tone)}
            >
              <p>{emoji}</p>
              <p>{tone}</p>
            </div>
          ))}
        </div>
        <button className={styles.cta} onClick={closeModal}>
          Generate
        </button>
      </div>
    </Modal>
  );
};

export default ToneModal