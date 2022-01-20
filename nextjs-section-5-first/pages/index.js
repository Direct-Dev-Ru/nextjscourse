import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
function HomePage(props) {
  const { products } = props;

  //maybe useEffect to refresh data

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps = async (ctx) => {
  console.log('(Re-)Generating');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  if (!data) {
    return { redirect: { destination: '/no-data' } };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    // re-generated every thirty(30) seconds - refreshes only after reloading full page
    revalidate: 30,
  };
};

export default HomePage;
