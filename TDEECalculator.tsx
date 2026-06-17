import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

type Sex = "male" | "female";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Unit = "imperial" | "metric";

const activityLabels: Record<ActivityLevel, { label: string; description: string; multiplier: number }> = {
  sedentary: { label: "Sedentary", description: "Little or no exercise, desk job", multiplier: 1.2 },
  light: { label: "Lightly Active", description: "Light exercise 1–3 days/week", multiplier: 1.375 },
  moderate: { label: "Moderately Active", description: "Moderate exercise 3–5 days/week", multiplier: 1.55 },
  active: { label: "Very Active", description: "Hard exercise 6–7 days/week", multiplier: 1.725 },
  very_active: { label: "Extra Active", description: "Hard exercise daily, physical job", multiplier: 1.9 },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TDEE Calculator for Adults 50+",
  "url": "https://www.vitalage.com/tdee-calculator",
  "description": "Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor equation, optimized for adults over 50.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Does TDEE change after 50?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Metabolism slows gradually with age due to muscle loss (sarcopenia) and hormonal changes. After 50, most adults experience a 1–2% per decade decrease in resting metabolic rate beyond what weight changes alone would explain. This is why calorie needs calculated for a 30-year-old are often too high when applied to adults over 50." } },
    { "@type": "Question", "name": "Which activity level should I choose?", "acceptedAnswer": { "@type": "Answer", "text": "Choose the level that matches your average week, not your best week. Sedentary means a desk job with minimal walking. Lightly active includes 1–3 intentional exercise sessions per week. Moderately active means consistent exercise 3–5 days per week. Most adults over 50 overestimate their activity level — when in doubt, choose one level lower than you think." } },
    { "@type": "Question", "name": "Should I eat at my full TDEE to lose weight?", "acceptedAnswer": { "@type": "Answer", "text": "No. Your TDEE represents maintenance — the calories needed to stay at your current weight. To lose weight, create a modest calorie deficit by eating 250–500 calories below your TDEE. For adults over 50, a smaller deficit (250 cal/day) is often more sustainable and preserves more muscle mass than aggressive restriction." } },
    { "@type": "Question", "name": "How often should I recalculate my TDEE?", "acceptedAnswer": { "@type": "Answer", "text": "Recalculate every 3–6 months, or whenever your weight changes by 10 or more pounds, or when your activity level changes significantly. As your weight changes, your TDEE changes too — the calculator needs updated inputs to remain accurate." } }
  ]
};

