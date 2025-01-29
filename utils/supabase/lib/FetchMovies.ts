import { Movies } from "@/Interfaces/Movies";

const FetchMovies = async (searchQuery: string = ""): Promise<Movies[]> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`);
    if (searchQuery) {
      url.searchParams.append("q", searchQuery); 
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default FetchMovies;
