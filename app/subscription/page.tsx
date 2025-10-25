"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const currentPlan = "free"

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      status: "Current Plan",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9/month",
      status: "Upgrade",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      status: "Contact Sales",
    },
  ]

  const features = [
    { name: "Projects", free: "2", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "AI Slide Generation", free: false, pro: true, enterprise: true },
    { name: "Export Formats", free: "PDF", pro: "PDF, PowerPoint", enterprise: "PDF, PowerPoint, Custom" },
    { name: "Templates", free: "Basic", pro: "Advanced", enterprise: "Custom" },
    { name: "Support", free: "Community", pro: "Priority", enterprise: "Dedicated" },
    { name: "Collaboration", free: false, pro: true, enterprise: true },
    { name: "Custom Branding", free: false, pro: true, enterprise: true },
    { name: "API Access", free: false, pro: false, enterprise: true },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/workspace" className="font-bold text-lg">
            SlideAI
          </Link>
          <Button variant="ghost" size="sm">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Plan */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Subscription Settings</h1>
          <p className="text-muted-foreground">Manage your plan and billing</p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`p-6 ${currentPlan === plan.id ? "border-primary bg-primary/5" : "border-border"}`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <Button
                className={`w-full ${
                  currentPlan === plan.id
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-transparent border border-border hover:border-primary"
                }`}
                disabled={currentPlan === plan.id}
              >
                {plan.status}
              </Button>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold">Free</th>
                  <th className="text-center py-4 px-4 font-semibold">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={i} className="border-b border-border hover:bg-card/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.free === "boolean" ? (
                        feature.free ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.free}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.pro}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="w-5 h-5 text-primary mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Billing History</h2>
          <Card className="p-6">
            <p className="text-muted-foreground text-center py-8">
              No billing history yet. Upgrade to Pro to start your subscription.
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
