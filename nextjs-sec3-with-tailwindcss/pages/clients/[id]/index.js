import { useRouter } from 'next/router';

const ClientProjectPage = () => {
  const router = useRouter();
  console.log(router.query);

  const loadProjectHandler = (e) => {
    // router.push(`/clients/${router.query.id}/ProjectNumberOne`);
    router.push({
      pathname: '/clients/[id]/[projectid]',
      query: { id: router.query.id, projectid: 'ProjectOne' },
    });
    // router.replace(`/clients/${router.query.id}/ProjectNumberOne`);
  };

  return (
    <div>
      <h2>The Projects of a Given Client ({router?.query?.id ?? 'not provided'})</h2>
      <div className='flex justify-center'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  my-5'
          onClick={loadProjectHandler}
        >
          Load First project
        </button>
      </div>
    </div>
  );
};

export default ClientProjectPage;
