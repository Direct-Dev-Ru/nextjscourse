import { useRouter } from 'next/router';

const SelectedClientProjectPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h3>
        The Project page for a Specific Project ({router?.query?.clientprojectid ?? 'not provided'}) for a Selected
        Client ({router?.query?.id ?? 'not provided'})
      </h3>
    </div>
  );
};
export default SelectedClientProjectPage;
