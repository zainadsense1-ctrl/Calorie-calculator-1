import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";

export default function About() {
  return (
    <Layout>
      <PageMeta
        title="About VitalAge — Our Mission & Team | VitalAge"
        description="VitalAge is a health and fitness resource designed specifically for adults 50 and over. Learn about our mission, our team, and our commitment to evidence-based health information."
        canonical="https://www.vitalage.com/about"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a> › About Us
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About VitalAge</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            VitalAge exists because most health calculators and nutrition websites were not built with adults over 50 in mind. They use formulas designed for younger populations, offer advice calibrated to bodies that haven't yet experienced decades of hormonal shifts, muscle changes, and evolving metabolic needs — and then present those results as universally applicable.
          </p>

          <p>
            We built VitalAge to fill that gap. Every calculator on this site uses formulas validated for adults 50 and over. Every article is written with the specific physiological realities of aging as its starting point — not adapted from generic content. We believe adults in their 50s, 60s, 70s, and beyond deserve health tools and information that actually reflect how their bodies work.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is straightforward: to provide free, accurate, evidence-based health calculators and educational content specifically designed for the active 50+ generation.
          </p>
          <p>
            We believe that the years after 50 can be among the healthiest and most active of a person's life — given the right information and tools. Sarcopenia, bone density loss, metabolic slowdown, and the other changes that accompany aging are largely manageable with the right approach. But that approach is not the same one that worked at 30. VitalAge is built to help adults navigate that difference with clarity and confidence.
          </p>

          <h2>Our Team</h2>
          <p>
            VitalAge is produced by a team of certified nutrition professionals, exercise physiologists, and experienced health writers who share a focus on healthy aging. Our editorial team includes members with backgrounds in:
          </p>
          <ul>
            <li>Registered dietetics and clinical nutrition</li>
            <li>Exercise physiology and gerokinesiology (the science of aging and physical activity)</li>
            <li>Sports medicine and physical therapy</li>
            <li>Health communication and science writing</li>
          </ul>
          <p>
            All content published on VitalAge is reviewed for accuracy against current peer-reviewed literature before publication and updated when new evidence warrants revision. We cite established clinical guidelines and research from organizations including the National Institutes of Health, the Academy of Nutrition and Dietetics, the American College of Sports Medicine, and the Endocrine Society, among others.
          </p>

          <h2>Our Commitment to Accuracy</h2>
          <p>
            We do not publish content for the purpose of selling supplements, promoting specific diets, or endorsing commercial products. Our revenue comes from display advertising, which allows us to provide all tools and content free of charge. We disclose this in our privacy policy.
          </p>
          <p>
            The calculators on VitalAge are tools for education and self-awareness — not medical devices, and not substitutes for professional healthcare. We are explicit about this throughout the site. If you have specific health concerns or medical conditions, please consult your physician, registered dietitian, or other qualified healthcare provider. Our information is a starting point for informed conversation with your healthcare team, not a replacement for it.
          </p>

          <h2>Contact Us</h2>
          <p>
            We welcome feedback, questions, error reports, and partnership inquiries. If you find information on our site that appears outdated or inaccurate, we want to know — accuracy matters to us, and we'll review and correct promptly.
          </p>
          <p>
            You can reach our team via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link> or directly at <a href="mailto:hello@vitalage.com" className="text-primary hover:underline">hello@vitalage.com</a>.
          </p>
        </div>

        {/* Mission cards */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { title: "Evidence-Based", desc: "Every claim references peer-reviewed research or established clinical guidelines." },
            { title: "Age-Appropriate", desc: "Tools and content calibrated specifically for the physiology of adults 50 and over." },
            { title: "Free to Use", desc: "All calculators and articles are free. Your personal data never leaves your browser." },
          ].map((card) => (
            <div key={card.title} className="border border-border rounded-xl p-5 bg-card">
              <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
