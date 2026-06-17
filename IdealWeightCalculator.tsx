import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";
import AdUnit from "@/components/AdUnit";
import { AD_SLOTS } from "@/config/adsense";

type Sex = "male" | "female";
type Frame = "small" | "medium" | "large";

const frameAdjustments: Record<Frame, number> = { small: -0.10, medium: 0, large: 0.10 };

function calcIdealWeight(sex: Sex, heightFt: number, heightIn: number, frame: Frame) {
  const totalIn = heightFt * 12 + heightIn;
  const inchesOver5Ft = totalIn - 60;

  const hamwi = sex === "male" ? 48 + 2.7 * inchesOver5Ft : 45.5 + 2.2 * inchesOver5Ft;
  const devine = sex === "male" ? 50 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;
  const robinson = sex === "male" ? 52 + 1.9 * inchesOver5Ft : 49 + 1.7 * inchesOver5Ft;
  const miller = sex === "male" ? 56.2 + 1.41 * inchesOver5Ft : 53.1 + 1.36 * inchesOver5Ft;

  const adj = 1 + frameAdjustments[frame];
  const kgValues = [hamwi, devine, robinson, miller].map((v) => v * adj);
  const lbValues = kgValues.map((v) => Math.round(v * 2.2046));
  const minLbs = Math.min(...lbValues);
  const maxLbs = Math.max(...lbValues);

  return {
    hamwi: { kg: Math.round(hamwi * adj), lbs: Math.round(hamwi * adj * 2.2046) },
    devine: { kg: Math.round(devine * adj), lbs: Math.round(devine * adj * 2.2046) },
    robinson: { kg: Math.round(robinson * adj), lbs: Math.round(robinson * adj * 2.2046) },
    miller: { kg: Math.round(miller * adj), lbs: Math.round(miller * adj * 2.2046) },
    minLbs,
    maxLbs,
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ideal Weight Calculator for Adults 50+",
  "url": "https://www.vitalage.com/ideal-weight-calculator",
  "description": "Find your healthy weight range using four evidence-based formulas with interpretation guidance for adults over 50.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web"
};

export default function IdealWeightCalculator() {
  const [sex, setSex] = useState<Sex>("female");
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(4);
  const [frame, setFrame] = useState<Frame>("medium");

  const result = useMemo(() => calcIdealWeight(sex, heightFt, heightIn, frame), [sex, heightFt, heightIn, frame]);

  const formulas = [
    { name: "Hamwi Formula", values: result.hamwi, description: "Traditional clinical formula widely used in medical settings" },
    { name: "Devine Formula", values: result.devine, description: "Commonly used in pharmacology for drug dosing calculations" },
    { name: "Robinson Formula", values: result.robinson, description: "Modification of Devine with slightly lower estimates" },
    { name: "Miller Formula", values: result.miller, description: "Produces the highest estimates of the four formulas" },
  ];

  return (
    <Layout>
      <PageMeta
        title="Ideal Weight Calculator for Adults 50+ — Healthy Weight Range | VitalAge"
        description="Find your ideal weight range using multiple evidence-based formulas. Understand what healthy weight means for adults over 50 and how to interpret the results."
        canonical="https://www.vitalage.com/ideal-weight-calculator"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-2"><a href="/" className="hover:text-primary">Home</a> › Ideal Weight Calculator</div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Ideal Weight Calculator for Adults 50+</h1>
          <p className="text-lg text-muted-foreground">See your healthy weight range from four established formulas — with context for why "ideal weight" means something different after 50.</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-10">
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
              <label className="block text-sm font-medium mb-2">Height</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <select value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none">
                    {[4, 5, 6, 7].map((f) => <option key={f} value={f}>{f} ft</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <select value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none">
                    {Array.from({ length: 12 }).map((_, i) => <option key={i} value={i}>{i} in</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Body Frame Size</label>
              <div className="grid grid-cols-3 gap-3">
                {(["small", "medium", "large"] as Frame[]).map((f) => (
                  <button key={f} onClick={() => setFrame(f)} className={`py-3 rounded-lg text-sm border capitalize font-medium ${frame === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}>
                    <div>{f === "small" ? "Small" : f === "medium" ? "Medium" : "Large"}</div>
                    <div className={`text-xs mt-1 ${frame === f ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{f === "small" ? "Narrow wrists/hips" : f === "medium" ? "Average build" : "Wide wrists/shoulders"}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-primary/10 rounded-xl border border-primary/20 p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-sm text-muted-foreground mb-2">Your Healthy Weight Range</div>
              <div className="text-4xl font-bold text-primary" data-testid="text-ideal-weight-range">
                {result.minLbs} – {result.maxLbs} lbs
              </div>
              <div className="text-muted-foreground mt-1">
                ({Math.round(result.minLbs * 0.453592)} – {Math.round(result.maxLbs * 0.453592)} kg)
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {formulas.map((f) => (
              <div key={f.name} className="border border-border rounded-lg p-4">
                <div className="font-semibold text-sm text-foreground mb-1">{f.name}</div>
                <div className="text-2xl font-bold text-primary">{f.values.lbs} lbs</div>
                <div className="text-sm text-muted-foreground">{f.values.kg} kg</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{f.description}</div>
              </div>
            ))}
          </div>
        </div>

        <AdUnit slot={AD_SLOTS.calculatorBelowTool} format="horizontal" />

        <article className="prose prose-slate max-w-none">
          <h2>Why "Ideal Weight" Is More Complicated After 50</h2>
          <p>
            The concept of an "ideal body weight" originated not in nutrition science but in the life insurance industry of the early 20th century. Insurance actuaries, seeking to price premiums based on mortality risk, found that height and weight data could predict longevity in large populations. The formulas we still use today — Hamwi, Devine, Robinson, and Miller — were developed primarily for clinical applications like drug dosing calculations, not as individual health targets.
          </p>
          <p>
            For adults over 50, these historical benchmarks carry even more limitations than they do for younger adults, for several important reasons.
          </p>

          <h3>Muscle Mass Changes the Equation</h3>
          <p>
            Ideal weight formulas assume a relatively consistent relationship between height, weight, and body composition. But the same scale weight can represent dramatically different body compositions depending on how much muscle versus fat tissue is present.
          </p>
          <p>
            A 60-year-old woman at "ideal weight" by the Hamwi formula may have maintained that weight over decades while her body composition shifted — losing muscle and gaining fat through the normal processes of aging — leaving her at a weight within range but with a body composition that carries meaningful health risk. Conversely, a physically active older adult who has maintained or built substantial muscle mass may exceed the "ideal" range while being genuinely healthier than a same-height, lighter peer with low muscle mass.
          </p>

          <AdUnit slot={AD_SLOTS.calculatorMidArticle} format="rectangle" />

          <h3>The Older Adult Evidence on Weight and Mortality</h3>
          <p>
            Perhaps most importantly for adults 50 and over: the research on weight and mortality outcomes in older adults does not uniformly support lower weights as healthier. Multiple meta-analyses of mortality data in adults 65 and older have found that those in the "overweight" BMI category (25 to 30) often have equal or slightly better survival than those in the "normal" range — a finding sometimes called the "obesity paradox."
          </p>
          <p>
            The explanations are debated, but one contributing factor is that body weight in older adults may partly reflect preserved muscle mass and nutritional adequacy — both of which are independently protective against mortality. Very low body weight in an older adult often signals poor nutritional status, muscle wasting, or underlying disease — none of which are addressed by simply chasing a lower scale number.
          </p>

          <h3>More Meaningful Targets Than Scale Weight</h3>
          <p>
            Rather than focusing on hitting an ideal weight number, adults over 50 are better served by monitoring targets that more directly predict function and disease risk:
          </p>
          <ul>
            <li><strong>Waist circumference:</strong> Below 35 inches for women, 40 inches for men indicates lower visceral fat accumulation</li>
            <li><strong>Muscle mass/strength:</strong> Can be tracked with grip strength tests, chair stand tests, or DEXA body composition scans</li>
            <li><strong>Metabolic markers:</strong> Fasting glucose, HbA1c, blood pressure, and lipid panels are actionable health indicators</li>
            <li><strong>Functional capacity:</strong> Can you do what you want to do physically? Walk without pain, climb stairs, carry groceries?</li>
          </ul>
          <p>
            The range shown by these four formulas can serve as a useful starting reference — if your weight is substantially above the maximum, it may be worth discussing with a physician. But for many adults over 50, the more productive focus is on improving body composition through resistance training and protein intake rather than on the number shown by any formula.
          </p>
        </article>

        <p className="mt-10 text-xs text-muted-foreground bg-muted/40 rounded-lg p-4 border border-border">
          <strong>Disclaimer:</strong> Ideal weight formulas are population-based estimates not intended as individual health targets, particularly for adults over 50. Body composition, waist circumference, and metabolic health markers are more informative than scale weight. Consult your physician for personalized guidance.
        </p>
      </div>
    </Layout>
  );
}
