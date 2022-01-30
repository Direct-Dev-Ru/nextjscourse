import React from 'react';
import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import classes from './last-sales.module.css';

// useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))

const LastSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://test-project-eab59-default-rtdb.firebaseio.com/sales.json')
      .then((res) => res.json())
      .then((result) =>
        setTimeout(() => {
          const aSales = [];
          for (const key in result) {
            const element = result[key];
            aSales.push({ id: key, username: element.username, volume: element.volume });
          }

          setSales(aSales);
          setIsLoading(false);
        }, 1000)
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loader_wrapper}>
        <Audio className={classes.loader} heigth='300' width='300' color='grey' ariaLabel='loading' />
      </div>
    );
  }

  // it will be simple pre-rendering content on the page
  if (!sales || sales.length === 0) {
    return <h2>No data yet ...</h2>;
  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
};

export default LastSalesPage;
