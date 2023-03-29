import { useRouter } from "next/router";

function CLientProjectsPage() {
  const router = useRouter();
  function loadProjectHandler() {
    // load data...
    // router.push("/clients/max/projecta");
    // alternative
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "max", clientprojectid: "projecta" },
    });
  }
  return (
    <div>
      <h1>The Project of a Given Client.</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default CLientProjectsPage;
