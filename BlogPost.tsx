import { useParams, Link } from "wouter";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import { blogArticles } from "@/data/blogData";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-semibold text-foreground mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground leading-relaxed">
          {listItems.map((item, idx) => {
            const boldMatch = item.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
            if (boldMatch) {
              return <li key={idx}><strong className="text-foreground">{boldMatch[1]}:</strong> {boldMatch[2]}</li>;
            }
            return <li key={idx}>{item}</li>;
          })}
        </ul>
      );
      continue;
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={idx} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
        }
        return <span key={idx}>{part}</span>;
      });
      elements.push(<p key={i} className="text-muted-foreground leading-relaxed my-4">{rendered}</p>);
    }
    i++;
  }

  return elements;
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.date,
    "author": { "@type": "Organization", "name": "VitalAge Editorial Team" },
    "publisher": { "@type": "Organization", "name": "VitalAge", "url": "https://www.vitalage.com" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.vitalage.com/blog/${article.slug}` }
  };

  return (
    <Layout>
      <PageMeta
        title={`${article.title} | VitalAge`}
        description={article.excerpt}
        canonical={`https://www.vitalage.com/blog/${article.slug}`}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          {" › "}
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          {" › "}
          <span className="text-foreground">{article.title}</span>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
            <span>·</span>
            <span>{article.readTime} read</span>
            <span>·</span>
            <span>VitalAge Editorial Team</span>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
            {article.excerpt}
          </p>
        </header>

        <AdUnit slot={AD_SLOTS.blogPostTop} format="horizontal" />

        {/* Article Content */}
        <article className="mb-6">
          {renderContent(article.content)}
        </article>

        <AdUnit slot={AD_SLOTS.blogPostMid} format="rectangle" />

        {/* Disclaimer */}
        <div className="p-4 bg-muted/40 rounded-lg border border-border text-xs text-muted-foreground mb-8">
          <strong>Health Disclaimer:</strong> The information in this article is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </div>

        {/* Back + Related */}
        <div className="border-t border-border pt-8">
          <AdUnit slot={AD_SLOTS.blogPostBottom} format="horizontal" className="mb-4" />
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-6">
            ← Back to all articles
          </Link>

          <h2 className="text-xl font-bold text-foreground mb-4">More Articles</h2>
          <div className="grid gap-4">
            {blogArticles
              .filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-muted/40 transition-all"
                >
                  <span className="text-xs text-muted-foreground">{related.readTime} read</span>
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">{related.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
