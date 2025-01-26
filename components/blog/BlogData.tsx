const FetchPosts = async () => {
  try {
    // const response = await fetch("/blogsData.json");
    const response = await fetch("/api/blogs");

    // const localUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`;

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default FetchPosts;
