import { useRouter } from 'next/router';

const ClientProjectPage = () => {
  const router = useRouter();
  console.log(router.query);

  const loadProjectHandler = (e) => {

    router.push(`/clients/${router.query.id}/ProjectNumberOne`);
  };

  return (
    <div>
      <h2>The Projects of a Given Client ({router?.query?.id ?? 'not provided'})</h2>
      <button  onClick={loadProjectHandler}>Load First project</button>
    </div>
  );
};

export default ClientProjectPage;
