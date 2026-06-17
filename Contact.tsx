import { useState } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Question");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address.";
    if (!message.trim()) errs.message = "Please enter a message.";
    else if (message.trim().length < 20) errs.message = "Message must be at least 20 characters.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
      setName(""); setEmail(""); setSubject("General Question"); setMessage("");
    }, 1200);
  }

  return (
    <Layout>
      <PageMeta
        title="Contact VitalAge — Get in Touch | VitalAge"
        description="Have a question, feedback, or want to report an error? Reach out to the VitalAge team. We read every message and respond to most within 2 business days."
        canonical="https://www.vitalage.com/contact"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-2xl">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a> › Contact
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Contact Us</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          We'd love to hear from you. Whether you have a question about our calculators, feedback on our content, a partnership inquiry, or want to report something that doesn't look right — reach out and we'll get back to you promptly. You can also email us directly at{" "}
          <a href="mailto:zainadsense1@Gmail.com" className="text-primary hover:underline">zainadsense1@Gmail.com</a>.
        </p>

        {formState === "success" ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Message Sent</h2>
            <p className="text-green-700 dark:text-green-300">
              Thank you for reaching out. We read every message and will respond within 2 business days.
            </p>
            <button
              onClick={() => setFormState("idle")}
              className="mt-6 px-5 py-2 rounded-lg border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-rose-500">*</span></label>
              <input
                id="name"
                data-testid="input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.name ? "border-rose-400" : "border-input"}`}
                placeholder="Jane Smith"
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email Address <span className="text-rose-500">*</span></label>
              <input
                id="email"
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors.email ? "border-rose-400" : "border-input"}`}
                placeholder="jane@example.com"
              />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <select
                id="subject"
                data-testid="select-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>General Question</option>
                <option>Feedback</option>
                <option>Partnership Inquiry</option>
                <option>Report an Error</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-rose-500">*</span></label>
              <textarea
                id="message"
                data-testid="textarea-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-colors ${errors.message ? "border-rose-400" : "border-input"}`}
                placeholder="How can we help you?"
              />
              {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              data-testid="button-submit"
              disabled={formState === "submitting"}
              className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formState === "submitting" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <div>
                <div className="font-medium text-foreground">Email</div>
                <a href="mailto:zainadsense1@Gmail.com" className="text-primary hover:underline text-sm">zainadsense1@Gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div>
                <div className="font-medium text-foreground">Phone / WhatsApp</div>
                <a href="tel:+923709040644" className="text-primary hover:underline text-sm">+92 370 904 0644</a>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">We typically respond within 2 business days. For urgent health matters, please contact your physician or call emergency services.</p>
        </div>
      </div>
    </Layout>
  );
}
