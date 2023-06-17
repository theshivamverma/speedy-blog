import React from 'react';

import Modal from "react-modal";

import styles from "./Topics.module.css";
import {Cross} from "../../common/icons";
import { customStyles } from './data';

Modal.setAppElement("#root");

type CreateTopicModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  addTopicHandler: (a: string, b: string[]) => void;
};

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  closeModal,
  isModalOpen,
  addTopicHandler,
}) => {
  const [keywords, setKeyWords] = React.useState<string[]>([]);

  const [topicName, setTopicName] = React.useState<string>("");
  const [keywordText, setKeywordText] = React.useState<string>("");

  const addKeyWord = () => {
    setKeyWords((keywords) => [...keywords, keywordText]);
    setKeywordText("");
  };

  const removeKeyword = (keyword: string) => {
    setKeyWords(keywords.filter((k) => k !== keyword));
  };

  const createTopic = () => {
    addTopicHandler(topicName, keywords);
    setTopicName("");
    setKeyWords([]);
    closeModal();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Create topic"
    >
      <div className={styles.modalContainer}>
        <h2 className={styles.modalHeader}>Enter topic details</h2>
        <div className={styles.inputRow}>
          <input
            value={topicName}
            className={styles.modalInput}
            type="text"
            placeholder="Topic name"
            onChange={(e) => setTopicName(e.target.value)}
          />
        </div>
        <div className={styles.inputRow}>
          <input
            className={styles.modalInput}
            type="text"
            placeholder="Keywords for topic"
            value={keywordText}
            onChange={(e) => setKeywordText(e.target.value)}
          />
          <button onClick={addKeyWord} className={styles.modalBtn}>
            Add keyword
          </button>
        </div>
        <div className={styles.keywordContainer}>
          {keywords.length > 0 &&
            keywords.map((keyword) => (
              <span
                className={`${styles.keyword} ${styles.modalKeyword}`}
                key={keyword}
              >
                {keyword}
                <Cross
                  onClick={() => removeKeyword(keyword)}
                  className={styles.keywordIcon}
                />
              </span>
            ))}
        </div>
        <div className={styles.ctaRow}>
          <button className={styles.secondaryBtn} onClick={closeModal}>
            Close
          </button>
          <button className={styles.cta} onClick={createTopic}>
            Create topic
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTopicModal;