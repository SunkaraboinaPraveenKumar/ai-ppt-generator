import SiteHeader from '@/components/site-header'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  { q: 'How does SlideAI create slides?', a: 'SlideAI uses AI models to generate slide text and layouts based on your prompts. The generated content is editable.' },
  { q: 'Is my data saved?', a: 'Yes — your projects are stored in your account using Firebase Firestore. You can delete them anytime.' },
  { q: 'How many slides can I generate?', a: 'Your limit depends on your subscription plan. Free users have a small credit allowance.' },
  { q: 'Can I export to PowerPoint or PDF?', a: 'Yes — SlideAI exports presentations as .pptx and PDF formats for download.' },
  { q: 'Can I customize the slide designs?', a: 'Absolutely — generated slides are editable in the editor where you can change text, layout, and styles.' },
  { q: 'Do I need an account?', a: 'Yes — creating an account allows you to save projects, export, and manage your subscription.' },
  { q: 'How does billing work?', a: 'We offer a free tier and paid subscription plans. Billing is handled monthly or yearly through our checkout.' },
  { q: 'Is my data private?', a: 'We store your projects in Firestore with reasonable access controls. Do not store sensitive personal data.' },
  { q: 'Can teams collaborate on a presentation?', a: 'Team collaboration is on our roadmap; for now, projects are per-user.' },
  { q: 'What AI model powers SlideAI?', a: 'We use server-side AI models (configured in the app) optimized for text generation and layout suggestions.' },
]

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2 text-primary">Frequently asked questions</h1>
            <p className="text-md text-muted-foreground">Answers to common questions about SlideAI and using the editor.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <Accordion type="single" collapsible>
              {FAQS.map((f, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{f.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      {/* Reuse the footer from the landing page style */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <ChevronDown className="w-4 h-4 text-primary-foreground" />
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
                  <a href="/pricing" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="hover:text-foreground transition">
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
