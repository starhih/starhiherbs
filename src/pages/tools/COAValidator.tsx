import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  InfoIcon, 
  Loader2,
  FileCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type ValidationResult = {
  isValid: boolean;
  batchNumber: string;
  testDate: string;
  expiryDate: string;
  overallStatus: "pass" | "fail" | "warning";
  parameters: {
    name: string;
    result: number;
    unit: string;
    specification: string;
    status: "pass" | "fail" | "warning";
  }[];
  warnings?: string[];
  recommendations?: string[];
};

const MOCK_VALIDATION: ValidationResult = {
  isValid: true,
  batchNumber: "AW2024031901",
  testDate: "2024-03-19",
  expiryDate: "2026-03-19",
  overallStatus: "pass",
  parameters: [
    {
      name: "Withanolides",
      result: 2.5,
      unit: "%",
      specification: "NLT 2.5%",
      status: "pass"
    },
    {
      name: "Heavy Metals",
      result: 0.8,
      unit: "ppm",
      specification: "NMT 1.0 ppm",
      status: "pass"
    },
    {
      name: "Microbial Count",
      result: 950,
      unit: "cfu/g",
      specification: "NMT 1000 cfu/g",
      status: "warning"
    },
    {
      name: "Loss on Drying",
      result: 4.2,
      unit: "%",
      specification: "NMT 5.0%",
      status: "pass"
    }
  ],
  warnings: [
    "Microbial count is within specification but close to the upper limit",
    "Store in a cool, dry place to maintain product stability"
  ],
  recommendations: [
    "Conduct stability testing at regular intervals",
    "Monitor moisture content during storage",
    "Consider implementing additional microbial control measures"
  ]
};

const COAValidator = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const validateCOA = async () => {
    setIsValidating(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real application, this would send the file to a backend service
    // for actual validation and analysis
    setResult(MOCK_VALIDATION);
    setIsValidating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass": return "text-green-600";
      case "fail": return "text-red-600";
      case "warning": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "pass": return "bg-green-50 border-green-200";
      case "fail": return "bg-red-50 border-red-200";
      case "warning": return "bg-yellow-50 border-yellow-200";
      default: return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Certificate of Analysis (COA) Validator
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Validate and analyze Certificates of Analysis for herbal extracts to ensure quality and compliance.
            </p>
          </motion.div>

          <Card className="p-8 mb-8 shadow-lg border-t-4 border-t-primary bg-white/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">Upload COA Document</label>
                  <span className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG</span>
                </div>
                
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="coa-file"
                  />
                  <label 
                    htmlFor="coa-file"
                    className="cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          {file ? (
                            <span className="text-primary font-medium">{file.name}</span>
                          ) : (
                            <>
                              <span className="text-primary font-medium">Click to upload</span> or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={validateCOA}
                  disabled={!file || isValidating}
                  className="w-full md:w-auto min-w-[200px] h-12 text-lg relative bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-200"
                >
                  {isValidating ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Validating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      <span>Validate COA</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 mb-8 bg-white shadow-lg">
                  <div className="space-y-8">
                    {/* Header Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className={cn(
                        "p-6 rounded-lg border",
                        getStatusBg(result.overallStatus)
                      )}>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">Validation Status</h3>
                            <p className={cn(
                              "text-lg font-semibold mt-1",
                              getStatusColor(result.overallStatus)
                            )}>
                              {result.overallStatus === "pass" ? "Valid COA" : 
                               result.overallStatus === "warning" ? "Valid with Warnings" : 
                               "Invalid COA"}
                            </p>
                          </div>
                          {result.overallStatus === "pass" ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : result.overallStatus === "warning" ? (
                            <AlertTriangle className="h-6 w-6 text-yellow-500" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-500" />
                          )}
                        </div>
                      </div>

                      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-900 mb-3">Document Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Batch Number:</span>
                            <span className="font-medium">{result.batchNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Test Date:</span>
                            <span className="font-medium">{result.testDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expiry Date:</span>
                            <span className="font-medium">{result.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Test Parameters */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Test Parameters
                      </h3>
                      <div className="rounded-lg border border-gray-200 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Parameter</TableHead>
                              <TableHead>Result</TableHead>
                              <TableHead>Specification</TableHead>
                              <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {result.parameters.map((param, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{param.name}</TableCell>
                                <TableCell>
                                  {param.result} {param.unit}
                                </TableCell>
                                <TableCell>{param.specification}</TableCell>
                                <TableCell className="text-right">
                                  <span className={cn(
                                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                    param.status === "pass" ? "bg-green-50 text-green-700" :
                                    param.status === "warning" ? "bg-yellow-50 text-yellow-700" :
                                    "bg-red-50 text-red-700"
                                  )}>
                                    {param.status === "pass" ? "Pass" :
                                     param.status === "warning" ? "Warning" :
                                     "Fail"}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Warnings */}
                    {result.warnings && result.warnings.length > 0 && (
                      <Alert variant="default" className="bg-yellow-50 border-yellow-200">
                        <AlertTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                          Warnings
                        </AlertTitle>
                        <AlertDescription>
                          <ul className="mt-2 space-y-2">
                            {result.warnings.map((warning, index) => (
                              <li key={index} className="flex items-start gap-2 text-yellow-800">
                                <span className="text-yellow-600">•</span>
                                <span>{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Recommendations */}
                    {result.recommendations && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <InfoIcon className="h-5 w-5 text-primary" />
                          Recommendations
                        </h3>
                        <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
                          {result.recommendations.map((rec, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="h-6 w-6 rounded-full bg-white border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-primary text-sm font-medium">{index + 1}</span>
                              </div>
                              <span className="text-gray-600 leading-relaxed">{rec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <InfoIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">About COA Validation</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Our COA validator analyzes key parameters including active compounds, heavy metals, 
                  microbial content, and other quality indicators. The validation process ensures 
                  compliance with industry standards and helps maintain product quality. Always retain 
                  original COA documents for your records.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default COAValidator; 