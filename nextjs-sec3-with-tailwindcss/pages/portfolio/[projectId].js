import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h2>The Portfolio Project Page</h2>
      <h3>{router.query.projectId}</h3>
    </div>
  );
};

export default PortfolioProjectPage;
