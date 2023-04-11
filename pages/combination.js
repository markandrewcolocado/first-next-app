import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function Combination(props) {
  const [sales, setSales] = useState(props.sales);

  // the useSWR react hook can only be used in the page component, in this case, the page component is the Combination()
  const { data, error, isLoading } = useSWR(
    "https://react-refresher-47ec6-default-rtdb.firebaseio.com/next-sales.json",
    fetcher
  );

  // use useEffect to transform the data, alternatively, we can use fetcher as the 2nd argument of useSWR
  // using useEffect will cause the page to re-render when the data changes
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    // console.log(error);
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://react-refresher-47ec6-default-rtdb.firebaseio.com/next-sales.json"
  );
  const data = response.json();

  // transform the data to an array;
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
    revalidate: 10,
  };
}

export default Combination;
