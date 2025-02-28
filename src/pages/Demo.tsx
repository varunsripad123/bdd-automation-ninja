
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, Clock, PlayCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("features");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    pending: number;
    total: number;
  }>({ passed: 0, failed: 0, pending: 0, total: 4 });
  const [testCases, setTestCases] = useState([
    { id: 1, name: "User login with valid credentials", status: "pending", scenario: "Given the user is on the login page\nWhen they enter valid credentials\nAnd click the login button\nThen they should be redirected to the dashboard" },
    { id: 2, name: "User login with invalid credentials", status: "pending", scenario: "Given the user is on the login page\nWhen they enter invalid credentials\nAnd click the login button\nThen they should see an error message" },
    { id: 3, name: "User registration with valid data", status: "pending", scenario: "Given the user is on the registration page\nWhen they fill in all required fields with valid data\nAnd accept the terms and conditions\nAnd click the register button\nThen a new account should be created\nAnd they should receive a confirmation email" },
    { id: 4, name: "Password reset functionality", status: "pending", scenario: "Given the user is on the forgot password page\nWhen they enter their registered email\nAnd click the reset password button\nThen they should receive a password reset link" }
  ]);

  const runTests = () => {
    setIsRunning(true);
    setTestResults({ ...testResults, pending: 4, passed: 0, failed: 0 });
    setTestCases(testCases.map(tc => ({ ...tc, status: "running" })));
    
    toast({
      title: "Test Execution Started",
      description: "Running all 4 test scenarios",
    });

    // Simulate test execution with different timing for each test
    setTimeout(() => {
      setTestCases(prev => {
        const updated = [...prev];
        updated[0].status = "passed";
        return updated;
      });
      setTestResults(prev => ({ ...prev, passed: prev.passed + 1, pending: prev.pending - 1 }));
    }, 2000);

    setTimeout(() => {
      setTestCases(prev => {
        const updated = [...prev];
        updated[1].status = "failed";
        return updated;
      });
      setTestResults(prev => ({ ...prev, failed: prev.failed + 1, pending: prev.pending - 1 }));
    }, 3500);

    setTimeout(() => {
      setTestCases(prev => {
        const updated = [...prev];
        updated[2].status = "passed";
        return updated;
      });
      setTestResults(prev => ({ ...prev, passed: prev.passed + 1, pending: prev.pending - 1 }));
    }, 5000);

    setTimeout(() => {
      setTestCases(prev => {
        const updated = [...prev];
        updated[3].status = "passed";
        return updated;
      });
      setTestResults(prev => ({ ...prev, passed: prev.passed + 1, pending: prev.pending - 1 }));
      setIsRunning(false);
      
      toast({
        title: "Test Execution Completed",
        description: "3 passed, 1 failed, 0 pending",
        variant: "default",
      });
    }, 6500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case "failed":
        return <XCircle className="text-red-500 h-5 w-5" />;
      case "running":
        return <Clock className="text-amber-500 h-5 w-5 animate-pulse" />;
      default:
        return <Clock className="text-gray-400 h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">BDD Automation Framework Demo</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="execution">Test Execution</TabsTrigger>
            <TabsTrigger value="report">Test Report</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Feature: User Authentication</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                As a user<br />
                I want to be able to authenticate into the application<br />
                So that I can access my account and perform actions
              </p>

              <div className="space-y-4 mt-6">
                {testCases.map((testCase) => (
                  <div key={testCase.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{testCase.name}</h3>
                      <div className="flex items-center">
                        {getStatusIcon(testCase.status)}
                      </div>
                    </div>
                    <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-sm overflow-auto">
                      {testCase.scenario}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="execution">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Test Execution</h2>
                <Button 
                  onClick={runTests} 
                  disabled={isRunning}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {isRunning ? "Running Tests..." : "Run All Tests"}
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-md text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Total</p>
                  <p className="text-2xl font-bold mt-1">{testResults.total}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Passed</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{testResults.passed}</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Failed</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{testResults.failed}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{testResults.pending}</p>
                </div>
              </div>

              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-medium mb-2">Execution Progress</h3>
                {testCases.map((testCase) => (
                  <div key={testCase.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <div className="flex items-center">
                      {getStatusIcon(testCase.status)}
                      <span className="ml-2">{testCase.name}</span>
                    </div>
                    <div>
                      {testCase.status === "running" ? (
                        <span className="text-amber-500 text-sm">Running...</span>
                      ) : testCase.status === "passed" ? (
                        <span className="text-green-500 text-sm">Passed</span>
                      ) : testCase.status === "failed" ? (
                        <span className="text-red-500 text-sm">Failed</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="report">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Test Execution Report</h2>
              
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">Summary</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Features</p>
                      <p className="font-medium mt-1">1</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Scenarios</p>
                      <p className="font-medium mt-1">{testResults.total}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Steps</p>
                      <p className="font-medium mt-1">17</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Duration</p>
                      <p className="font-medium mt-1">6.5s</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(testResults.passed / testResults.total) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 dark:text-green-400">{testResults.passed} passed ({((testResults.passed / testResults.total) * 100).toFixed(0)}%)</span>
                      <span className="text-red-600 dark:text-red-400">{testResults.failed} failed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="font-medium">Failed Tests</h3>
                {testCases
                  .filter(t => t.status === "failed")
                  .map(testCase => (
                    <div key={testCase.id} className="bg-red-50 dark:bg-red-900/10 p-4 rounded-md border border-red-200 dark:border-red-800">
                      <h4 className="font-medium text-red-700 dark:text-red-400">{testCase.name}</h4>
                      <pre className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-md text-sm overflow-auto border border-red-200 dark:border-red-800">
                        {testCase.scenario}
                      </pre>
                      <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-md text-sm">
                        <p className="font-medium text-red-700 dark:text-red-300">Error Details:</p>
                        <p className="mt-1 text-red-600 dark:text-red-300">
                          Element not found: Login button not clickable at point (150, 180). 
                          Other element would receive the click: &lt;div class="overlay"&gt;...&lt;/div&gt;
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Demo;
