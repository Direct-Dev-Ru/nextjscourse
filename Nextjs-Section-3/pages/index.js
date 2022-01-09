import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1 style={{ fontSize: '4rem', textAlign: 'center' }}>Enter To Next Js</h1>
      <ul style={{ fontSize: '2rem' }}>
        <li>
          <Link href='/portfolio'>Portfolio Page</Link>
        </li>
        <li>
          <Link href='/clients'>Clients Page</Link>
        </li>
        <li>
          <Link replace href='/blogs'>Blogs Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
