import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { verify } from 'jsonwebtoken';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  // Check if user is authenticated
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET!);
      redirect("/dashboard");
    } catch (error) {
      // Token is invalid, continue to landing page
      cookieStore.delete('token');
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            AI Safety Router
          </Link>
          <Link href="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6 sm:text-5xl">
                Ensuring Safe AI Interactions Through Intelligent Routing
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Route your prompts to the most appropriate AI model based on safety analysis and content evaluation.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" size="lg">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Why AI Safety Router?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                title="Smart Analysis"
                description="Our system analyzes your prompts to determine the most suitable AI model, ensuring optimal and safe responses."
              />
              <FeatureCard
                title="Safety First"
                description="Built with AI safety principles in mind, helping prevent harmful or unethical AI interactions."
              />
              <FeatureCard
                title="Multiple Models"
                description="Access to various AI models including ChatGPT, Claude, and Gemini, each selected based on your specific needs."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-4">
              <StepCard
                number="1"
                title="Submit Prompt"
                description="Enter your prompt into our system"
              />
              <StepCard
                number="2"
                title="Analysis"
                description="Our system analyzes the content and intent"
              />
              <StepCard
                number="3"
                title="Model Selection"
                description="The most appropriate AI model is selected"
              />
              <StepCard
                number="4"
                title="Safe Response"
                description="Receive a safe and appropriate response"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Safety Router. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card text-center">
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}