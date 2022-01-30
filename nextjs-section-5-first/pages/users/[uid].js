const UserIdPage = (props) => {
  const idProps = props.id;
  return <div>{idProps}</div>;
};

export const getServerSideProps = async (ctx) => {
  const { params } = ctx;

  return {
    props: {
      id: `userid-${params.uid}`,
    },
  };
};

export default UserIdPage;
