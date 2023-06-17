import React from "react";
import {Link} from 'react-router-dom';
import { Topic } from "../../common/types";
import { topicsData } from "./data";
import { ChevronRight, Delete } from "../../common/icons";
import CreateTopicModal from "./CreateTopicModal";

import styles from "./Topics.module.css";


const Topics: React.FC = () => {
  const [topics, setTopics] = React.useState<Topic[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const categoryBtns = [
    "All",
    "Custom",
    ...new Set(topicsData.map((topic) => topic.category)),
  ];

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const topicBtnClickHandler = (categoryToFilter: string): void => {
    setSelectedCategory(categoryToFilter);
  };

  const deleteTopicHandler = (topicId: string): void => {
    setTopics(topics.filter(({ id }) => id !== topicId));
  };

  const addTopicHandler = (topicName: string, keywords: string[]): void => {
    setTopics(topics => ([...topics, {
      category: 'Custom',
      id: Math.random().toString(),
      title: topicName,
      keywords
    }]))
  };

  function openModal() {
    setIsModalOpen(true);
  }

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    setTopics(topicsData)
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryHeader}>Catgeories</h1>
      <div className={styles.headerButtons}>
        <div className={styles.categories}>
          {categoryBtns.map((category) => (
            <button
              className={`${styles.categoryBtn} ${
                selectedCategory === category && styles.active
              }`}
              onClick={() => topicBtnClickHandler(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
        <button className={styles.cta} onClick={openModal}>
          Add Topic
          <ChevronRight color="#fff" />
        </button>
      </div>
      <div className={styles.topicsWrapper}>
        <p className={styles.topicsHeader}>Recommended Topics</p>
        <div className={styles.topicsList}>
          {(selectedCategory === "All"
            ? topics
            : topics.filter(({ category }) => category === selectedCategory)
          ).map(({ title, keywords, id }) => (
            <div key={id} className={styles.topic}>
              <div className={styles.topicContent}>
                <div className={styles.topicHeader}>
                  <h2 className={styles.topicTitle}>{title}</h2>
                </div>
                <div className={styles.topicKeywords}>
                  {keywords.map((keyword) => (
                    <span key={keyword} className={`${styles.keyword}`}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteTopicHandler(id)}
              >
                <Delete />
              </button>
              <Link to="/blog" className={styles.blogLink}>
                <button className={styles.cta}>
                  Write
                  <ChevronRight color="#fff" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <CreateTopicModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        addTopicHandler={addTopicHandler}
      />
    </div>
  );
};

export default Topics;
