import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import { initialText } from "./data";
import ToneModal from "./ToneModal";


import styles from "./BlogEditor.module.css";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../node_modules/draft-js/dist/Draft.css";

const BlogEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  function openModal() {
    setIsModalOpen(true);
  }

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let typingEffect: number;
    if(!isModalOpen){
      typingEffect = setInterval(() => {
        if (currentIndex >= initialText.length) {
          clearInterval(typingEffect);
          return;
        }

        const currentText = initialText.substring(0, currentIndex + 1);
        const newContent = ContentState.createFromText(currentText);
        const newEditorState = EditorState.push(
          editorState,
          newContent,
          "insert-characters"
        );

        setEditorState(newEditorState);
        setCurrentIndex(currentIndex + 1);
      }, 10);
    }

    return () => {
      clearInterval(typingEffect);
    };
  }, [currentIndex, isModalOpen]);

  useEffect(() => {
    openModal()
  }, [])

  return (
    <div>
      <div className="typing-editor">
        <Editor
          wrapperClassName={styles.wrapperClass}
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
      <ToneModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default BlogEditor;
