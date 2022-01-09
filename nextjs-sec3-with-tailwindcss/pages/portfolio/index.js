import Link from 'next/link';

const PortfolioPage = () => {
  const projects = [
    { id: 'react-meetup', name: 'Simple React App for meetups' },
    { id: 'react-counter', name: 'Basic react counter with redux store' },
    { id: 'nextjs-portal', name: 'Complex app for learning nextjs' },
  ];

  return (
    <div>
      <h2>The Portfolio Page</h2>
      <ul style={{ fontSize: '1.2rem' }}>
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <Link
                href={{
                  pathname: '/portfolio/[projectId]',
                  query: { projectId: project.id },
                }}
              >{`${project.name}`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PortfolioPage;
