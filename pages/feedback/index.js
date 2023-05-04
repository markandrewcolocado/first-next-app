import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedbackData } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {`${item.text}`}{" "}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
  // return <h1>test</h1>;
}

export async function getStaticProps() {
  // In getStaticProps() and getServersideProps(), you should not use fetch to get data from your API
  // You can instead use the nodejs code to directly fetch the data since this code will only run in the server and not in the client
  const filePath = buildFeedbackPath();
  const data = extractFeedbackData(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
