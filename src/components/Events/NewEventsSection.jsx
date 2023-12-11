import { useQuery } from '@tanstack/react-query';// a custom hook by tanstack

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const {data,isLoading, isError,error}=useQuery({
    queryKey:['events'], // we need to have key so that the data can be stored as cache and reused if called again
    queryFn:fetchEvents, //here the usequery hook is sending HTTP request from the function defined in the other file
    staleTime:5000, //this is the time after which react query will send a request behind the scenes to check if there is any updated data present in the cache
    // gcTime:25000 // this is the garbage collection time after which the cache data will be cleared from the memory
  });

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
