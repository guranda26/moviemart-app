const FetchPosts = async () => {
  try {
    const response = await fetch("/blogsData.json");

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default FetchPosts;
