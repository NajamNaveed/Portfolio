import { Clock } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionShell from "./SectionShell.jsx";
import SafeImage from "../ui/SafeImage.jsx";
import formatDate from "../../utils/formatDate.js";

const BlogSection = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <SectionShell id="blog" eyebrow="From the blog" title="Latest Articles">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post._id || post.slug} delay={index * 0.05}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="aspect-video w-full">
                <SafeImage src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                {post.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
                    {post.category}
                  </span>
                )}
                <h3 className="mt-1.5 text-base font-semibold leading-snug text-slate-100">{post.title}</h3>
                {post.excerpt && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
                )}
                <div className="mt-4 flex items-center gap-3 border-t border-slate-800 pt-3 text-xs text-slate-500">
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  {post.readingTime > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readingTime} min read
                    </span>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
};

export default BlogSection;
