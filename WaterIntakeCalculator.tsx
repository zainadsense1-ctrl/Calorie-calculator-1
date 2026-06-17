import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active";
type Climate = "temperate" | "hot" | "cold";
type Unit = "imperial" | "metric";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Daily Water Intake Calculator for Adults 50+",
  "url": "https://www.vitalage.com/water-intake-calculator",
  "description": "Calculate your daily hydration needs based on weight, activity level, and climate — with guidance specific to adults over 50.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Why do adults over 50 need to be more careful about hydration?", "acceptedAnswer": { "@type": "Answer", "text": "The sense of thirst diminishes with age, meaning older adults can become significantly dehydrated before feeling thirsty. Kidney function also declines with age, making fluid balance regulation less efficient. Additionally, many common medications taken by adults 50+ (diuretics, antihistamines) increase fluid loss. These factors combine to make dehydration a significant risk for older adults, even those who feel they're drinking adequately." } },
    { "@type": "Question", "name": "Does coffee count toward my daily water intake?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, moderate coffee and tea consumption does count toward hydration, contrary to popular belief. While caffeine has a mild diuretic effect, the water in caffeinated beverages more than offsets this effect at typical consumption levels. Research has established that moderate coffee and tea intake (up to 3–4 cups per day) contributes positively to daily fluid balance. However, these beverages are not ideal for hydration if consumed in excess of daily limits." } },
    { "@type": "Question", "name": "What are the signs of dehydration in older adults?", "acceptedAnswer": { "@type": "Answer", "text": "Dehydration symptoms in older adults can be subtle and easily mistaken for other conditions. Common signs include confusion or cognitive fog (often the first sign), fatigue, dark yellow or amber urine, dry mouth, muscle cramps, constipation, dizziness upon standing, and headache. Severe dehydration can cause rapid heartbeat, low blood pressure, and in extreme cases, disorientation that resembles dementia. If you notice sudden confusion in an older adult, dehydration should be considered." } },
    { "@type": "Question", "name": "Can I drink too much water?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, though it's uncommon in healthy adults. Overhydration (hyponatremia — low blood sodium from excessive water dilution) is more of a risk in endurance athletes who drink large amounts of plain water during extended events. For most adults over 50, simply meeting the daily target from this calculator and listening to the body's thirst signals (imperfect as they are) is appropriate. If you have kidney disease, heart failure, or other conditions that affect fluid balance, discuss your specific fluid intake with your physician." } }
  ]
};

