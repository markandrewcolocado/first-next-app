import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function LastSalesSWR() {
  const [sales, setSales] = useState();

  const { data, error, isLoading } = useSWR(
    "https://react-refresher-47ec6-default-rtdb.firebaseio.com/next-sales.json",
    fetcher
  );

  // use useEffect to transform the data, alternatively, we can use fetcher as the 2nd argument of useSWR
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

  if (isLoading || !sales) {
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

export default LastSalesSWR;
