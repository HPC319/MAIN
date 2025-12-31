'use client'

import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

interface HomeBlogSectionProps {
  posts: Record<string, unknown>[];
}

const HomeBlogSection = ({ posts }: HomeBlogSectionProps) => {
  // Convert Record<string, unknown> to Blog format
  const blogs: Blog[] = posts.map((post): Blog => {
    const coverImage = post.coverImage;
    return {
      id: 0,
      title: (post.title as string) || "",
      slug: (post.slug as string) || "",
      excerpt: ((post.excerpt as string) || (post.content as string) || "").slice(0, 150),
      coverImage: typeof coverImage === 'string' ? coverImage : undefined,
      date: (post.date as string) || new Date().toISOString(),
    };
  });

  return (
    <section
      id="blog"
      className="bg-primary/5 py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
