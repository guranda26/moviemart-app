import { Params } from "next/dist/server/request/params";
import MainPage from "../page";

const MoviePage = async ({ params }: { params: Params }) => {
  return <MainPage params={params} />;
};

export default MoviePage;
