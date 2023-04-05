function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

// this is to prove that getServerSideProps function does not need getStaticPath function for dynamic pages since there is no pre-generation of pages
export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}

export default UserIdPage;
