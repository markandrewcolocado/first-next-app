import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <h1>The Home Page</h1>
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