export default function TDEECalculator() {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [sex, setSex] = useState<Sex>("female");
  const [age, setAge] = useState(58);
  const [weightLbs, setWeightLbs] = useState(155);
  const [weightKg, setWeightKg] = useState(70);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(4);
  const [heightCm, setHeightCm] = useState(163);
  const [activity, setActivity] = useState<ActivityLevel>("light");

  const result = useMemo(() => {
    const wKg = unit === "imperial" ? weightLbs * 0.453592 : weightKg;
    const hCm = unit === "imperial" ? (heightFt * 12 + heightIn) * 2.54 : heightCm;
    const bmr = sex === "male"
      ? 10 * wKg + 6.25 * hCm - 5 * age + 5
      : 10 * wKg + 6.25 * hCm - 5 * age - 161;
    const tdee = bmr * activityLabels[activity].multiplier;
    return { bmr: Math.round(bmr), tdee: Math.round(tdee) };
  }, [unit, sex, age, weightLbs, weightKg, heightFt, heightIn, heightCm, activity]);

  return (
    <Layout>
      <PageMeta
        title="TDEE Calculator for Adults 50+ — Daily Calorie Needs | VitalAge"
        description="Calculate your Total Daily Energy Expenditure with our free TDEE calculator designed for adults over 50. Get accurate calorie targets based on age, weight, height, and activity level."
        canonical="https://www.vitalage.com/tdee-calculator"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary">Home</a> › TDEE Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">TDEE Calculator for Adults 50+</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Total Daily Energy Expenditure using the Mifflin-St Jeor equation — the most accurate formula for adults over 50.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10">
          {/* Unit Toggle */}
          <div className="flex gap-2 mb-6">
            {(["imperial", "metric"] as Unit[]).map((u) => (
              <button
                key={u}
                data-testid={`button-unit-${u}`}
                onClick={() => setUnit(u)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${unit === u ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
              >
                {u === "imperial" ? "Imperial (lbs/ft)" : "Metric (kg/cm)"}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sex */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Biological Sex</label>
              <div className="flex gap-2">
                {(["female", "male"] as Sex[]).map((s) => (
                  <button
                    key={s}
                    data-testid={`button-sex-${s}`}
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors capitalize ${sex === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">Age: {age} years</label>
              <input
                id="age"
                data-testid="input-age"
                type="range"
                min={40}
                max={90}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>40</span><span>90</span></div>
            </div>

            {/* Weight */}
            {unit === "imperial" ? (
              <div>
                <label htmlFor="weight-lbs" className="block text-sm font-medium text-foreground mb-2">Weight (lbs)</label>
                <input
                  id="weight-lbs"
                  data-testid="input-weight-lbs"
                  type="number"
                  min={80}
                  max={400}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="weight-kg" className="block text-sm font-medium text-foreground mb-2">Weight (kg)</label>
                <input
                  id="weight-kg"
                  data-testid="input-weight-kg"
                  type="number"
                  min={35}
                  max={180}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            )}

            {/* Height */}
            {unit === "imperial" ? (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Height</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      data-testid="input-height-ft"
                      type="number"
                      min={4}
                      max={7}
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="ft"
                    />
                    <span className="text-xs text-muted-foreground">feet</span>
                  </div>
                  <div className="flex-1">
                    <input
                      data-testid="input-height-in"
                      type="number"
                      min={0}
                      max={11}
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="in"
                    />
                    <span className="text-xs text-muted-foreground">inches</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="height-cm" className="block text-sm font-medium text-foreground mb-2">Height (cm)</label>
                <input
                  id="height-cm"
                  data-testid="input-height-cm"
                  type="number"
                  min={130}
                  max={220}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            )}

            {/* Activity */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Activity Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {(Object.entries(activityLabels) as [ActivityLevel, typeof activityLabels[ActivityLevel]][]).map(([key, val]) => (
                  <button
                    key={key}
                    data-testid={`button-activity-${key}`}
                    onClick={() => setActivity(key)}
                    className={`p-3 rounded-lg text-xs border transition-colors text-left ${activity === key ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
                  >
                    <div className="font-semibold mb-0.5">{val.label}</div>
                    <div className={activity === key ? "text-primary-foreground/80" : "text-muted-foreground"}>{val.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 pt-8 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Results</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Basal Metabolic Rate (BMR)</div>
                <div className="text-3xl font-bold text-foreground" data-testid="text-bmr">{result.bmr.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">calories/day at rest</div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <div className="text-sm text-muted-foreground mb-1">Total Daily Energy Expenditure (TDEE)</div>
                <div className="text-3xl font-bold text-primary" data-testid="text-tdee">{result.tdee.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">calories/day to maintain weight</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Mild Weight Loss</div>
                <div className="text-xl font-bold text-blue-800 dark:text-blue-200">{(result.tdee - 250).toLocaleString()} cal</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">−250 cal/day (~0.5 lb/week)</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <div className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-1">Weight Loss</div>
                <div className="text-xl font-bold text-orange-800 dark:text-orange-200">{(result.tdee - 500).toLocaleString()} cal</div>
                <div className="text-xs text-orange-600 dark:text-orange-400">−500 cal/day (~1 lb/week)</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Weight Gain</div>
                <div className="text-xl font-bold text-green-800 dark:text-green-200">{(result.tdee + 250).toLocaleString()} cal</div>
                <div className="text-xs text-green-600 dark:text-green-400">+250 cal/day (~0.5 lb/week)</div>
              </div>
            </div>
          </div>
        </div>

        <AdUnit slot={AD_SLOTS.calculatorBelowTool} format="horizontal" />

        {/* Educational Content */}
        <article className="prose prose-slate max-w-none">
          <h2>Understanding TDEE for Adults Over 50</h2>
          <p>
            Your Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period, accounting for your resting metabolism, the energy cost of physical activity, and the calories burned digesting food. Understanding your TDEE is the foundational step toward any intelligent nutrition plan — whether your goal is weight loss, maintenance, or building muscle.
          </p>
          <p>
            For adults over 50, accurate TDEE calculation is particularly important because the standard formulas taught in most nutrition courses — particularly the Harris-Benedict equation developed in 1919 — are known to overestimate calorie needs in older adults. The Mifflin-St Jeor equation, which this calculator uses, was developed in 1990 with a more diverse study population and has been validated as the most accurate predictive equation for resting metabolic rate in adults 50 and older.
          </p>

          <h3>Why Metabolism Slows After 50</h3>
          <p>
            The slowing of metabolism with age is real, though its causes are more nuanced than the simple "age slows metabolism" explanation you've probably heard. Several interconnected mechanisms drive this change:
          </p>
          <p>
            <strong>Sarcopenia</strong> — the age-related loss of skeletal muscle mass — is the primary driver of metabolic slowdown after 50. Muscle tissue is metabolically expensive to maintain, burning significantly more calories at rest than fat tissue. As muscle is lost, resting metabolic rate (BMR) falls accordingly. Estimates suggest that BMR declines approximately 1 to 2 percent per decade in adults who are not actively maintaining muscle through resistance exercise.
          </p>
          <p>
            <strong>Hormonal changes</strong> compound this effect. In women, the decline in estrogen during menopause is associated with changes in fat distribution (more visceral fat), reduced muscle protein synthesis efficiency, and lower resting metabolic rate. In men, testosterone levels decline gradually from the late 30s onward, and lower testosterone is associated with reduced muscle mass and increased body fat.
          </p>
          <p>
            <strong>Reduced physical activity</strong> — often unconscious reductions in non-exercise movement (fidgeting, walking, standing) rather than just formal exercise — contributes meaningfully to lower total energy expenditure in older adults.
          </p>

          <AdUnit slot={AD_SLOTS.calculatorMidArticle} format="rectangle" />

          <h3>How to Use Your TDEE Effectively</h3>
          <p>
            Your TDEE is your starting point, not a prescription. Here's how to translate it into practical nutrition strategy:
          </p>
          <p>
            <strong>For weight maintenance:</strong> Eat approximately at your TDEE. In practice, this means tracking intake loosely for a few weeks to calibrate your sense of how much food equals your calorie target, then managing by feel once you've developed that calibration.
          </p>
          <p>
            <strong>For weight loss:</strong> Create a modest deficit below your TDEE. For adults over 50, a deficit of 250 to 350 calories per day is generally preferable to the 500-calorie deficits often recommended, because smaller deficits are less likely to trigger significant muscle loss and metabolic adaptation. Slower loss that preserves muscle produces better body composition outcomes than faster loss that sacrifices it.
          </p>
          <p>
            <strong>For muscle gain:</strong> A small surplus of 150 to 250 calories above TDEE, combined with consistent resistance training and high protein intake, supports muscle growth without excessive fat accumulation.
          </p>

          <h3>The Protein Imperative After 50</h3>
          <p>
            Whatever calorie level you target, protein intake deserves special attention. Adults over 50 experience "anabolic resistance" — a reduced efficiency of muscle protein synthesis in response to dietary protein — meaning you need more protein per pound of body weight than a younger person to achieve the same muscle-maintaining effect.
          </p>
          <p>
            Current evidence suggests adults over 50 should aim for 1.2 to 1.6 grams of protein per kilogram of body weight daily. At a TDEE of 1,800 calories, for a 150-pound (68 kg) person, this means 82 to 109 grams of protein per day — accounting for roughly 18 to 24 percent of total calories, substantially higher than typical Western diets provide.
          </p>

          <h3>Practical Tips for Managing Calorie Intake After 50</h3>
          <ul>
            <li><strong>Don't crash diet.</strong> Aggressive calorie restriction (below 1,200 calories for women, 1,500 for men) accelerates muscle loss and triggers metabolic adaptation, making long-term weight management harder. Eat enough to support lean mass preservation.</li>
            <li><strong>Recalculate regularly.</strong> As your weight changes, your TDEE changes. A 10-pound weight loss typically reduces TDEE by 50 to 100 calories — if you don't adjust, a deficit becomes maintenance and progress stalls.</li>
            <li><strong>Prioritize sleep.</strong> Sleep deprivation disrupts hunger hormones (ghrelin and leptin) in ways that undermine appetite control regardless of how accurately you've calculated your TDEE.</li>
            <li><strong>Don't eat less than your BMR.</strong> Your BMR is the minimum number of calories your body needs for essential functions. Eating less than your BMR consistently leads to muscle loss, nutrient deficiencies, and hormonal disruption.</li>
            <li><strong>Build muscle to raise TDEE.</strong> The most sustainable long-term approach to a higher calorie budget is increasing muscle mass through resistance training — each pound of muscle raises your resting metabolic rate slightly, compounding over time.</li>
          </ul>

          <h3>When Calculator Results Don't Match Your Reality</h3>
          <p>
            If you're consistently eating at your calculated TDEE but gaining weight, or eating in a calculated deficit without losing weight, the calculator may not be capturing your individual metabolism accurately. Predictive equations are based on population averages, and individual variation is substantial — your actual TDEE may be 10 to 15 percent above or below the prediction.
          </p>
          <p>
            In this case, track your actual calorie intake alongside weight changes for two to three weeks to determine your empirical TDEE — the intake at which your weight is stable. Use this real-world number rather than the calculator prediction going forward.
          </p>
        </article>

        {/* FAQ */}
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
          <strong>Disclaimer:</strong> This calculator provides estimates based on population averages using the Mifflin-St Jeor equation. Individual results will vary. The information provided is for educational purposes only and is not a substitute for personalized advice from a registered dietitian or physician. Always consult a healthcare professional before making significant changes to your diet.
        </p>
      </div>
    </Layout>
  );
}
