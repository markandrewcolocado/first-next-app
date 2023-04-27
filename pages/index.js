import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  if (props.events.hasError) {
    return <p className="center">Error loading contents...</p>;
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
