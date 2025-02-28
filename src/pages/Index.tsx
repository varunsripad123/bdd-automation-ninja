
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Download, ExternalLink, Github } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading delay for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    setShowDownloadOptions(true);
  };

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    toast({
      title: "Command copied!",
      description: "The command has been copied to your clipboard.",
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false);
      setEmail("");
      toast({
        title: "Subscription successful!",
        description: "You've been added to our mailing list. Thank you!",
      });
    }, 1500);
  };

  const handleDownloadConfirm = () => {
    // Simulate download start
    toast({
      title: "Download started!",
      description: "Your download should begin shortly.",
    });
    
    // Create a temporary link to download (in a real app, this would be an actual file)
    const link = document.createElement('a');
    link.href = '#'; // This would be the actual file URL
    link.setAttribute('download', 'bdd-framework-template.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowDownloadOptions(false);
  };

  const openGithub = () => {
    window.open('https://github.com', '_blank');
    toast({
      title: "Redirecting to GitHub",
      description: "Opening the repository in a new tab",
    });
  };

  const openDocs = () => {
    window.open('#/documentation', '_blank');
    toast({
      title: "Opening documentation",
      description: "Documentation will open in a new tab",
    });
  };

  const handleViewDemo = () => {
    toast({
      title: "Demo access",
      description: "Redirecting to the live demo environment",
    });
    setTimeout(() => {
      window.open('https://demo.example.com', '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                BDD Automation Ninja
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                onClick={openDocs}
              >
                Documentation
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                onClick={openGithub}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={handleDownload}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="text-center max-w-3xl mx-auto">
                <Badge variant="outline" className="mb-3 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 transition-colors duration-300">
                  Complete Testing Solution
                </Badge>
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  BDD-Based Test Automation Framework
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                  A comprehensive testing framework with Selenium, RESTAssured, and Cucumber
                  for seamless UI, API, and database testing with CI/CD integration.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300 px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Template
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-indigo-600 dark:text-indigo-400 transition-colors duration-300 px-6 py-3 rounded-lg shadow-md hover:shadow-lg"
                    onClick={handleViewDemo}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> View Demo
                  </Button>
                </div>
              </div>
            </section>

            <Tabs 
              defaultValue="overview" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="max-w-4xl mx-auto"
            >
              <TabsList className="grid grid-cols-4 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-300">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-300">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-300">
                  Features
                </TabsTrigger>
                <TabsTrigger value="structure" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-300">
                  Structure
                </TabsTrigger>
                <TabsTrigger value="ci-cd" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-300">
                  CI/CD
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-500">
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white transition-colors duration-300">Framework Overview</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      A comprehensive BDD-based automation framework
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">UI Testing</h3>
                        <p className="text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          Selenium WebDriver with Page Object Model
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">API Testing</h3>
                        <p className="text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          RESTAssured for comprehensive API validation
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <path d="M12 3v19"></path>
                            <path d="M5 8h14"></path>
                            <path d="M5 16h14"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">BDD Approach</h3>
                        <p className="text-center text-gray-600 dark:text-gray-300 transition-colors duration-300">
                          Cucumber for human-readable test specifications
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-6 bg-gray-200 dark:bg-gray-700 transition-colors duration-300" />
                    
                    <div className="prose dark:prose-invert max-w-none transition-colors duration-300">
                      <p>
                        This comprehensive test automation framework combines the power of Behavior-Driven Development (BDD) with 
                        industry-standard tools like Selenium, RESTAssured, and Cucumber to create a robust testing solution.
                      </p>
                      <p>
                        The framework supports UI testing, API validation, database verification, and seamless CI/CD integration,
                        making it ideal for modern development workflows.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 transition-colors duration-300"
                      onClick={() => setActiveTab("features")}
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="space-y-8 animate-in fade-in-50 duration-500">
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white transition-colors duration-300">Key Features</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Explore the powerful capabilities of this framework
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300">Page Object Model</h3>
                          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Implements the Page Object Model design pattern for improved maintainability 
                            and reduced code duplication across UI tests.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300">Cross-Browser Testing</h3>
                          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Supports Chrome, Firefox, Edge, and other browsers with a unified WebDriver 
                            implementation for comprehensive test coverage.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300">Advanced API Testing</h3>
                          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            RESTAssured integration with BDD-style assertions for endpoint validation,
                            response verification, and schema validation.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <circle cx="12" cy="12" r="2"></circle>
                            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300">Service Virtualization</h3>
                          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            WireMock integration for simulating external APIs and services, 
                            enabling isolated testing without dependencies.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="mt-0.5 bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400 transition-colors duration-300">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 transition-colors duration-300">Database Validation</h3>
                          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            JDBC integration for comprehensive database testing and validation after 
                            UI and API interactions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="structure" className="space-y-8 animate-in fade-in-50 duration-500">
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white transition-colors duration-300">Project Structure</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Organized for maintainability and scalability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm overflow-auto max-h-96 transition-colors duration-300">
                      <pre className="text-gray-800 dark:text-gray-200">
{`/bdd-framework
  ├── src/test/java
  │   ├── features        # Cucumber feature files
  │   │   ├── ui
  │   │   │   ├── Login.feature
  │   │   │   └── Registration.feature
  │   │   ├── api
  │   │   │   ├── UserAPI.feature
  │   │   │   └── ProductAPI.feature
  │   │   └── database
  │   │       └── DataValidation.feature
  │   │
  │   ├── stepdefinitions # Step definition implementations
  │   │   ├── ui
  │   │   │   ├── LoginSteps.java
  │   │   │   └── RegistrationSteps.java
  │   │   ├── api
  │   │   │   ├── UserAPISteps.java
  │   │   │   └── ProductAPISteps.java
  │   │   └── database
  │   │       └── DatabaseSteps.java
  │   │
  │   ├── pages           # Page Object Model for UI tests
  │   │   ├── BasePage.java
  │   │   ├── LoginPage.java
  │   │   └── RegistrationPage.java
  │   │
  │   ├── apiTests        # RESTAssured API test scripts
  │   │   ├── BaseAPI.java
  │   │   ├── UserAPI.java
  │   │   └── ProductAPI.java
  │   │
  │   ├── database        # JDBC test scripts for DB validation
  │   │   ├── DBConnection.java
  │   │   └── DBQueries.java
  │   │
  │   ├── utils           # Reusable utility functions
  │   │   ├── ConfigReader.java
  │   │   ├── DriverFactory.java
  │   │   ├── ApiUtils.java
  │   │   ├── ReportUtils.java
  │   │   └── TestDataGenerator.java
  │   │
  │   └── hooks           # Cucumber hooks for setup/teardown
  │       └── Hooks.java
  │
  ├── src/test/resources
  │   ├── config
  │   │   └── config.properties
  │   │
  │   ├── testdata
  │   │   ├── users.json
  │   │   └── products.json
  │   │
  │   └── wiremock
  │       └── stubs
  │
  ├── pom.xml             # Maven dependencies
  ├── testng.xml          # TestNG configuration
  ├── .github/workflows   # GitHub Actions CI/CD configuration
  │   └── test.yml
  │
  └── README.md           # Documentation`}
                      </pre>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleCopyCommand("/bdd-framework")}
                      >
                        <Copy className="h-4 w-4" /> Copy Structure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ci-cd" className="space-y-8 animate-in fade-in-50 duration-500">
                <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white transition-colors duration-300">CI/CD Integration</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Seamless integration with GitHub Actions and Jenkins
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm transition-colors duration-300">
                        <div className="flex items-center mb-4">
                          <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 transition-colors duration-300">GitHub Actions</Badge>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-300">Workflow Configuration</h3>
                        </div>
                        <pre className="text-gray-800 dark:text-gray-200 overflow-auto max-h-64">
{`name: BDD Test Automation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
        
    - name: Build with Maven
      run: mvn clean install -DskipTests
      
    - name: Run Smoke Tests
      run: mvn test -Dcucumber.options="--tags @Smoke"
      
    - name: Generate Cucumber Report
      if: always()
      run: mvn cluecumber-report:reporting
      
    - name: Upload Test Results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-reports
        path: target/cucumber-reports/`}
                        </pre>
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-2"
                            onClick={() => handleCopyCommand(`name: BDD Test Automation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
        
    - name: Build with Maven
      run: mvn clean install -DskipTests
      
    - name: Run Smoke Tests
      run: mvn test -Dcucumber.options="--tags @Smoke"
      
    - name: Generate Cucumber Report
      if: always()
      run: mvn cluecumber-report:reporting
      
    - name: Upload Test Results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-reports
        path: target/cucumber-reports/`)}
                          >
                            <Copy className="h-4 w-4" /> Copy YAML
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-300">Automated Test Triggers</h3>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Run on every pull request
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Scheduled nightly regression tests
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Manual trigger option
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 transition-colors duration-300">Reporting Features</h3>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Interactive HTML reports
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Failure screenshots
                            </li>
                            <li className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Slack/email notifications
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <section className="mt-16 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Getting Started</h2>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Follow these simple steps to set up and run the framework
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-300">1</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">Clone Repository</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Clone the repository to your local machine using Git and navigate to the project directory.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-300">2</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">Install Dependencies</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Run Maven to install all required dependencies and build the project without executing tests.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-indigo-100 dark:bg-indigo-900 w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-300">3</span>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2 transition-colors duration-300">Run Tests</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Execute the tests using Maven commands with specific tags for targeted test runs.
                  </p>
                </div>
              </div>
              
              <div className="mt-10 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 font-mono text-sm transition-colors duration-300">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">Example Commands</h3>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <code className="text-gray-800 dark:text-gray-200 transition-colors duration-300">mvn clean test</code>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 transition-colors duration-300">Run all tests</p>
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      className="mt-2 text-indigo-600 dark:text-indigo-400 p-0 h-auto flex items-center gap-1"
                      onClick={() => handleCopyCommand("mvn clean test")}
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <code className="text-gray-800 dark:text-gray-200 transition-colors duration-300">mvn test -Dcucumber.options="--tags @Smoke"</code>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 transition-colors duration-300">Run only Smoke tests</p>
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      className="mt-2 text-indigo-600 dark:text-indigo-400 p-0 h-auto flex items-center gap-1"
                      onClick={() => handleCopyCommand('mvn test -Dcucumber.options="--tags @Smoke"')}
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <code className="text-gray-800 dark:text-gray-200 transition-colors duration-300">mvn test -Dcucumber.options="--tags @Regression"</code>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 transition-colors duration-300">Run Regression tests</p>
                    <Button 
                      variant="ghost" 
                      size="xs" 
                      className="mt-2 text-indigo-600 dark:text-indigo-400 p-0 h-auto flex items-center gap-1"
                      onClick={() => handleCopyCommand('mvn test -Dcucumber.options="--tags @Regression"')}
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Newsletter subscription section */}
            <section className="my-16 max-w-3xl mx-auto bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800 transition-colors duration-300">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Stay Updated</h2>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Subscribe to our newsletter for updates, new features, and best practices
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </section>
          </>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">BDD Automation Ninja</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                A comprehensive BDD-based test automation framework for UI, API, and database testing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" onClick={openDocs} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleViewDemo} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    Examples
                  </a>
                </li>
                <li>
                  <a href="#" onClick={openGithub} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
            <p>&copy; {new Date().getFullYear()} BDD Automation Ninja. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Download Dialog */}
      <Dialog open={showDownloadOptions} onOpenChange={setShowDownloadOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Framework Template</DialogTitle>
            <DialogDescription>
              Start building your test automation framework with our pre-configured template.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="terms" className="text-base">Terms and Conditions</Label>
              <div className="rounded-md border p-4 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 h-40 overflow-auto">
                <p>By downloading this framework template, you agree to the following terms:</p>
                <ul className="list-disc pl-5 pt-2 space-y-1">
                  <li>This template is provided as-is without any warranties.</li>
                  <li>You may use this template for personal or commercial projects.</li>
                  <li>Attribution is appreciated but not required.</li>
                  <li>You may modify the template to suit your needs.</li>
                  <li>You may not redistribute this template as your own.</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={acceptTerms} onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms and conditions
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDownloadOptions(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDownloadConfirm} 
              disabled={!acceptTerms}
              className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-300"
            >
              Download Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
