import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";

export default function TermsOfService() {
  return (
    <Layout>
      <PageMeta
        title="Terms of Service | VitalAge"
        description="VitalAge Terms of Service — your agreement with VitalAge governing use of our website, calculators, and content."
        canonical="https://www.vitalage.com/terms-of-service"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a> › Terms of Service
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: October 14, 2025</p>

        <div className="prose prose-slate max-w-none">
          <p>
            These Terms of Service ("Terms") govern your access to and use of the VitalAge website at vitalage.com ("Site"), including all content, calculators, tools, and services available through the Site. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Site.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing the Site, you confirm that you are at least 13 years of age and that you agree to comply with these Terms and all applicable laws and regulations. If you are using the Site on behalf of an organization, you agree to these Terms on behalf of that organization.
          </p>

          <h2>2. Use of the Site</h2>
          <p>
            You may use the Site for personal, non-commercial purposes only. You agree not to:
          </p>
          <ul>
            <li>Use the Site in any way that violates applicable local, national, or international laws or regulations</li>
            <li>Reproduce, distribute, modify, or create derivative works from any content on the Site without our prior written consent</li>
            <li>Use automated tools, bots, scrapers, or crawlers to access the Site in a manner that imposes an unreasonable load on our infrastructure</li>
            <li>Attempt to gain unauthorized access to any portion of the Site or its related systems</li>
            <li>Use the Site to transmit any unsolicited communications, spam, or malicious content</li>
            <li>Misrepresent your identity or affiliation with any person or organization</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on the Site — including text, articles, calculator designs, graphics, logos, and the selection and arrangement thereof — is owned by or licensed to VitalAge and is protected by copyright, trademark, and other intellectual property laws. The formulas and algorithms used by our calculators are in the public domain; the specific implementation, educational content, and presentation are our intellectual property.
          </p>
          <p>
            You are permitted to share links to our content, quote brief excerpts with proper attribution, and use our calculators for personal use. You may not republish, scrape, or use our articles or calculator results as if they were your own without our express written permission.
          </p>

          <h2>4. Health Information Disclaimer</h2>
          <p>
            The calculators, articles, and all other content on the Site are provided for informational and educational purposes only. Nothing on the Site constitutes medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before making changes to your diet, exercise routine, or other health-related decisions. See our <a href="/disclaimer" className="text-primary hover:underline">Health Disclaimer</a> for more information.
          </p>

          <h2>5. Calculator Accuracy</h2>
          <p>
            The calculators on this Site use established, peer-reviewed formulas and are implemented to the best of our ability. However, all calculators provide estimates based on population averages and statistical models. Individual results may vary significantly. We make no warranty, express or implied, regarding the accuracy, completeness, or suitability of calculator outputs for any particular individual or purpose.
          </p>

          <h2>6. User-Submitted Content</h2>
          <p>
            If you submit content to us — such as through our contact form — you grant us a non-exclusive, royalty-free license to use that content for the purpose of responding to your inquiry. We will not publish or distribute your personal communications without your consent.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. These links are provided for convenience only and do not constitute an endorsement by VitalAge of any linked site or its content. We have no control over the content or privacy practices of linked sites and assume no responsibility for them.
          </p>

          <h2>8. Advertising</h2>
          <p>
            The Site displays advertisements through Google AdSense and may display other third-party advertisements in the future. These advertisements are clearly distinguished from editorial content. The presence of an advertisement does not constitute our endorsement of any advertised product or service.
          </p>

          <h2>9. Disclaimer of Warranties</h2>
          <p>
            The Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, VitalAge and its team members shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data, arising out of or in connection with your use of the Site, even if we have been advised of the possibility of such damages. Our total liability to you for any claim arising out of or relating to these Terms or the Site shall not exceed fifty US dollars ($50).
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless VitalAge and its team members from and against any claims, liabilities, damages, losses, and expenses arising out of or in connection with your use of the Site or violation of these Terms.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will indicate the date of the most recent update at the top of this page. Your continued use of the Site after any changes constitutes acceptance of the revised Terms.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable law, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the appropriate courts of competent jurisdiction.
          </p>

          <h2>14. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:hello@vitalage.com" className="text-primary hover:underline">hello@vitalage.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
