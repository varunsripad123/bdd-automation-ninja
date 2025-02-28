
// Function to download the BDD framework
export const downloadFramework = async (email: string): Promise<void> => {
  try {
    // Fetch the package.json file
    const packageResponse = await fetch('/bdd-framework-package.json');
    const packageJson = await packageResponse.text();
    
    // Fetch the framework structure documentation
    const structureResponse = await fetch('/framework-structure.md');
    const frameworkStructure = await structureResponse.text();
    
    // Combine into a zip-like structure (since we can't actually create zips in the browser easily)
    const frameworkContent = `# BDD Automation Ninja Framework
## Installation Guide

Thank you for downloading the BDD Automation Ninja framework!

### Quick Start

1. Extract this archive to a directory on your computer
2. Install Node.js (version 14 or higher) if you don't have it already
3. Open a terminal in the extracted directory
4. Run \`npm install\` to install all dependencies
5. Run \`npm test\` to verify your installation

### Included Files

- package.json - The npm configuration file with all dependencies
- framework-structure.md - Documentation of the framework structure
- README.md - This file

### Next Steps

1. Create your first feature file in the \`features\` directory
2. Implement the step definitions in the \`step_definitions\` directory
3. Run your tests with \`npm test\`

### Support

If you need help, please contact support at support@bdd-automation-ninja.com or visit our documentation at https://example.com/docs.

---

## Package.json

\`\`\`json
${packageJson}
\`\`\`

---

${frameworkStructure}
`;

    // Create a Blob and download it
    const blob = new Blob([frameworkContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bdd-automation-ninja-framework.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Log download event - in a real app this would send data to a server
    console.log(`Framework downloaded by: ${email} at ${new Date().toISOString()}`);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error downloading framework:', error);
    return Promise.reject(error);
  }
};
