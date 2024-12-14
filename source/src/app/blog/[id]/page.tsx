type BlogPostProps = {
    params: { id: string };
  };
  //Dinamicka ruta se definira sa zagradama u file-u, tako ce 1 file rednerirat vise razl url, svaki url prosljdejue vrijednost id
  export default function BlogPost({ params }: BlogPostProps) {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="text-6xl font-extrabold tracking-tight">
          Blog Post: {params.id}
        </h1>
      </main>
    );
  }