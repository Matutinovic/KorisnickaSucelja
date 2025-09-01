import { client } from "../../../lib/contentful";
import { EntrySkeletonType } from "contentful";

type BlogPostSkeleton = EntrySkeletonType<{
  title: string;
  slug: string;
  body: string;
  image: {
    fields: {
      file: {
        url: string;
      };
      title: string;
    };
  };
}>;

export default async function BlogPage() {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: "blogPost",
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-10 pt-20">
      <h1 className="text-6xl font-extrabold tracking-tight mb-6">Blog</h1>
      <ul className="space-y-10 w-full max-w-2xl">
        {entries.items.map((item) => (
          <li key={item.sys.id} className="border p-4 rounded shadow">
            <h2 className="text-2xl font-bold">{item.fields.title}</h2>
            {/* {item.fields.image && (
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.image.fields.title}
                className="w-full h-auto my-4 rounded"
              />
            )} */}
            <p className="text-gray-700">{item.fields.body}</p>
            <a
              href={`/blog/${item.fields.slug}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              Read more →
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
