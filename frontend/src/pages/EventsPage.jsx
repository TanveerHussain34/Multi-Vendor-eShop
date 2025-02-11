import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import EventCard from "../components/Route/PopularEvents/EventCard";
import { useEffect } from "react";

function EventsPage() {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    window.scrollTo(top);
  });
  return (
    <>
      {!isLoading && (
        <div>
          <Header activeHeading={4} />
          {allEvents &&
            allEvents.map((event, index) => (
              <EventCard
                key={index}
                active={true}
                data={event}
                moreEvents={false}
              />
            ))}
          <Footer />
        </div>
      )}
    </>
  );
}

export default EventsPage;
