import { useState } from "react";
import { useDocument } from "swr-firestore-v9";
import { Plus, User } from "react-feather";
import CircleButton from "./CircleButton";

export default function Header({
  documents,
  activeDoc,
  setActiveDoc,
  createDoc,
}) {
  return (
    <header className="py-4 flex justify-between items-center ">
      <h1 className="font-semibold text-gray-400">MapMyMoney</h1>
      <div className="flex space-x-4">
        {documents.map((doc) => {
          return (
            <FileTab
              doc={doc}
              onClick={() => setActiveDoc(doc.id)}
              isActive={activeDoc === doc.id}
            />
          );
        })}
        <CircleButton onClick={() => createDoc()}>
          <Plus size={20} />
        </CircleButton>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-200 grid place-items-center text-gray-400">
        <User size={20} />
      </div>
    </header>
  );
}

function FileTab({ onClick, doc, isActive = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(doc.title);

  const { update } = useDocument(`documents/${doc.id}`);

  function handleSubmit() {
    setIsEditing(false);
    update({
      title: inputValue,
    });
  }

  return (
    <button
      className={`font-semibold text-center ${!isActive && "text-gray-400"}`}
      onClick={onClick}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={(e) => e.target.select()}
          onBlur={() => handleSubmit()}
          onSubmit={() => handleSubmit()}
          className="text-center"
        />
      ) : (
        inputValue
      )}
    </button>
  );
}
