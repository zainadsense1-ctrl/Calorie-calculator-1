import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <PageMeta
        title="Privacy Policy | VitalAge"
        description="VitalAge Privacy Policy — how we collect, use, and protect your information, including our use of cookies, Google Analytics, and Google AdSense."
        canonical="https://www.vitalage.com/privacy-policy"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a> › Privacy Policy
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: October 14, 2025</p>

        <div className="prose prose-slate max-w-none">
          <p>
            VitalAge ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website at vitalage.com (the "Site"). Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Information You Provide Directly</h3>
          <p>
            When you use our contact form, you may voluntarily provide your name, email address, and message content. We collect only what you submit and use it solely to respond to your inquiry.
          </p>

          <h3>Calculator Inputs</h3>
          <p>
            All health calculator inputs (age, weight, height, measurements, and similar data) are processed entirely within your browser using client-side JavaScript. This data is never transmitted to our servers, stored in any database, or associated with any user account or identifier. We do not have access to the values you enter into our calculators.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit the Site, certain information may be collected automatically, including:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages viewed and navigation patterns</li>
            <li>Referring URL</li>
            <li>Date and time of access</li>
            <li>IP address (anonymized by default in our analytics configuration)</li>
          </ul>
          <p>This information is collected through cookies and similar tracking technologies as described below.</p>

          <h2>2. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies — small data files placed on your device — for the following purposes:
          </p>

          <h3>Analytics Cookies (Google Analytics)</h3>
          <p>
            We use Google Analytics to understand how visitors interact with the Site — which pages are most visited, how long people stay, and how they navigate. Google Analytics uses cookies to collect aggregated, anonymized data. We have enabled IP anonymization in our Google Analytics configuration so that full IP addresses are not stored. You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h3>Advertising Cookies (Google AdSense)</h3>
          <p>
            The Site uses Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our Site and other sites on the internet. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our Site and other sites on the Internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank" className="text-primary hover:underline">Google Ads Settings</a>. You can also opt out through the <a href="https://optout.networkadvertising.org" rel="noopener noreferrer" target="_blank" className="text-primary hover:underline">Network Advertising Initiative opt-out page</a> or the <a href="https://optout.aboutads.info" rel="noopener noreferrer" target="_blank" className="text-primary hover:underline">Digital Advertising Alliance opt-out page</a>.
          </p>
          <p>
            If you prefer not to receive personalized ads, you can disable personalized advertising in your device settings (on mobile devices) or adjust your browser settings to block third-party cookies.
          </p>

          <h3>Essential Cookies</h3>
          <p>
            Some cookies are strictly necessary for the Site to function — for example, maintaining your unit preference (metric vs. imperial) in our calculators within a session. These cookies do not collect personal information and cannot be disabled without affecting Site functionality.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to contact form inquiries</li>
            <li>Analyze Site usage to improve content and functionality</li>
            <li>Serve relevant advertisements through Google AdSense</li>
            <li>Maintain the security and integrity of the Site</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>

          <h2>4. Third-Party Services</h2>
          <p>
            Our Site uses the following third-party services that may collect information according to their own privacy policies:
          </p>
          <ul>
            <li><strong>Google Analytics</strong> — <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank" className="text-primary hover:underline">Google Privacy Policy</a></li>
            <li><strong>Google AdSense</strong> — <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank" className="text-primary hover:underline">Google Privacy Policy</a></li>
          </ul>
          <p>We encourage you to review the privacy policies of these third-party providers.</p>

          <h2>5. Data Retention</h2>
          <p>
            Contact form submissions are retained for a maximum of 12 months and then permanently deleted. Analytics data is retained according to Google Analytics' standard data retention settings (26 months by default). We do not retain any calculator input data, as it is never transmitted to our systems.
          </p>

          <h2>6. Your Privacy Rights</h2>

          <h3>GDPR Rights (European Economic Area Residents)</h3>
          <p>
            If you are located in the European Economic Area, you have the right to access, correct, delete, restrict processing of, and port your personal data. You also have the right to object to processing and to withdraw consent where processing is based on consent. To exercise these rights, contact us at <a href="mailto:hello@vitalage.com" className="text-primary hover:underline">hello@vitalage.com</a>.
          </p>

          <h3>CCPA Rights (California Residents)</h3>
          <p>
            If you are a California resident, you have the right to know what personal information we collect, the right to request deletion of your personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your rights, contact us at <a href="mailto:hello@vitalage.com" className="text-primary hover:underline">hello@vitalage.com</a>.
          </p>

          <h2>7. Children's Privacy</h2>
          <p>
            The Site is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child under 13, please contact us immediately and we will take steps to delete that information.
          </p>

          <h2>8. Security</h2>
          <p>
            We implement reasonable technical and organizational security measures to protect your information. However, no method of internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will indicate the date of the most recent update at the top of this page. Continued use of the Site after any changes constitutes acceptance of the revised policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:<br />
            <a href="mailto:hello@vitalage.com" className="text-primary hover:underline">hello@vitalage.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
