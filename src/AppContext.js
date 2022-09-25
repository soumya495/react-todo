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

  const [ticketEditModal, setTicketEditModal] = useState(null);

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

    // console.log(newLists, updatedList);

    let existingList = newLists.find((l) => l.id === id);

    // console.log(existingList);

    existingList.title = updatedList.title;
    existingList.statusColor = updatedList.statusColor;

    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  // delete list
  const deleteList = (id) => {
    let newLists = lists;

    newLists = newLists.filter((l) => l.id !== id);

    // console.log(newLists);

    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
  };

  // get all tickets
  const getTickets = (listId) => {
    let existingList = lists.find((l) => l.id === listId);
    return existingList?.tickets;
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

  // update ticket
  const updateTicket = (currentList, ticket) => {
    // console.log(currentList, ticket);

    let newLists = lists;

    // if ticket stays in current list, update content
    if (currentList.id === ticket.listInfo.listId) {
      let existingList = newLists.find((l) => l.id === currentList.id);
      let indexOfExistingList = newLists.indexOf(existingList);

      // find existing ticket
      let indexOfExistingTicket;
      existingList.tickets.forEach((t, index) => {
        if (t.id === ticket.id) {
          indexOfExistingTicket = index;
        }
      });

      newLists[indexOfExistingList].tickets[indexOfExistingTicket] = {
        id: ticket.id,
        title: ticket.title,
        desc: ticket.desc,
        listInfo: {
          listId: ticket.listId,
          listTitle: ticket.listName,
        },
      };
    }
    // else remove ticket from current list
    else {
      let existingList = newLists.find((l) => l.id === currentList.id);
      let indexOfExistingList = newLists.indexOf(existingList);

      // remove ticket from current list
      newLists[indexOfExistingList].tickets = newLists[
        indexOfExistingList
      ].tickets.filter((t) => t.id !== ticket.id);

      // add ticket to desired list
      const desiredListId = ticket.listInfo.listId;
      let desiredList = newLists.find((l) => l.id === desiredListId);
      let indexOfDesiredList = newLists.indexOf(desiredList);

      newLists[indexOfDesiredList].tickets.unshift(ticket);
    }

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
        ticketEditModal,
        setTicketEditModal,
        updateTicket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
