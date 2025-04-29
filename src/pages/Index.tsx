
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, BarChart3, Users, ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/a99768c4-dfe1-4bc3-b443-3763b7416d99.png" 
                alt="AdmiSun Logo" 
                className="h-10 w-10" 
              />
            </div>
            <span className="hidden font-bold sm:inline-block">
              AdmiSun
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground/80">
              Home
            </Link>
            <Link to="/features" className="transition-colors hover:text-foreground/80">
              Features
            </Link>
            <Link to="/about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link to="/contact" className="transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Solar Power Plant Management Platform
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    A complete solution for managing solar power plants and clients. Optimize performance, monitor output, and drive clean energy adoption.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/login">
                    <Button className="admisun-gradient border-0">Get Started</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline">Contact Sales</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Solar Plant Dashboard"
                  className="rounded-lg object-cover shadow-xl"
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  width={550}
                  height={310}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm admisun-gradient bg-clip-text text-transparent">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Complete Solar Management Platform
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for solar power plant management,
                  client relationships, and performance monitoring.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Sun className="h-10 w-10 text-solar-orange" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Plant Management</h3>
                    <p className="text-gray-500">
                      Monitor and manage all your solar plants from a single dashboard with real-time performance data.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-10 w-10 text-solar-green" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Client Portal</h3>
                    <p className="text-gray-500">
                      Give your clients access to their own customized dashboard to track their solar performance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <BarChart3 className="h-10 w-10 text-solar-accent" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Advanced Analytics</h3>
                    <p className="text-gray-500">
                      Detailed performance analytics and reporting tools to optimize your solar operations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="h-10 w-10 text-solar-blue" />
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Secure Platform</h3>
                    <p className="text-gray-500">
                      Role-based access control ensures data security while providing the right level of access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-100">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a99768c4-dfe1-4bc3-b443-3763b7416d99.png" 
                alt="AdmiSun Logo" 
                className="h-8 w-8 rounded-lg" 
              />
              <span className="font-bold">AdmiSun</span>
            </div>
            <p className="text-sm text-gray-500">
              Efficient solar plant management for the clean energy revolution
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="grid gap-2 text-sm">
              <h3 className="font-medium">Company</h3>
              <Link to="/about" className="text-gray-500 hover:underline">About Us</Link>
              <Link to="/contact" className="text-gray-500 hover:underline">Contact</Link>
              <Link to="/careers" className="text-gray-500 hover:underline">Careers</Link>
            </div>
            <div className="grid gap-2 text-sm">
              <h3 className="font-medium">Legal</h3>
              <Link to="/privacy" className="text-gray-500 hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:underline">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="container py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AdmiSun. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
