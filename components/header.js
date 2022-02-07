import { useState, useEffect } from "react";
import { useDocument, deleteDoc } from "swr-firestore-v9";
import { ChevronDown, Menu, Plus, Trash, Trash2, User } from "react-feather";
import CircleButton from "./circleButton";
import { Dropdown, DropdownItem } from "./Dropdown";
import { deleteDocument } from "@nandorojo/swr-firestore";

export default function Header({
  documents,
  activeDoc,
  setActiveDoc,
  createDoc,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="py-4 flex justify-between items-center ">
      <div className="flex rounded items-center space-x-2 font-semibold relative">
        <CircleButton onClick={() => setShowDropdown(!showDropdown)}>
          <Menu size={20} className="text-gray-400" />
        </CircleButton>
        <h1>{activeDoc ? <FileName doc={activeDoc} /> : "No doc selected"}</h1>
        {showDropdown && (
          <Dropdown onClickOutside={() => setShowDropdown(false)}>
            <div className="flex justify-between items-center px-4 py-2 ">
              <h2 className="font-semibold uppercase text-xs tracking-wide text-gray-500">
                Documents
              </h2>
              <CircleButton onClick={() => createDoc()}>
                <Plus size={20} />
              </CircleButton>
            </div>
            {documents.map((doc) => {
              const isActive = activeDoc && activeDoc.id === doc.id;
              return (
                <DropdownItem
                  doc={doc}
                  onClick={() => {
                    setShowDropdown(false);
                    setActiveDoc(doc);
                  }}
                  isActive={isActive}
                  action={
                    <button
                      onClick={() => {
                        console.log("trying to delete", doc.title);
                        deleteDoc(`documents/${doc.id}`);
                      }}
                      className="group p-1"
                    >
                      <Trash2 size={16} className="group-hover:text-red-500" />
                    </button>
                  }
                />
              );
            })}
          </Dropdown>
        )}
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-200 grid place-items-center text-gray-400">
        <User size={20} />
      </div>
    </header>
  );
}

function FileName({ doc }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(doc.title);
  const { update } = useDocument(`documents/${doc.id}`);

  useEffect(() => {
    setInputValue(doc.title);
  }, [doc]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(false);
    if (inputValue === "") setInputValue("Untitled Document");
    update({
      title: inputValue,
    });
  }

  return (
    <div
      className={`px-2 py-1 hover:bg-gray-100 text-left font-semibold ${
        isEditing ? "outline" : ""
      }`}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={(e) => e.target.select()}
            onBlur={handleSubmit}
            onClick={(e) => e.target.select()}
            onSubmit={handleSubmit}
          />
        </form>
      ) : (
        inputValue
      )}
    </div>
  );
}
