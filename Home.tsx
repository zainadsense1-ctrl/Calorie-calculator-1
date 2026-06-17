import { Link } from "wouter";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import { blogArticles } from "@/data/blogData";

const calculators = [
  {
    href: "/tdee-calculator",
    title: "TDEE Calculator",
    description: "Find out exactly how many calories your body burns each day based on your age, weight, height, and activity level.",
    icon: "🔥",
    label: "Total Daily Energy Expenditure"
  },
  {
    href: "/macro-calculator",
    title: "Macro Calculator",
    description: "Discover your ideal protein, carbohydrate, and fat targets to reach your specific health and weight goals.",
    icon: "🥗",
    label: "Protein, Carbs & Fat Targets"
  },
  {
    href: "/bmi-calculator",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand what it means for healthy aging and long-term wellness.",
    icon: "📊",
    label: "Body Mass Index"
  },
  {
    href: "/body-fat-calculator",
    title: "Body Fat Calculator",
    description: "Estimate your body fat percentage using the Navy Method and understand healthy ranges for your age.",
    icon: "💪",
    label: "Body Fat Percentage"
  },
  {
    href: "/water-intake-calculator",
    title: "Water Intake Calculator",
    description: "Determine your daily hydration needs based on weight, activity, and climate — especially important after 50.",
    icon: "💧",
    label: "Daily Hydration Needs"
  },
  {
    href: "/ideal-weight-calculator",
    title: "Ideal Weight Calculator",
    description: "Find your healthy weight range using four evidence-based formulas, with guidance for adults over 50.",
    icon: "⚖️",
    label: "Healthy Weight Range"
  }
];

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": ["WebSite", "Organization"],
  "name": "VitalAge",
  "url": "https://www.vitalage.com",
  "description": "Free health calculators and expert nutrition guidance for adults 50 and over.",
  "sameAs": [],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.vitalage.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  const featuredArticles = blogArticles.slice(0, 3);

  return (
    <Layout>
      <PageMeta
        title="VitalAge — Health Calculators for Adults 50+ | Free Online Tools"
        description="Free, science-based health calculators and nutrition guidance designed specifically for adults over 50. Calculate TDEE, macros, BMI, body fat, water intake, and ideal weight."
        canonical="https://www.vitalage.com/"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-primary/20">
              Trusted health tools for the active 50+ generation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Health Calculators Built for{" "}
              <span className="text-primary">Adults Over 50</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Your body at 55 is not your body at 35. Our free calculators and science-based guides are designed specifically for the physiology, goals, and challenges of healthy aging — not adapted from tools built for 25-year-olds.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/tdee-calculator" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Start with TDEE Calculator
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors">
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Free Health Calculators</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              All calculators use formulas validated for adults over 50, with results interpreted in the context of healthy aging.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                data-testid={`card-calculator-${calc.href.slice(1)}`}
                className="group flex flex-col gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{calc.icon}</div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{calc.label}</div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{calc.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{calc.description}</p>
                <span className="text-sm font-medium text-primary mt-auto">Use calculator →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why VitalAge */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why VitalAge Is Different</h2>
            <p className="text-muted-foreground text-lg">
              Most health calculators were built without older adults in mind. We designed every tool and article around the real physiology of aging.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Age-Appropriate Formulas</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">We use the Mifflin-St Jeor equation — the most accurate method for adults over 50 — not older formulas with known age-related inaccuracies.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Original Educational Content</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Every calculator page and blog article is written by health and nutrition professionals — not repurposed generic content — focused on what actually matters after 50.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Privacy Respected</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">All calculations happen locally in your browser. Your personal health data is never sent to our servers or stored anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Latest from the Blog</h2>
              <p className="text-muted-foreground">Science-backed guides for healthy aging</p>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 text-primary font-medium hover:underline">
              View all articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                data-testid={`card-blog-${article.slug}`}
                className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={article.date}>{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                  <span>·</span>
                  <span>{article.readTime} read</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                <span className="text-sm font-medium text-primary mt-auto">Read article →</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog" className="text-primary font-medium hover:underline">
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Health Disclaimer Banner */}
      <section className="py-10 bg-muted/40 border-t border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Health Disclaimer:</strong> The calculators and content on VitalAge are for informational and educational purposes only. Results are estimates based on population averages and are not a substitute for professional medical advice. Always consult your physician before making changes to your diet, exercise routine, or health practices.{" "}
            <Link href="/disclaimer" className="text-primary hover:underline">Read our full disclaimer</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
}
