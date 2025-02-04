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
          <EventCard
            active={true}
            data={allEvents && allEvents[0]}
            moreEvents={false}
          />
          <EventCard
            active={true}
            data={allEvents && allEvents[0]}
            moreEvents={false}
          />
          <Footer />
        </div>
      )}
    </>
  );
}

export default EventsPage;
