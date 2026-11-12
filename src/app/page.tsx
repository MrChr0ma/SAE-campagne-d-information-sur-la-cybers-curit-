import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileText, AlertTriangle, ArrowRight } from "lucide-react";

export default function Home() {
  const modules = [
    {
      title: "Phishing Detection",
      description: "Test your ability to spot fake emails and protect hospital systems.",
      icon: AlertTriangle,
      href: "/phishing",
      color: "text-amber-500",
      btnText: "Start Simulation",
    },
    {
      title: "Password Strength",
      description: "Check how strong your passwords are and learn how to create unbreakable ones.",
      icon: Lock,
      href: "/password",
      color: "text-blue-500",
      btnText: "Check Password",
    },
    {
      title: "Data Classification",
      description: "Learn how to correctly handle Public, Internal, and Confidential documents.",
      icon: FileText,
      href: "/data-classification",
      color: "text-green-500",
      btnText: "Play Game",
    },
    {
      title: "Knowledge Hub",
      description: "Explore common cyber threats like ransomware and how to prevent them.",
      icon: Shield,
      href: "/awareness",
      color: "text-purple-500",
      btnText: "Learn More",
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Protecting Patient Data <span className="text-primary">Starts With You</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
            Welcome to the SecureHealth Cybersecurity Awareness Platform.
            Complete the training modules to ensure our hospital remains safe and secure.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/awareness">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/phishing">Take a Quick Test</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-16 bg-slate-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Training Modules</h2>
            <p className="mt-2 text-slate-600">Select a module to begin your training.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module) => (
              <Card key={module.title} className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-transparent hover:border-t-primary">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <module.icon className={`h-10 w-10 ${module.color}`} />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available</span>
                  </div>
                  <CardTitle className="mt-4">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="secondary" asChild>
                    <Link href={module.href}>
                      {module.btnText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
