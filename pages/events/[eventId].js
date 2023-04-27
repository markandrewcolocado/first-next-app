import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getAllEvents, getEventById } from "../../helpers/api-util";
import Head from "next/head";

function EventDetailPage(props) {
  const { event } = props;
  if (!event || event.hasError) {
    return (
      <div>
        <h1>Event Detail Page</h1>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        {/* What shows in the search results */}
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  if (events.hasError) {
    return {
      paths: [],
      fallback: false,
    };
  }
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: false, // possible values: true, false, 'blocking'
  };
}

export default EventDetailPage;
