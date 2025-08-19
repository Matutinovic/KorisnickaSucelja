import { client } from "../../../../lib/contentful";
import { EntrySkeletonType } from "contentful";
import { notFound } from "next/navigation";

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

type Props = {
  params: { slug: string };
};

export default async function BlogPostPage({ params }: Props) {
  const query = {
    content_type: "blogPost",
    "fields.slug": params.slug,
  } as const;

  const entries = await client.getEntries<BlogPostSkeleton>(query);

  const post = entries.items[0];

  if (!post) return notFound();

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.fields.title}</h1>

    

      <p className="text-lg text-gray-700 whitespace-pre-line">
        {post.fields.body}
      </p>
    </main>
  );
}
