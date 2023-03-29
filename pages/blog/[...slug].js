import { useRouter } from "next/router";

function BlogPostPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Blog Posts Page. {JSON.stringify(router.query)}</h1>
    </div>
  );
}

export default BlogPostPage;
