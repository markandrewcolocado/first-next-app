export async function getAllEvents() {
  return await fetch(
    "https://react-refresher-47ec6-default-rtdb.firebaseio.com/events.json"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        return {
          hasError: true,
        };
      }
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      return events;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  if (allEvents.hasError) return allEvents;
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  if (allEvents.hasError) return allEvents;
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
