import { Movies } from "@/Interfaces/Movies";

const FetchMovies = async (): Promise<Movies[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`,
      { next: { revalidate: 10 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch store data: ${response}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default FetchMovies;
