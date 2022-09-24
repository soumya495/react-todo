import styles from "../styles/Tickets.module.css";

function Tickets({ tickets }) {
  if (tickets.length <= 0) return null;

  return (
    <div className={styles.ticketContainer}>
      {tickets.map((ticket, index) => (
        <div className={styles.ticket} key={index}>
          <p>{ticket.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Tickets;
