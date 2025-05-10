import { blogs } from "@/constant/blog";
import Image from "next/image";

const BlogDetailsPage =async ({ params }: { params: Promise<{id:string}> }) => {
  const { id } = await params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-6 text-center">
            Blog not found
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 mt-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">
          {blog.title}
        </h1>

        <div className="flex flex-col items-center">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-lg shadow-md mb-8"
          />

          <p className="text-gray-700 text-lg max-w-4xl text-justify">
            {blog.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
