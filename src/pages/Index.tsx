
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowDownToLine, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { downloadFramework } from "@/utils/downloadFramework";

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isDownloadOpen, setDownloadOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const overviewSection = useRef(null);
  const featuresSection = useRef(null);
  const cicdSection = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleDownloadClick = () => {
    setDownloadOpen(true);
  };

  const handleDownloadFramework = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to proceed with the download.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      await downloadFramework(email);
      
      toast({
        title: "Download Started",
        description: `Downloading BDD Automation Ninja. You'll receive installation instructions in the ZIP file.`,
      });
      
      setDownloadOpen(false);
      // Reset form
      setEmail("");
      setAcceptTerms(false);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the framework. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenDocs = () => {
    window.open("https://example.com/docs", "_blank");
  };

  const handleOpenGitHub = () => {
    window.open("https://github.com/user/repo", "_blank");
  };

  const scrollToSection = (section: string) => {
    let elementRef;
    switch (section) {
      case 'overview':
        elementRef = overviewSection;
        break;
      case 'features':
        elementRef = featuresSection;
        break;
      case 'cicd':
        elementRef = cicdSection;
        break;
      default:
        elementRef = overviewSection;
    }

    elementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDemo = () => {
    toast({
      title: "Opening Demo",
      description: "Loading the interactive BDD Framework demo",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-500 mr-6 transition-colors duration-300">BDD Automation Ninja</div>
                <nav className="hidden md:flex space-x-4">
                  <button 
                    onClick={() => scrollToSection('overview')} 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-300"
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-300"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('cicd')} 
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-300"
                  >
                    CI/CD
                  </button>
                </nav>
              </div>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={handleOpenDocs}
                >
                  Documentation
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleOpenGitHub}
                >
                  GitHub
                </Button>
                <Link to="/demo">
                  <Button 
                    variant="outline" 
                    className="ml-2" 
                    onClick={handleViewDemo}
                  >
                    View Demo
                  </Button>
                </Link>
                <Button 
                  onClick={handleDownloadClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white ml-2"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <section ref={overviewSection} className="mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                Automate BDD Testing with Ease
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Our BDD Automation Ninja simplifies behavior-driven development, making it easier to write, manage, and automate your tests.
              </p>
              <div className="mt-6">
                <Button 
                  onClick={handleDownloadClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Download Now <ArrowDownToLine className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>

            <section ref={featuresSection} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Gherkin Support</h3>
                  <p className="text-gray-700 dark:text-gray-300">Write tests in plain English using Gherkin syntax, making them accessible to everyone on your team.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Automated Test Execution</h3>
                  <p className="text-gray-700 dark:text-gray-300">Automatically run your BDD tests and get instant feedback on your application's behavior.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Detailed Reporting</h3>
                  <p className="text-gray-700 dark:text-gray-300">Generate comprehensive reports that provide insights into your test results and help you identify issues quickly.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">CI/CD Integration</h3>
                  <p className="text-gray-700 dark:text-gray-300">Integrate seamlessly with your CI/CD pipeline to ensure continuous testing and delivery.</p>
                </div>
              </div>
            </section>

            <section ref={cicdSection} className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">CI/CD Integration</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Integrate BDD Automation Ninja with your CI/CD pipeline to automate testing as part of your software delivery process.
              </p>
              <ul className="list-disc pl-5 mt-4 text-gray-700 dark:text-gray-300">
                <li>Automate tests on every commit</li>
                <li>Ensure consistent quality across environments</li>
                <li>Reduce the risk of releasing defects</li>
              </ul>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Get Started Today</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Download BDD Automation Ninja and start automating your BDD tests in minutes.
              </p>
              <Button 
                onClick={handleDownloadClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Download Now <ArrowDownToLine className="ml-2 h-4 w-4" />
              </Button>
            </section>
          </main>
        </>
      )}
      
      <Dialog open={isDownloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Download BDD Automation Ninja</DialogTitle>
            <DialogDescription>
              Enter your email address to receive a download link and updates.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDownloadFramework}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3" 
                  type="email" 
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the terms and conditions
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!email || !acceptTerms || isDownloading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isDownloading ? "Downloading..." : "Download Now"}
                {!isDownloading && <ArrowDownToLine className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
