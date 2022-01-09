import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    { id: 'anton', name: 'Anton Kuznetsov' },
    { id: 'violete', name: 'Violete Schwarzenproofen' },
  ];

  return (
    <div>
      <h2>The Clients Page</h2>
      <ul style={{ fontSize: '1.2rem' }}>

        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link href={`/clients/${client.id}`}>{`${client.name} page`}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientsPage;
