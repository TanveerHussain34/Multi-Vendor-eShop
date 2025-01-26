import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import EventCard from "./EventCard.jsx";

function PopularEvents() {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            <EventCard data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularEvents;
