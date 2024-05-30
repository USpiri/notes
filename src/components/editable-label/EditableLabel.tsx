import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

interface EditableLabelProps {
  text: string;
  isEditing: boolean;
  onBlur?: (text: string) => void;
  onEnterKey?: (text: string) => void;
}

export const EditableLabel = ({
  text: initialText,
  isEditing,
  onBlur,
  onEnterKey,
}: EditableLabelProps) => {
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    if (text.length && onBlur) {
      onBlur(text);
    } else {
      setText(initialText);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 200);
  }, [isEditing]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      if (text.length && onEnterKey) {
        onEnterKey(text);
      } else {
        setText(initialText);
      }
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          autoFocus
          type="text"
          ref={inputRef}
          value={text}
          className="bg-transparent focus:outline-none"
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="truncate ">{text}</span>
      )}{" "}
    </>
  );
};
