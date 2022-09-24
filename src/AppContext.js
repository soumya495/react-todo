import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // new list modal
  const [listModal, setListModal] = useState(false);
  // edit list data
  const [editList, setEditList] = useState(null);

  // manage the lists
  const [lists, setLists] = useState(
    localStorage.getItem("lists")
      ? JSON.parse(localStorage.getItem("lists"))
      : []
  );

  // add new list to state and storage
  const addList = (list) => {
    let newLists = lists;
    newLists.push(list);
    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  // update existing list
  const updateList = (updatedList) => {
    let id = updatedList.id;

    let newLists = lists;

    console.log(newLists, updatedList);

    let existingList = newLists.find((l) => l.id === id);

    console.log(existingList);

    existingList.title = updatedList.title;
    existingList.statusColor = updatedList.statusColor;

    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  // delete list
  const deleteList = (id) => {
    let newLists = lists;

    newLists = newLists.filter((l) => l.id !== id);

    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        addList,
        updateList,
        listModal,
        setListModal,
        editList,
        setEditList,
        deleteList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