export default function WaterIntakeCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weightLbs, setWeightLbs] = useState(155);
  const [weightKg, setWeightKg] = useState(70);
  const [activity, setActivity] = useState<ActivityLevel>("light");
  const [climate, setClimate] = useState<Climate>("temperate");
  const [diuretics, setDiuretics] = useState(false);

  const result = useMemo(() => {
    const wLbs = unit === "imperial" ? weightLbs : weightKg * 2.2046;
    let baseOz = wLbs * 0.5;
    const actAdj: Record<ActivityLevel, number> = { sedentary: 0, light: 8, moderate: 16, active: 24 };
    const climAdj: Record<Climate, number> = { temperate: 0, hot: 16, cold: 0 };
    let totalOz = baseOz + actAdj[activity] + climAdj[climate] + (diuretics ? 8 : 0);
    const liters = Math.round((totalOz * 0.0295735) * 10) / 10;
    const cups = Math.round(totalOz / 8);
    const glasses = Math.round(totalOz / 8);
    return { oz: Math.round(totalOz), liters, cups, glasses };
  }, [unit, weightLbs, weightKg, activity, climate, diuretics]);

  return (
    <Layout>
      <PageMeta
        title="Daily Water Intake Calculator for Adults 50+ — Hydration Guide | VitalAge"
        description="Calculate how much water you should drink daily based on your weight, activity level, and climate. Includes hydration tips specifically for adults over 50."
        canonical="https://www.vitalage.com/water-intake-calculator"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2"><a href="/" className="hover:text-primary">Home</a> › Water Intake Calculator</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Daily Water Intake Calculator for Adults 50+</h1>
          <p className="text-lg text-muted-foreground">Determine your personalized daily hydration target — accounting for the factors that make hydration management especially important after 50.</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10">
          <div className="flex gap-2 mb-6">
            {(["imperial", "metric"] as Unit[]).map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === u ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>
                {u === "imperial" ? "Imperial (lbs)" : "Metric (kg)"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

            <div>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="sedentary">Sedentary (mostly sitting)</option>
                <option value="light">Lightly Active (some walking, light exercise)</option>
                <option value="moderate">Moderately Active (regular exercise)</option>
                <option value="active">Very Active (intense daily exercise)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Climate / Environment</label>
              <select value={climate} onChange={(e) => setClimate(e.target.value as Climate)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="temperate">Temperate (mild, indoor most of day)</option>
                <option value="hot">Hot & Humid (summer heat, outdoor work)</option>
                <option value="cold">Cold & Dry (indoor heating in winter)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="diuretics" checked={diuretics} onChange={(e) => setDiuretics(e.target.checked)} className="w-4 h-4 accent-primary" />
              <label htmlFor="diuretics" className="text-sm font-medium cursor-pointer">I take diuretic medications (water pills)</label>
            </div>
          </div>

          {/* Result */}
          <div className="bg-primary/10 rounded-xl border border-primary/20 p-6">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Your Daily Water Target</div>
              <div className="flex items-baseline gap-3 justify-center">
                <span className="text-5xl font-bold text-primary" data-testid="text-water-oz">{result.oz}</span>
                <span className="text-xl text-muted-foreground">oz</span>
                <span className="text-2xl text-muted-foreground mx-2">/</span>
                <span className="text-4xl font-bold text-primary">{result.liters}</span>
                <span className="text-xl text-muted-foreground">L</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-background/60 rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">{result.cups}</div>
                <div className="text-xs text-muted-foreground">cups (8 oz each)</div>
              </div>
              <div className="bg-background/60 rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">{result.glasses}</div>
                <div className="text-xs text-muted-foreground">glasses of water</div>
              </div>
              <div className="bg-background/60 rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">{Math.round(result.liters * 1000 / 500)}</div>
                <div className="text-xs text-muted-foreground">standard bottles (500ml)</div>
              </div>
            </div>

            {/* Visual glasses */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {Array.from({ length: Math.min(result.glasses, 16) }).map((_, i) => (
                <div key={i} className="w-7 h-9 border-2 border-primary/60 rounded-b-lg bg-primary/20 flex items-end overflow-hidden">
                  <div className="w-full bg-primary/50 h-3/4 rounded-b" />
                </div>
              ))}
              {result.glasses > 16 && <span className="text-sm text-muted-foreground self-center">+{result.glasses - 16} more</span>}
            </div>
          </div>
        </div>

        <AdUnit slot={AD_SLOTS.calculatorBelowTool} format="horizontal" />

        <article className="prose prose-slate max-w-none">
          <h2>Why Hydration Becomes More Critical After 50</h2>
          <p>
            Among the physiological changes that accompany aging, the shift in thirst perception is one of the least well-known and most consequential. Younger adults can generally rely on thirst as a reliable signal that their body needs water. For adults over 50, this feedback mechanism becomes progressively less accurate — the sensation of thirst arrives later and at higher levels of dehydration than it did decades earlier.
          </p>
          <p>
            The practical consequence: older adults can become meaningfully dehydrated while feeling no particular urge to drink. Research has confirmed that older adults in various settings — living independently, in care facilities, and in hospitals — routinely show markers of suboptimal hydration when measured objectively, despite reporting no significant thirst.
          </p>

          <h3>How Dehydration Affects the Body After 50</h3>
          <p>
            Even mild dehydration — as little as 1 to 2 percent of body weight in fluid deficit — produces measurable effects in older adults:
          </p>
          <p>
            <strong>Cognitive function</strong> is among the first casualties of dehydration. Studies in older adults show significant impairments in attention, memory, and processing speed at hydration deficits that produce no subjective thirst. A common but underrecognized cause of sudden cognitive confusion in older adults admitted to hospitals is dehydration — not neurological disease.
          </p>
          <p>
            <strong>Joint health</strong> is affected because synovial fluid — the lubricating fluid in joints — is largely composed of water. Chronic mild dehydration may contribute to joint stiffness and discomfort, particularly prominent in the morning.
          </p>
          <p>
            <strong>Kidney function</strong> declines with age and is more vulnerable to the stress of dehydration. Adequate hydration supports the kidney's filtration function and reduces the risk of kidney stones, which become more common after 50.
          </p>
          <p>
            <strong>Blood pressure</strong> is directly affected by blood volume, which falls with dehydration. Orthostatic hypotension — a sudden drop in blood pressure upon standing, causing dizziness or lightheadedness — is significantly more common when dehydrated and is a meaningful fall risk in older adults.
          </p>
          <p>
            <strong>Constipation</strong>, which becomes more prevalent after 50 due to reduced gut motility, is substantially worsened by inadequate hydration. Water in the colon is essential for stool consistency and transit.
          </p>

          <AdUnit slot={AD_SLOTS.calculatorMidArticle} format="rectangle" />

          <h3>Practical Hydration Strategies for Adults 50+</h3>
          <p>
            Because thirst is an unreliable guide, adults over 50 are better served by scheduled hydration habits than by drinking reactively when thirsty:
          </p>
          <ul>
            <li><strong>Start with water.</strong> Make drinking a large glass of water the first thing you do upon waking — before coffee, breakfast, or anything else. Overnight is the longest fasting period most adults experience; rehydration should be immediate.</li>
            <li><strong>Drink before meals.</strong> A glass of water 15 to 30 minutes before each meal is a simple habit that contributes meaningfully to daily targets and may also reduce the appetite for foods consumed earlier in the meal.</li>
            <li><strong>Use visual cues.</strong> Keep a water bottle in prominent locations — on your desk, on the kitchen counter, next to the couch. Visibility drives consumption.</li>
            <li><strong>Monitor urine color.</strong> Pale yellow urine indicates adequate hydration. Dark yellow or amber urine is a reliable sign of dehydration. Colorless urine may indicate overhydration (unusual without specific medical circumstances).</li>
            <li><strong>Count more than plain water.</strong> Coffee, tea, herbal teas, soups, and water-rich foods (cucumbers, watermelon, lettuce) all contribute to daily hydration. Plain water is ideal, but other sources count.</li>
          </ul>
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
          <strong>Disclaimer:</strong> Fluid needs vary widely by individual and medical conditions. If you have kidney disease, heart failure, or other conditions affecting fluid balance, consult your physician for personalized hydration guidance.
        </p>
      </div>
    </Layout>
  );
}
