import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import { PricingTable } from "@clerk/nextjs"



export default function PricingPage() {
  return (
    <div className="bg-background">
      <SiteHeader />

      <div className="mt-20 p-5">
        <PricingTable />
      </div>

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
