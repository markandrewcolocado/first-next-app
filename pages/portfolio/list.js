import { useRouter } from "next/router";

function ListPage() {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>The List Page</h1>
    </div>
  );
}

export default ListPage;
