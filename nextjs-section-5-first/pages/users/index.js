function UserProfilePage(props) {
  return <h1>User: {props.username}</h1>;
}

export async function getServerSideProps(ctx) {
  const { params, req, res } = ctx;
  //   console.log(req.headers);
  return {
    props: {
      username: 'Anton',
    },
  };
}

export default UserProfilePage;
