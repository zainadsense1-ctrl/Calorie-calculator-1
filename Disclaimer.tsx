import Layout from "@/components/Layout";
import { PageMeta } from "@/hooks/usePageMeta";

export default function Disclaimer() {
  return (
    <Layout>
      <PageMeta
        title="Health Disclaimer | VitalAge"
        description="VitalAge Health Disclaimer — important information about the educational nature of our content and calculators. Not medical advice. Always consult your physician."
        canonical="https://www.vitalage.com/disclaimer"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a> › Health Disclaimer
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Health Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: October 14, 2025</p>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 mb-8">
          <p className="text-amber-800 dark:text-amber-200 font-medium">
            <strong>Important:</strong> The information and tools on VitalAge are for educational purposes only. They are not medical advice and are not a substitute for professional medical consultation. Always consult your physician or a qualified healthcare provider before making changes to your diet, exercise routine, or other health practices.
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2>Not Medical Advice</h2>
          <p>
            VitalAge provides health-related calculators, educational articles, and general nutrition and fitness information (collectively, "Health Information") for informational and educational purposes only. The Health Information on this Site does not constitute, and should not be construed as, medical advice, medical diagnosis, medical treatment, or any form of professional healthcare guidance.
          </p>
          <p>
            The content on VitalAge is not intended to replace professional medical advice, diagnosis, or treatment. No information presented on this Site should be used as a basis for disregarding the advice of a qualified physician, registered dietitian, or other licensed healthcare provider, or for delaying seeking professional medical attention.
          </p>

          <h2>Individual Results Vary</h2>
          <p>
            The calculators on VitalAge produce estimates derived from mathematical formulas developed through population research. These formulas represent statistical averages across large groups of people and cannot account for the full complexity of any individual's physiology, health history, medications, or circumstances.
          </p>
          <p>
            Two people who enter identical inputs into the same calculator may have substantially different actual metabolic rates, body composition characteristics, or nutritional needs in real life. Calculator results are starting points for self-education and informed discussion with healthcare professionals — not personal recommendations or prescriptions.
          </p>
          <p>
            Factors that affect individual variation include but are not limited to: genetic differences in metabolism, hormonal conditions and medications, thyroid function, chronic health conditions, recent weight changes, surgical history, and current medications.
          </p>

          <h2>Calculator Accuracy Limitations</h2>
          <p>
            Each calculator on VitalAge uses the best available validated formulas for the specific measurement. However:
          </p>
          <ul>
            <li>The <strong>TDEE Calculator</strong> uses the Mifflin-St Jeor equation, which predicts resting metabolic rate with an error margin of approximately ±10% in most adults. Metabolic conditions, medications, and extreme body compositions can produce larger deviations.</li>
            <li>The <strong>BMI Calculator</strong> uses a formula that does not account for muscle mass, bone density, fat distribution, age-related body composition changes, or other factors relevant to individual health.</li>
            <li>The <strong>Body Fat Calculator</strong> uses the U.S. Navy circumference method, which estimates body fat with an accuracy of approximately ±3–4% compared to DEXA scan measurements. Individual measurement technique variability further affects accuracy.</li>
            <li>The <strong>Ideal Weight Calculator</strong> uses population-derived formulas originally designed for clinical drug dosing — not individual health optimization. The "ideal" ranges produced are population averages, not personal targets.</li>
            <li>The <strong>Water Intake Calculator</strong> provides a general estimate; actual fluid needs vary considerably based on medical conditions, medications, exercise duration and intensity, altitude, and individual physiology.</li>
            <li>The <strong>Macro Calculator</strong> provides recommended macronutrient distributions based on general nutritional guidelines; individual macronutrient needs for specific health conditions (diabetes, kidney disease, cardiovascular disease) must be determined in consultation with a registered dietitian.</li>
          </ul>

          <h2>Medical Conditions and Medications</h2>
          <p>
            The information on VitalAge is intended for use by generally healthy adults. If you have any medical condition — including but not limited to diabetes, heart disease, kidney disease, liver disease, eating disorders, osteoporosis, cancer, autoimmune conditions, or hormonal disorders — or if you take any prescription medications, the general guidance presented on this Site may not be appropriate for you without modification by a healthcare professional.
          </p>
          <p>
            Many medications significantly affect metabolism, body composition, fluid balance, and nutritional needs. If you are on prescription medication, discuss any changes to your diet or exercise routine with your prescribing physician.
          </p>

          <h2>Emergency Health Situations</h2>
          <p>
            VitalAge does not provide emergency medical services. If you are experiencing a medical emergency, call 911 (United States), 999 (United Kingdom), 000 (Australia), 112 (European Union), or your local emergency services number immediately. Do not delay seeking emergency medical help based on information found on this Site.
          </p>

          <h2>Supplement Information</h2>
          <p>
            Any mentions of dietary supplements, vitamins, minerals, or nutritional compounds on this Site are for informational purposes only and do not constitute endorsement of specific products. Dietary supplements are not FDA-approved to diagnose, treat, cure, or prevent any disease. Supplement safety and efficacy can vary widely by product and manufacturer. Consult your physician or registered dietitian before starting any supplement regimen.
          </p>
          <p>
            These statements have not been evaluated by the Food and Drug Administration (FDA).
          </p>

          <h2>Nutrition and Weight Loss Content</h2>
          <p>
            Information about nutrition, weight management, and body composition on this Site reflects general scientific literature and is not tailored to any individual's specific needs. Weight loss and changes in body composition should be approached gradually and ideally under the guidance of qualified healthcare professionals.
          </p>
          <p>
            We do not endorse any specific diet, weight loss program, or eating pattern as universally appropriate. What works for one person may be inappropriate or harmful for another, particularly in the context of underlying health conditions.
          </p>

          <h2>External Links</h2>
          <p>
            When VitalAge links to external resources, scientific studies, or health organizations, those links are provided for informational context only. We do not control the content of linked sites and cannot guarantee their accuracy or currency. Linking does not imply our endorsement of the linked site's content, opinions, or recommendations.
          </p>

          <h2>Contact for Health Concerns</h2>
          <p>
            If you have specific questions about your health, please consult your physician or a qualified healthcare provider. For questions about the content or calculators on VitalAge, you can reach our editorial team at <a href="mailto:hello@vitalage.com" className="text-primary hover:underline">hello@vitalage.com</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
