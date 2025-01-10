import Header from "../components/Layout/Header";
import EventCard from "../components/Route/PopularEvents/EventCard";

function EventsPage() {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  );
}

export default EventsPage;
