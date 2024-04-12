import { KeyboardEvent, useState } from "react";
import "./NamesList.css";
import djb2a from "djb2a";
import { v4 as uuidv4 } from 'uuid';





interface NamesListProps {
  names: { text: string; id: string }[];
  setNames: (names: { text: string; id: string }[]) => void;
}
const NamesList: React.FC<NamesListProps> = ({ names, setNames }) => {

  const [newName, setNewName] = useState("")

  const handleAddName = () => {
    const newItem = {text: newName, id: `${djb2a(newName)}:${uuidv4()}`}
    const currentNames = [newItem, ...names];
    setNames(currentNames);
    setNewName("")
  }
  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddName();
    }
  };

  const handleDeleting = (id: string) => {
    const currentNames = names.filter(item=> item.id !== id);
    setNames(currentNames);
  }

  const handleEditing = (currentName: string, id: string) => {
    const currentNames = [...names];
    const currentItem = currentNames.find((item) => item.id === id);
    if (currentItem) currentItem.text = currentName;
    setNames(currentNames);
  };
  return (
    <div className="namesListContainer">
      <div className="nameContainer">
        <input className="nameInput addInput" value={newName} onChange={e=> setNewName(e.target.value)} onKeyDown={handleEnterPress}></input>
        <button className="addName" onClick={handleAddName}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="black"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </div>
      <hr className="nameDivider"></hr>
      {names.map((nameItem) => (
        <div className="nameContainer" key={nameItem.id}>
          <input
            className="nameInput"
            value={nameItem.text}
            onChange={(e) => handleEditing(e.target.value, nameItem.id)}
          ></input>
          <button className="deleteName"
          onClick={e=>handleDeleting(nameItem.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};
export default NamesList;
