import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, FileText, PlayIcon } from "lucide-react"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import Image from "next/image"
import { SignInButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
export default async function LandingPage() {
  const { userId } = await auth();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-card border border-border rounded-full">
            <span className="text-sm text-primary font-medium">Powered by AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance leading-tight">
            Create Stunning
            <span className="text-primary"> Presentations </span>
            in Seconds
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Transform your ideas into professional PowerPoint presentations instantly. Just describe what you need, and
            our AI does the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {
              !userId ?
                <SignInButton mode='modal'>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                    Start Creating Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SignInButton>
                :
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                  Workspace
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            }
            <Button size="lg" variant="outline" className="cursor-pointer">
              Watch Demo <PlayIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="bg-card border border-border rounded-lg p-5 aspect-video flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/hero-image.png"
                alt="Hero Image"
                className="w-full h-full object-cover rounded-lg"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SlideAI?</h2>
            <p className="text-lg text-muted-foreground">Everything you need to create presentations faster</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Generation",
                description: "Describe your presentation and let AI create it instantly with professional designs.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate complete presentations in seconds, not hours. Save time and focus on content.",
              },
              {
                icon: FileText,
                title: "Export Anywhere",
                description: "Download as PDF or PowerPoint. Compatible with all presentation tools.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-8">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-card border border-border rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your First Presentation?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start free with 2 projects. Upgrade anytime for unlimited presentations.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
              Get Started Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">SlideAI</span>
              </div>
              <p className="text-sm text-muted-foreground">Create presentations with AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="hover:text-foreground transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SlideAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
