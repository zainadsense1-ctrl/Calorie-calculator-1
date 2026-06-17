import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

type Sex = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Goal = "maintain" | "lose" | "muscle" | "energy";
type Unit = "imperial" | "metric";

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9
};

const goals: Record<Goal, { label: string; proteinPct: number; carbPct: number; fatPct: number; adjustment: number }> = {
  maintain: { label: "Maintain Weight", proteinPct: 0.30, carbPct: 0.40, fatPct: 0.30, adjustment: 0 },
  lose: { label: "Lose Weight", proteinPct: 0.35, carbPct: 0.35, fatPct: 0.30, adjustment: -400 },
  muscle: { label: "Gain Muscle", proteinPct: 0.35, carbPct: 0.45, fatPct: 0.20, adjustment: 200 },
  energy: { label: "Improve Energy", proteinPct: 0.25, carbPct: 0.50, fatPct: 0.25, adjustment: 0 },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Macro Calculator for Adults 50+",
  "url": "https://www.vitalage.com/macro-calculator",
  "description": "Calculate your ideal protein, carbohydrate, and fat targets based on your body stats and goals.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
};

export default function MacroCalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState(58);
  const [weightLbs, setWeightLbs] = useState(155);
  const [weightKg, setWeightKg] = useState(70);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(4);
  const [heightCm, setHeightCm] = useState(163);
  const [activity, setActivity] = useState<ActivityLevel>("light");
  const [goal, setGoal] = useState<Goal>("maintain");

  const result = useMemo(() => {
    const wKg = unit === "imperial" ? weightLbs * 0.453592 : weightKg;
    const hCm = unit === "imperial" ? (heightFt * 12 + heightIn) * 2.54 : heightCm;
    const bmr = sex === "male"
      ? 10 * wKg + 6.25 * hCm - 5 * age + 5
      : 10 * wKg + 6.25 * hCm - 5 * age - 161;
    const tdee = bmr * activityMultipliers[activity];
    const g = goals[goal];
    const targetCals = Math.round(tdee + g.adjustment);
    const protein = Math.round((targetCals * g.proteinPct) / 4);
    const carbs = Math.round((targetCals * g.carbPct) / 4);
    const fat = Math.round((targetCals * g.fatPct) / 9);
    return { tdee: Math.round(tdee), targetCals, protein, carbs, fat, proteinPct: g.proteinPct, carbPct: g.carbPct, fatPct: g.fatPct };
  }, [unit, sex, age, weightLbs, weightKg, heightFt, heightIn, heightCm, activity, goal]);

  const barSegments = [
    { label: "Protein", pct: result.proteinPct, grams: result.protein, color: "bg-blue-500" },
    { label: "Carbs", pct: result.carbPct, grams: result.carbs, color: "bg-amber-500" },
    { label: "Fat", pct: result.fatPct, grams: result.fat, color: "bg-rose-400" },
  ];

  return (
    <Layout>
      <PageMeta
        title="Macro Calculator for Adults 50+ — Protein, Carbs & Fat | VitalAge"
        description="Find your ideal protein, carbohydrate, and fat targets with our macro calculator. Optimized recommendations for adults over 50 focused on muscle maintenance and healthy aging."
        canonical="https://www.vitalage.com/macro-calculator"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary">Home</a> › Macro Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Macro Calculator for Adults 50+</h1>
          <p className="text-lg text-muted-foreground">
            Discover your ideal daily protein, carbohydrate, and fat targets — with recommendations tuned for healthy aging, not generic guidelines.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10">
          <div className="flex gap-2 mb-6">
            {(["imperial", "metric"] as Unit[]).map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === u ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>
                {u === "imperial" ? "Imperial (lbs/ft)" : "Metric (kg/cm)"}
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
            <div>
              <label className="block text-sm font-medium mb-2">Age: {age} years</label>
              <input type="range" min={40} max={90} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-primary" />
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
            {unit === "imperial" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <div className="flex gap-3">
                  <div className="flex-1"><input type="number" min={4} max={7} value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ft" /><span className="text-xs text-muted-foreground">feet</span></div>
                  <div className="flex-1"><input type="number" min={0} max={11} value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="in" /><span className="text-xs text-muted-foreground">inches</span></div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input type="number" min={130} max={220} value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Activity Level</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityLevel)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="sedentary">Sedentary (desk job, no exercise)</option>
                <option value="light">Lightly Active (1–3 days/week)</option>
                <option value="moderate">Moderately Active (3–5 days/week)</option>
                <option value="active">Very Active (6–7 days/week)</option>
                <option value="very_active">Extra Active (daily + physical job)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Goal</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(goals) as [Goal, typeof goals[Goal]][]).map(([key, g]) => (
                  <button key={key} onClick={() => setGoal(key)} className={`py-2 px-3 rounded-lg text-sm border transition-colors text-left ${goal === key ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>{g.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">{result.targetCals.toLocaleString()}</span>
              <span className="text-muted-foreground">calories/day for <strong>{goals[goal].label.toLowerCase()}</strong></span>
            </div>

            {/* Macro bar */}
            <div className="h-4 rounded-full overflow-hidden flex mb-3">
              {barSegments.map((seg) => (
                <div key={seg.label} className={`${seg.color} h-full`} style={{ width: `${seg.pct * 100}%` }} />
              ))}
            </div>
            <div className="flex gap-4 mb-6 text-sm">
              {barSegments.map((seg) => (
                <div key={seg.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${seg.color}`} />
                  <span className="text-muted-foreground">{seg.label}: <strong className="text-foreground">{Math.round(seg.pct * 100)}%</strong></span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{result.protein}g</div>
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Protein</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">{Math.round(result.targetCals * result.proteinPct)} cal</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-center border border-amber-200 dark:border-amber-800">
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{result.carbs}g</div>
                <div className="text-sm font-medium text-amber-800 dark:text-amber-200">Carbs</div>
                <div className="text-xs text-amber-600 dark:text-amber-400">{Math.round(result.targetCals * result.carbPct)} cal</div>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4 text-center border border-rose-200 dark:border-rose-800">
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-300">{result.fat}g</div>
                <div className="text-sm font-medium text-rose-700 dark:text-rose-200">Fat</div>
                <div className="text-xs text-rose-600 dark:text-rose-400">{Math.round(result.targetCals * result.fatPct)} cal</div>
              </div>
            </div>
          </div>
        </div>

        <AdUnit slot={AD_SLOTS.calculatorBelowTool} format="horizontal" />

        {/* Educational Content */}
        <article className="prose prose-slate max-w-none">
          <h2>Why Macronutrient Targets Matter More After 50</h2>
          <p>
            Not all calories are created equal — a fact that becomes particularly relevant after the age of 50. While total calorie intake determines whether you gain, lose, or maintain weight, the distribution of those calories among protein, carbohydrates, and fat profoundly affects your body composition, energy levels, hormonal balance, and long-term health.
          </p>

          <h3>Protein: The Priority Macronutrient After 50</h3>
          <p>
            Among the three macronutrients, protein deserves the most attention after 50. Skeletal muscle — the tissue protein maintains — is not merely cosmetic. It is the primary driver of your resting metabolic rate, the tissue that regulates blood glucose, and the physical reserve that determines your functional independence as you age.
          </p>
          <p>
            After 50, the body becomes progressively less efficient at triggering muscle protein synthesis in response to dietary protein — a phenomenon called anabolic resistance. To overcome this reduced efficiency, older adults need significantly more protein than the 0.8 grams per kilogram of body weight that has been the standard recommendation. Research in gerontology and nutrition science now consistently supports 1.2 to 1.6 grams per kilogram for active adults 50 and older.
          </p>
          <p>
            Beyond total quantity, timing and distribution matter. Spreading protein across three or four meals — aiming for 25 to 35 grams per meal — is more effective at stimulating muscle protein synthesis than consuming the same total in one or two large servings. This is because of the leucine threshold: each meal needs to contain sufficient leucine (an essential amino acid that triggers the muscle-building process) to activate anabolic signaling.
          </p>

          <AdUnit slot={AD_SLOTS.calculatorMidArticle} format="rectangle" />

          <h3>Carbohydrates: Quality Over Restriction</h3>
          <p>
            Carbohydrates have developed an undeservedly negative reputation in popular nutrition culture. For adults over 50, carbohydrates serve essential roles: they are the preferred fuel for the brain and central nervous system, they power physical activity, they support thyroid function, and they provide the dietary fiber that feeds a healthy gut microbiome.
          </p>
          <p>
            The research strongly favors carbohydrate quality over carbohydrate quantity. Whole food carbohydrates — vegetables, fruits, legumes, and whole grains — come packaged with fiber, micronutrients, and phytochemicals that refined carbohydrates lack. Replacing refined carbohydrates with whole food sources is consistently associated with better metabolic outcomes without the cognitive, energy, and hormonal costs that accompany very low-carbohydrate diets in older adults.
          </p>

          <h3>Dietary Fat: Essential, Not Optional</h3>
          <p>
            Dietary fat is indispensable for hormone production, fat-soluble vitamin absorption, cell membrane integrity, and brain health — all processes that become more consequential with age. The goal is not to minimize fat but to emphasize the right types.
          </p>
          <p>
            Monounsaturated fats from olive oil, avocados, and many nuts are associated with cardiovascular protection and anti-inflammatory effects. Omega-3 polyunsaturated fats from fatty fish, flaxseed, and walnuts support brain health and reduce systemic inflammation. Saturated fats from whole food sources (dairy, eggs, unprocessed meat) are appropriate in moderate quantities. Trans fats from partially hydrogenated oils — now largely removed from food supplies but still present in some processed foods — remain the one fat category to genuinely avoid.
          </p>
        </article>

        <p className="mt-10 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 border border-border">
          <strong>Disclaimer:</strong> Macro targets are estimates based on population research and are not personalized medical or dietary advice. Individual needs vary significantly based on health conditions, medications, and other factors. Consult a registered dietitian for personalized guidance.
        </p>
      </div>
    </Layout>
  );
}
