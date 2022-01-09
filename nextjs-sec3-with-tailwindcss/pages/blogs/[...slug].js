import { useRouter } from 'next/router';

// go for example /blogs/2021/12/20

// [...slug].js:6 {slug: Array(3)}slug: (3) ['2021', '12', '20'][[Prototype]]: Object

const BlogPostsPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
};

export default BlogPostsPage;
