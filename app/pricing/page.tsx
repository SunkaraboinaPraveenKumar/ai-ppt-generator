import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["2 projects", "Basic slide templates", "Manual slide creation", "Export as PDF", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For professionals and teams",
    features: [
      "Unlimited projects",
      "AI-powered slide generation",
      "Advanced templates",
      "Export as PDF & PowerPoint",
      "Priority support",
      "Custom branding",
      "Collaboration tools",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced analytics",
      "SSO & security",
      "API access",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your presentation needs. Always flexible to scale.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 flex flex-col transition-all ${
                  plan.highlighted
                    ? "border-primary bg-card ring-2 ring-primary/20 md:scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full w-fit">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                </div>

                <Button
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-transparent border border-border hover:border-primary"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.",
                },
                {
                  q: "Is there a free trial for Pro?",
                  a: "Yes, all Pro plans come with a 14-day free trial. No credit card required to start.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
                },
                {
                  q: "Can I export my presentations?",
                  a: "Yes, Free plans can export as PDF, while Pro and Enterprise can export as PDF and PowerPoint.",
                },
              ].map((faq, i) => (
                <div key={i} className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create amazing presentations?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start free with 2 projects. Upgrade anytime for unlimited presentations and AI features.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SlideAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
