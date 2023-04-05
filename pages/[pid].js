import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // Fallback scenario to wait for a product when fallback was set to true in the getStaticPaths function
  // Another way is to set fallback to 'blocking' in the getStaticPaths function
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

// get data from file
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}

// The value return from this function will be passed as props in the page component
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// the goal of this function is to tell Nextjs which instances of this dynamic page should be pre-generated
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products
    .map((product) => product.id)
    .map((id) => ({ params: { pid: id } }));
  // const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: ids, // should contain an array of objects with this structure { params: { pid: 'p1' } },
    fallback: true, // This will cause the page to pre-render conditionally - https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
  };
}

export default ProductDetailPage;
