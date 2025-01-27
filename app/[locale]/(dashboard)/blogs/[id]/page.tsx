import NotFoundPage from "@/app/[locale]/not-found";
import { Params } from "next/dist/server/request/params";
import { Tag, Eye, Folder, ArrowLeft } from "lucide-react"; // Icons
import Link from "next/link";

const BlogPage = async ({ params }: { params: Params }) => {
  const { id, locale } = await params;

  if (!id) {
    return <NotFoundPage />;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`
  );

  if (!response.ok) {
    return <NotFoundPage />;
  }

  const blog = await response.json();

  if (!blog || !blog.id) {
    return <NotFoundPage />;
  }

  const isKa = locale === "ka";

  const {
    title,
    title_ka,
    imageSrc,
    description,
    description_ka,
    date,
    date_ka,
    tags__001,
    tags__002,
    tags__003,
    tags_ka__001,
    tags_ka__002,
    tags_ka__003,
    category,
    category_ka,
    author,
    views,
    additionalImageSrc,
    additionalDescription,
    additionalDescription_ka,
  } = blog;

  const localizedTags = isKa
    ? [tags_ka__001, tags_ka__002, tags_ka__003]
    : [tags__001, tags__002, tags__003];

  const TITLE = isKa ? title_ka : title;
  const DESCRIPTION = isKa ? description_ka : description;
  const EXTRA_DESCRIPTION = isKa
    ? additionalDescription_ka
    : additionalDescription;
  const DATE = isKa ? date_ka : date;
  const CATEGORY = isKa ? category_ka : category;

  return (
    <section className="relative p-4">
      <Link
        href={"/blogs"}
        className="absolute top-16 xl:top-4 left-4 my-2 xl:my-0 flex items-center gap-2 px-2 py-1 xs:px-4 xs:py-2 text-sm font-medium text-white bg-redButton rounded shadow hover:bg-hoverRedBtn transition-transform transform hover:scale-105 duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden xl:inline-block">Go Back</span>
      </Link>

      <article className="max-w-4xl mx-auto bg-articleBg shadow-md overflow-hidden animate-slide-in">
        <div className="flex flex-wrap gap-2 p-4 justify-center xs:justify-normal animate-slide-in">
          {localizedTags.map(
            (tag, index) =>
              tag && (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium transition-transform transform hover:scale-105 duration-300"
                >
                  <Tag className="w-4 h-4 text-gray-500" />
                  {tag}
                </span>
              )
          )}
        </div>
        <img
          src={imageSrc}
          alt={TITLE}
          className="w-full h-85 object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 animate-fade-in-delayed">
            {TITLE}
          </h1>
          <p className="text-sm text-gray-500 mb-2">{DATE}</p>
          {DESCRIPTION.split(". ").map((paragraph: string, index: number) => (
            <p
              key={index}
              className="text-base text-gray-800 mb-4 leading-relaxed"
            >
              {paragraph.trim() +
                (index !== DESCRIPTION.split(". ").length - 1 ? "." : "")}
            </p>
          ))}
          <div className="w-100% overflow-x-hidden">
            {additionalImageSrc && (
              <img
                src={additionalImageSrc}
                alt={TITLE}
                className="w-full h-60 xs:h-[17rem] object-cover transform hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
          {EXTRA_DESCRIPTION && (
            <p className="text-base text-gray-800 mb-4 mt-2 leading-relaxed">
              {EXTRA_DESCRIPTION}
            </p>
          )}
          <div className="flex items-center gap-6 text-gray-700 text-sm">
            <div className="flex items-center gap-2 animate-fade-in-delayed">
              <Folder className="w-4 h-4 text-gray-600" />
              <span>{CATEGORY}</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in-delayed">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="font-semibold hover:scale-105">
                {views || "N/A"} views
              </span>
            </div>
          </div>

          {author && (
            <p className="text-sm text-gray-600 mt-4 animate-fade-in-delayed">
              <strong>Author:</strong> {author}
            </p>
          )}
        </div>
      </article>
    </section>
  );
};

export default BlogPage;
