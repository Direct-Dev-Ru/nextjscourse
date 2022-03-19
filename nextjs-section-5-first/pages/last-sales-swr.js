import React from 'react';
import { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import useSWR from 'swr';
import classes from './last-sales.module.css';

// useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
const fetcher = (url) => fetch(url).then((res) => res.json());

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  const URL = `https://test-project-eab59-default-rtdb.firebaseio.com/sales.json`;

  const { data, error } = useSWR(URL, fetcher);

  useEffect(() => {
    // console.log('fire useEffect');
    if (data) {
      const aSales = [];
      for (const key in data) {
        const element = data[key];
        aSales.push({ id: key, username: element.username, volume: element.volume });
      }
      //   console.log('fire useEffect', aSales);

      setSales(aSales);
    }
  }, [data]);

  if (error) {
    return <h2>Failed to load ...</h2>;
  }

  if (!sales || sales.length === 0) {
    return <h2>No data yet ...</h2>;
  }

  if (!data && !sales) {
    return (
      <div className={classes.loader_wrapper}>
        <Audio className={classes.loader} heigth='300' width='300' color='grey' ariaLabel='loading' />
      </div>
    );
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

// Here we cant use react hooks - this is not a react part
export const getStaticProps = async (ctx) => {
  const { params } = ctx;

  const response = await fetch('https://test-project-eab59-default-rtdb.firebaseio.com/sales.json');

  const data = await response.json();

  const aSales = [];
  for (const key in data) {
    const element = data[key];
    aSales.push({ id: key, username: element.username, volume: element.volume });
  }

  return { props: { sales: aSales } };
  //   return { props: { sales: aSales, revalidate: 10, params: params ? params : null } };
};

export default LastSalesPage;
