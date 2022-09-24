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

  // useEffect(() => {
  //   setLists(
  //     localStorage.getItem("lists")
  //       ? JSON.parse(localStorage.getItem("lists"))
  //       : []
  //   );
  // }, [lists]);

  // get list by id
  const getList = (listId) => {
    return lists.find((l) => l.id === listId);
  };

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

  // get all tickets
  const getTickets = (listId) => {
    let existingList = lists.find((l) => l.id === listId);
    return existingList.tickets;
  };

  // add ticket
  const addTicket = (list, ticket) => {
    let newLists = lists;
    let existingList = newLists.find((l) => l.id === list.id);

    const indexOfList = newLists.indexOf(existingList);

    newLists[indexOfList].tickets.unshift(ticket);

    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        getList,
        addList,
        updateList,
        listModal,
        setListModal,
        editList,
        setEditList,
        deleteList,
        addTicket,
        getTickets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
