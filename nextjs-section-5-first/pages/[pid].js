import fs from 'fs/promises';
import path from 'path';
import { useState, useEffect } from 'react';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;
  const [loading, setLoading] = useState(loadedProduct.__empty);
  const [product, setProduct] = useState(loadedProduct);

  useEffect(async () => {
    if (loading) {
      const product = { id: 'pX', title: 'Product X', description: 'This is product X' };
      setProduct(product);
      setLoading(false);
    }
  }, [loading]);

  if (loading) {
    return <p>Loading data ...</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const data = await getData();
  const paths = [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }];

  //   const paths = (data?.products ?? []).map((product) => ({ params: { pid: product.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
};

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return data;
}

export const getStaticProps = async (ctx) => {
  const { params } = ctx;
  const productId = params.pid === 'p3' ? 'not-found' : params.pid;
  const data = await getData();

  const product = params.pid === 'p3' ? null : data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      //   notFound: true,
      props: {
        loadedProduct: { __empty: true },
        params,
      },
    };
  }

  return {
    props: {
      loadedProduct: { ...product, __empty: false },
      params,
    },
  };
};

export default ProductDetailPage;
