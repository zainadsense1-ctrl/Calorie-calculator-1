import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

type Sex = "male" | "female";
type Unit = "imperial" | "metric";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Body Fat Percentage Calculator",
  "url": "https://www.vitalage.com/body-fat-calculator",
  "description": "Estimate body fat percentage using the U.S. Navy Method with age-adjusted interpretation for adults over 50.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
};

function getCategory(bf: number, sex: Sex) {
  if (sex === "male") {
    if (bf < 8) return { label: "Essential Fat", color: "text-blue-600", bg: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" };
    if (bf < 20) return { label: "Athletic / Fitness", color: "text-green-700", bg: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" };
    if (bf < 26) return { label: "Acceptable", color: "text-amber-700", bg: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" };
    return { label: "High", color: "text-rose-700", bg: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800" };
  } else {
    if (bf < 14) return { label: "Essential Fat", color: "text-blue-600", bg: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" };
    if (bf < 27) return { label: "Athletic / Fitness", color: "text-green-700", bg: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" };
    if (bf < 33) return { label: "Acceptable", color: "text-amber-700", bg: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" };
    return { label: "High", color: "text-rose-700", bg: "bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800" };
  }
}

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [sex, setSex] = useState<Sex>("female");
  const [weightLbs, setWeightLbs] = useState(155);
  const [weightKg, setWeightKg] = useState(70);
  const [heightIn, setHeightIn] = useState(64);
  const [heightCm, setHeightCm] = useState(163);
  const [waistIn, setWaistIn] = useState(34);
  const [waistCm, setWaistCm] = useState(86);
  const [hipIn, setHipIn] = useState(40);
  const [hipCm, setHipCm] = useState(102);
  const [neckIn, setNeckIn] = useState(13);
  const [neckCm, setNeckCm] = useState(33);

  const result = useMemo(() => {
    const h = unit === "imperial" ? heightIn : heightCm / 2.54;
    const w = unit === "imperial" ? waistIn : waistCm / 2.54;
    const hi = unit === "imperial" ? hipIn : hipCm / 2.54;
    const n = unit === "imperial" ? neckIn : neckCm / 2.54;
    const wKg = unit === "imperial" ? weightLbs * 0.453592 : weightKg;

    let bf: number;
    if (sex === "male") {
      bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bf = 163.205 * Math.log10(w + hi - n) - 97.684 * Math.log10(h) - 78.387;
    }
    bf = Math.max(4, Math.round(bf * 10) / 10);
    const fatMassKg = wKg * (bf / 100);
    const leanMassKg = wKg - fatMassKg;
    const fatLbs = Math.round(fatMassKg * 2.2046 * 10) / 10;
    const leanLbs = Math.round(leanMassKg * 2.2046 * 10) / 10;
    return { bf, fatLbs, leanLbs, category: getCategory(bf, sex) };
  }, [unit, sex, weightLbs, weightKg, heightIn, heightCm, waistIn, waistCm, hipIn, hipCm, neckIn, neckCm]);

  return (
    <Layout>
      <PageMeta
        title="Body Fat Calculator for Adults 50+ — Estimate Body Fat % | VitalAge"
        description="Estimate your body fat percentage using the U.S. Navy method. Understand healthy body fat ranges for adults over 50 and why body composition matters more than weight."
        canonical="https://www.vitalage.com/body-fat-calculator"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2"><a href="/" className="hover:text-primary">Home</a> › Body Fat Calculator</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Body Fat Percentage Calculator</h1>
          <p className="text-lg text-muted-foreground">Estimate your body fat percentage using the U.S. Navy Method — a more informative measure of body composition than BMI alone, especially for adults over 50.</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10">
          <div className="flex gap-2 mb-6">
            {(["imperial", "metric"] as Unit[]).map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === u ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>
                {u === "imperial" ? "Imperial (inches)" : "Metric (cm)"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Biological Sex</label>
              <div className="flex gap-2">
                {(["female", "male"] as Sex[]).map((s) => (
                  <button key={s} onClick={() => setSex(s)} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border capitalize ${sex === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>{s}</button>
                ))}
              </div>
            </div>

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
              <label className="block text-sm font-medium mb-2">Height ({unit === "imperial" ? "total inches" : "cm"})</label>
              {unit === "imperial" ? (
                <input type="number" min={55} max={84} value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 64 for 5ft 4in" />
              ) : (
                <input type="number" min={130} max={220} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Waist ({unit === "imperial" ? "inches" : "cm"}) <span className="text-xs text-muted-foreground">at navel</span></label>
              <input type="number" min={unit === "imperial" ? 20 : 50} max={unit === "imperial" ? 60 : 150} value={unit === "imperial" ? waistIn : waistCm} onChange={(e) => unit === "imperial" ? setWaistIn(Number(e.target.value)) : setWaistCm(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Neck ({unit === "imperial" ? "inches" : "cm"})</label>
              <input type="number" min={unit === "imperial" ? 10 : 25} max={unit === "imperial" ? 22 : 55} value={unit === "imperial" ? neckIn : neckCm} onChange={(e) => unit === "imperial" ? setNeckIn(Number(e.target.value)) : setNeckCm(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            {sex === "female" && (
              <div>
                <label className="block text-sm font-medium mb-2">Hip ({unit === "imperial" ? "inches" : "cm"}) <span className="text-xs text-muted-foreground">widest point</span></label>
                <input type="number" min={unit === "imperial" ? 25 : 60} max={unit === "imperial" ? 70 : 175} value={unit === "imperial" ? hipIn : hipCm} onChange={(e) => unit === "imperial" ? setHipIn(Number(e.target.value)) : setHipCm(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}
          </div>

          <div className={`rounded-xl border p-6 ${result.category.bg}`}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Body Fat</div>
                <div className={`text-4xl font-bold ${result.category.color}`}>{result.bf}%</div>
                <div className={`text-sm font-medium mt-1 ${result.category.color}`}>{result.category.label}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Fat Mass</div>
                <div className="text-3xl font-bold text-foreground">{result.fatLbs}</div>
                <div className="text-sm text-muted-foreground">lbs</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Lean Mass</div>
                <div className="text-3xl font-bold text-foreground">{result.leanLbs}</div>
                <div className="text-sm text-muted-foreground">lbs</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted/40 rounded-lg text-sm text-muted-foreground">
            <strong>Measurement tips:</strong> Measure waist at the level of your navel, relaxed (not sucked in). Measure neck just below the larynx, slightly downward. For hips, measure at the widest point. All measurements without clothing. Measure to the nearest 0.5 inch or 1 cm.
          </div>
        </div>

        <AdUnit slot={AD_SLOTS.calculatorBelowTool} format="horizontal" />

        <article className="prose prose-slate max-w-none">
          <h2>Body Fat Percentage vs. BMI: Why Composition Matters More After 50</h2>
          <p>
            If you've used a BMI calculator and wondered whether the number tells the full story, your instinct is correct — especially after the age of 50. Body fat percentage offers something that BMI cannot: a direct measure of how much of your body mass is fat tissue versus lean tissue (muscle, bone, organs, and water).
          </p>
          <p>
            This distinction becomes critical after 50 because of sarcopenia — the age-related loss of muscle mass that occurs even in people whose scale weight is unchanged. As muscle is lost and replaced by fat (a process called sarcopenic obesity), body composition worsens while BMI stays constant. A 60-year-old with a "normal" BMI of 23 may actually have 35 percent body fat if they have low muscle mass — a body composition associated with higher metabolic risk than a heavier person with substantially more muscle.
          </p>

          <h3>Healthy Body Fat Ranges for Adults Over 50</h3>
          <p>
            Body fat percentage standards are more nuanced than the simplified categories sometimes presented. For adults over 50, slightly higher body fat percentages are generally considered acceptable compared to younger adults, because some increase in fat mass is a normal feature of aging and because very low body fat in older adults can be associated with nutritional insufficiency.
          </p>
          <p>
            For adult <strong>men over 50</strong>, body fat in the range of 18 to 25 percent is generally considered acceptable and associated with good health outcomes. Below 8 percent is essential fat only — not a health target. Above 30 percent is associated with increased metabolic risk.
          </p>
          <p>
            For adult <strong>women over 50</strong>, body fat in the range of 25 to 35 percent is broadly acceptable. Women naturally carry higher body fat percentages than men of comparable fitness, partly due to reproductive physiology. Below 14 percent represents essential fat only. Above 40 percent is associated with elevated risk.
          </p>

          <h3>Where Fat is Located Matters as Much as How Much</h3>
          <p>
            Not all body fat carries the same health implications. Subcutaneous fat — fat stored beneath the skin — is relatively metabolically benign. Visceral fat — fat stored within the abdominal cavity surrounding the organs — is metabolically active in harmful ways, producing inflammatory cytokines and interfering with insulin signaling.
          </p>
          <p>
            After 50, and particularly after menopause in women, fat distribution tends to shift toward visceral accumulation. This is why waist circumference — a proxy for visceral fat — is often considered a more actionable health measure than total body fat percentage. A waist circumference above 35 inches in women or 40 inches in men signals elevated visceral fat accumulation, regardless of total body weight.
          </p>

          <AdUnit slot={AD_SLOTS.calculatorMidArticle} format="rectangle" />

          <h3>Practical Strategies to Improve Body Composition</h3>
          <p>
            Improving body composition after 50 means decreasing fat mass while maintaining or increasing lean mass — two goals that require somewhat different approaches and cannot both be achieved through calorie restriction alone.
          </p>
          <p>
            <strong>Resistance training</strong> is the cornerstone intervention for body composition in older adults. Building and maintaining muscle requires mechanical loading — there is no dietary substitute. Two to three resistance training sessions per week, progressively increasing in difficulty, produces measurable improvements in lean mass and reductions in body fat percentage even in adults in their 70s and 80s.
          </p>
          <p>
            <strong>Adequate dietary protein</strong>, distributed across meals, provides the amino acid building blocks for muscle protein synthesis. Without sufficient protein, resistance training still burns calories but produces less muscle growth.
          </p>
          <p>
            <strong>Modest calorie deficit</strong>, if fat loss is a goal, should be achieved gradually — 200 to 400 calories below maintenance — to minimize the muscle loss that accompanies aggressive calorie restriction. Very low-calorie diets in older adults preferentially sacrifice lean mass along with fat, worsening body composition even as scale weight falls.
          </p>
        </article>

        <p className="mt-10 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 border border-border">
          <strong>Disclaimer:</strong> The U.S. Navy Method provides an estimate only; accuracy varies by individual. DEXA scan is the gold standard for body composition measurement. Results are for educational purposes and not medical advice.
        </p>
      </div>
    </Layout>
  );
}
