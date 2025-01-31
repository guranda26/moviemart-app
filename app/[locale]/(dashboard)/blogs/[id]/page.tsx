import NotFoundPage from "@/app/[locale]/not-found";
import { Tag, Eye, Folder } from "lucide-react";
import initTranslations from "@/utils/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import ReturnLink from "@/components/ReturnLink";
import { BlogParams } from "@/Interfaces/Params";

const BlogPage = async ({ params }: { params: BlogParams }) => {
  const i18nNameSpaces = ["common", "products"];

  const { id, locale } = await params;

  const { t, resources } = await initTranslations(locale, i18nNameSpaces);

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
    <TranslationsProvider
      resources={resources}
      locale={locale as string}
      namespaces={i18nNameSpaces}
    >
      <section className="relative p-4">
        <ReturnLink href="/blogs" />
        <article className="max-w-4xl mx-auto bg-articleBg shadow-md overflow-hidden animate-slide-in z-90">
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
            className="w-full h-85 max-h-[450px] object-cover transform hover:scale-105 transition-transform duration-500"
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
            <div className="w-100% overflow-x-hidden mb-2">
              {additionalImageSrc && (
                <img
                  src={additionalImageSrc}
                  alt={TITLE}
                  className="w-full h-60 xs:h-[17rem] object-cover transform hover:scale-105 transition-transform duration-500 bg-top"
                />
              )}
            </div>
            {EXTRA_DESCRIPTION &&
              EXTRA_DESCRIPTION.split(". ").map(
                (paragraph: string, index: number) => (
                  <p
                    key={index}
                    className="text-base text-gray-800 mb-4 leading-relaxed"
                  >
                    {paragraph.trim() +
                      (index !== EXTRA_DESCRIPTION.split(". ").length - 1
                        ? "."
                        : "")}
                  </p>
                )
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
                <strong>{t("products:author")}:</strong> {author}
              </p>
            )}
          </div>
        </article>
      </section>
    </TranslationsProvider>
  );
};

export default BlogPage;
