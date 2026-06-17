import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

type Unit = "imperial" | "metric";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BMI Calculator for Seniors",
  "url": "https://www.vitalage.com/bmi-calculator",
  "description": "Calculate your Body Mass Index and understand what it means for healthy aging as an adult over 50.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is BMI accurate for older adults?", "acceptedAnswer": { "@type": "Answer", "text": "BMI has known limitations for older adults. It doesn't account for muscle mass, bone density, or fat distribution. A person with significant sarcopenia (muscle loss) may have a 'normal' BMI despite having a problematic body composition. Body fat percentage and waist circumference are often more informative for adults over 50." } },
    { "@type": "Question", "name": "What BMI range is healthy for adults 50 and over?", "acceptedAnswer": { "@type": "Answer", "text": "While standard BMI categories apply (18.5–24.9 is 'normal'), research suggests that adults 65 and older may have slightly better health outcomes at BMIs in the 25–27 range compared to those at the lower end of normal. This is sometimes called the 'obesity paradox' in older adults. A healthcare provider can give context specific to your situation." } },
    { "@type": "Question", "name": "What is the difference between BMI and body fat percentage?", "acceptedAnswer": { "@type": "Answer", "text": "BMI is a ratio of weight to height squared — a quick proxy measure. Body fat percentage directly estimates the proportion of your body that is fat tissue. Two people with identical BMIs can have very different body fat percentages depending on their muscle mass. For older adults, body fat percentage (measured via DEXA scan or estimated with the Navy Method) is generally a more meaningful health indicator." } },
    { "@type": "Question", "name": "What should I do if my BMI is in the overweight or obese range?", "acceptedAnswer": { "@type": "Answer", "text": "An elevated BMI is a signal worth discussing with your doctor, but context matters. If your waist circumference is within healthy ranges, your metabolic markers (blood glucose, blood pressure, cholesterol) are normal, and you are physically active and strong, the health risk from a slightly elevated BMI may be modest. Focus on improving body composition, strength, and metabolic health rather than targeting a number on the scale." } }
  ]
};

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600", bg: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" };
  if (bmi < 25) return { label: "Normal Weight", color: "text-green-700", bg: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" };
  if (bmi < 30) return { label: "Overweight", color: "text-amber-700", bg: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" };
  return { label: "Obese", color: "text-rose-700", bg: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800" };
}

export default function BMICalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weightLbs, setWeightLbs] = useState(165);
  const [weightKg, setWeightKg] = useState(75);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(6);
  const [heightCm, setHeightCm] = useState(168);

  const result = useMemo(() => {
    const wKg = unit === "imperial" ? weightLbs * 0.453592 : weightKg;
    const hM = unit === "imperial" ? (heightFt * 12 + heightIn) * 0.0254 : heightCm / 100;
    const bmi = wKg / (hM * hM);
    return { bmi: Math.round(bmi * 10) / 10, category: getBMICategory(bmi) };
  }, [unit, weightLbs, weightKg, heightFt, heightIn, heightCm]);

  const scalePosition = Math.min(Math.max(((result.bmi - 15) / (40 - 15)) * 100, 0), 100);

  return (
    <Layout>
      <PageMeta
        title="BMI Calculator for Seniors — Body Mass Index for Adults 50+ | VitalAge"
        description="Calculate your BMI with our free calculator and understand what your result means for healthy aging. Includes BMI interpretation and health guidance for adults over 50."
        canonical="https://www.vitalage.com/bmi-calculator"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2"><a href="/" className="hover:text-primary">Home</a> › BMI Calculator</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">BMI Calculator for Adults 50+</h1>
          <p className="text-lg text-muted-foreground">Calculate your Body Mass Index and understand what it means in the context of healthy aging — including the important limitations of BMI for older adults.</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10">
          <div className="flex gap-2 mb-6">
            {(["imperial", "metric"] as Unit[]).map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === u ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>
                {u === "imperial" ? "Imperial (lbs/ft)" : "Metric (kg/cm)"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {unit === "imperial" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Weight (lbs)</label>
                <input type="number" min={80} max={400} value={weightLbs} onChange={(e) => setWeightLbs(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input type="number" min={35} max={180} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}
            {unit === "imperial" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <div className="flex gap-3">
                  <div className="flex-1"><input type="number" min={4} max={7} value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none" placeholder="ft" /><span className="text-xs text-muted-foreground">feet</span></div>
                  <div className="flex-1"><input type="number" min={0} max={11} value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none" placeholder="in" /><span className="text-xs text-muted-foreground">inches</span></div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input type="number" min={130} max={220} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}
          </div>

          {/* Result */}
          <div className={`rounded-xl border p-6 ${result.category.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Your BMI</div>
                <div className={`text-5xl font-bold ${result.category.color}`} data-testid="text-bmi">{result.bmi}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-muted-foreground mb-1">Category</div>
                <div className={`text-xl font-semibold ${result.category.color}`}>{result.category.label}</div>
              </div>
            </div>
            {/* Visual Scale */}
            <div className="relative h-4 rounded-full overflow-hidden flex mt-4">
              <div className="flex-1 bg-blue-400" title="Underweight" />
              <div className="flex-[2] bg-green-500" title="Normal" />
              <div className="flex-[1.5] bg-amber-400" title="Overweight" />
              <div className="flex-[2] bg-rose-500" title="Obese" />
            </div>
            <div className="relative h-3 mt-1">
              <div className="absolute w-3 h-3 bg-foreground rounded-full -translate-x-1/2 -top-0.5 transition-all" style={{ left: `${scalePosition}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Underweight (&lt;18.5)</span><span>Normal (18.5–24.9)</span><span>Overweight (25–29.9)</span><span>Obese (≥30)</span>
            </div>
          </div>
        </div>

        <AdUnit slot={AD_SLOTS.calculatorBelowTool} format="horizontal" />

        {/* Educational Content */}
        <article className="prose prose-slate max-w-none">
          <h2>Understanding BMI for Adults Over 50</h2>
          <p>
            Body Mass Index, or BMI, is one of the most widely used health screening tools in medicine — and one of the most misunderstood. Calculated by dividing your weight in kilograms by your height in meters squared, BMI produces a single number that places you in one of four categories: underweight, normal weight, overweight, or obese.
          </p>
          <p>
            BMI was not originally designed as a health measurement tool at all. The Belgian mathematician Adolphe Quetelet developed it in the early 1800s as a statistical measure of average body size in populations. Its adoption as a clinical screening tool in the 20th century is convenient rather than scientific — it's inexpensive, requires only a scale and stadiometer, and correlates roughly with health outcomes at the population level. For individual adults over 50, those correlations are considerably less reliable.
          </p>

          <h3>Why BMI Is Less Reliable After 50</h3>
          <p>
            Several characteristics of aging undermine BMI's usefulness as a health indicator:
          </p>
          <p>
            <strong>Muscle-fat redistribution.</strong> BMI cannot distinguish between muscle and fat. An older adult who has lost significant muscle mass (sarcopenia) while gaining fat may have an apparently normal BMI despite having a body composition that increases disease risk. Conversely, a physically active older adult with substantial muscle mass may have a BMI in the "overweight" range while being genuinely healthier than someone at a "normal" BMI with low muscle and high fat.
          </p>
          <p>
            <strong>Height change.</strong> Adults typically lose one to three inches of height between ages 40 and 80 due to vertebral compression and postural changes. Because BMI uses height squared in its denominator, even small height reductions increase BMI meaningfully without any actual weight gain.
          </p>
          <p>
            <strong>The obesity paradox.</strong> Multiple large studies of older adults have found that slightly elevated BMI — in the 25 to 27 range — is associated with lower mortality than BMI in the "normal" range. One proposed explanation: higher BMI in older adults may partially reflect preserved muscle mass and metabolic reserve. Adults at the low end of "normal" BMI in their 70s often have dangerously low muscle mass and nutritional reserves.
          </p>

          <AdUnit slot={AD_SLOTS.calculatorMidArticle} format="rectangle" />

          <h3>Better Measurements to Complement BMI</h3>
          <p>
            <strong>Waist circumference</strong> is a better predictor of visceral (abdominal) fat than BMI and is more directly associated with metabolic disease risk. For adults 50 and older, health organizations generally recommend waist circumference below 35 inches for women and 40 inches for men as low-risk thresholds.
          </p>
          <p>
            <strong>Body fat percentage</strong>, measured via DEXA scan (the gold standard) or estimated through methods like the Navy formula, provides a more complete picture of body composition than BMI alone. Our <a href="/body-fat-calculator" className="text-primary hover:underline">Body Fat Calculator</a> uses the Navy Method for a convenient estimate.
          </p>
          <p>
            <strong>Functional fitness assessments</strong> — grip strength, walking speed, chair stand test — are increasingly recognized as meaningful predictors of aging outcomes that no weight-based measure captures.
          </p>

          <h3>What to Do with Your BMI Result</h3>
          <p>
            Use your BMI as a starting data point, not a verdict. If your BMI is significantly elevated (above 30), it is worth having a broader health conversation with your physician — including blood pressure, blood glucose, cholesterol, waist circumference, and functional capacity. If your BMI is in the normal or slightly overweight range, the more meaningful questions are about body composition, physical function, and metabolic markers.
          </p>
          <p>
            The most evidence-supported approach for adults over 50 who want to improve their health profile: prioritize building and maintaining muscle through resistance training, eat adequate protein, support metabolic health through diet quality and sleep, and measure progress through functional benchmarks (strength, endurance, flexibility) rather than scale weight alone.
          </p>
        </article>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((faq) => (
              <div key={faq.name} className="border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 border border-border">
          <strong>Disclaimer:</strong> BMI is a population-level screening tool and is not a diagnostic measure of individual health. Results do not constitute medical advice. Consult your physician for a comprehensive health assessment.
        </p>
      </div>
    </Layout>
  );
}
