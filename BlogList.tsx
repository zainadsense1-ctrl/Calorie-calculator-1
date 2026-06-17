import { Link } from "wouter";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import { blogArticles } from "@/data/blogData";

export default function BlogList() {
  return (
    <Layout>
      <PageMeta
        title="Health & Nutrition Blog for Adults 50+ | VitalAge"
        description="Science-backed articles on nutrition, weight management, strength training, gut health, sleep, and healthy aging — written for adults 50 and over."
        canonical="https://www.vitalage.com/blog"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <div className="mb-10">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary">Home</a> › Blog
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Health & Nutrition Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Original, science-backed articles on nutrition, fitness, and healthy aging — written specifically for adults 50 and over. No generic advice. No repurposed content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              data-testid={`card-blog-${article.slug}`}
              className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span>·</span>
                <span>{article.readTime} read</span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <span className="text-sm font-medium text-primary mt-auto">Read article →</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
