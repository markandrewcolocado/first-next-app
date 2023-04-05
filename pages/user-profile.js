import { Fragment } from "react";

function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// this function will always run for every request
export async function getServerSideProps(context) {
  // you will have access to params, the request and response (same with nodejs, you can check nodejs docs for the details)
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
