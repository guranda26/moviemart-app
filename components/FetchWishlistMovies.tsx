const FetchMovies = async () => {
  try {
    const response = await fetch("api/wishlist-display")

    if (!response.ok) {
      throw new Error("Failed to fetch Movies");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default FetchMovies;
