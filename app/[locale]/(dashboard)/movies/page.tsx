import MainPage from "../page";

type MovieParams = Promise<{ locale: string; productId?: string }>;


const MoviePage = async ({ params }: { params: MovieParams }) => {
  return <MainPage params={params} />;
};

export default MoviePage;
