import { buildFeedbackPath, extractFeedbackData } from "../api/feedback";

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{`${item.text} - ${item.email}`}</li>
      ))}
    </ul>
  );
  // return <h1>test</h1>;
}

export async function getStaticProps() {
  // In getStaticProps() and getServersideProps(), you should not use fetch to get data from your API
  // You can instead use the nodejs code to directly fetch the data since this code will only run in the server and not in the client
  const filePath = buildFeedbackPath();
  const data = extractFeedbackData(filePath);
  console.log(data);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
