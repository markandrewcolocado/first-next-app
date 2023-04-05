import { useEffect, useState } from "react";
// when to use client-side data fetching
// - data changing with high frequency (e.g. stock data)
// - highly user-specific data (e.g. last orders in an online shop)
// - partial data (e.g. data that's only used on a part of a page)
function LastSalesPage(props) {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-refresher-47ec6-default-rtdb.firebaseio.com/next-sales.json"
    )
      .then((res) => res.json())
      .then((data) => {
        // transform the data to an array;
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data here.</p>;
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

export default LastSalesPage;
