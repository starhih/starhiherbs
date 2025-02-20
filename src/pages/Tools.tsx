import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Beaker, 
  Calculator, 
  FileCheck, 
  DollarSign,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TOOLS = [
  {
    id: "compatibility-checker",
    name: "Herbal Ingredient Compatibility Checker",
    description: "Check the compatibility between different herbal ingredients and get detailed recommendations for safe combinations.",
    icon: Beaker,
    color: "bg-green-500/10 text-green-500",
    features: [
      "Interactive herb selection",
      "Compatibility analysis",
      "Safety recommendations",
      "Scientific evidence levels"
    ],
    link: "/tools/compatibility-checker"
  },
  {
    id: "dosage-calculator",
    name: "Botanical Extract Dosage Calculator",
    description: "Calculate personalized dosage recommendations for botanical extracts based on individual factors and requirements.",
    icon: Calculator,
    color: "bg-blue-500/10 text-blue-500",
    features: [
      "Personalized calculations",
      "Age and weight factors",
      "Sensitivity adjustments",
      "Detailed recommendations"
    ],
    link: "/tools/dosage-calculator"
  },
  {
    id: "coa-validator",
    name: "Certificate of Analysis (COA) Validator",
    description: "Validate and analyze Certificates of Analysis for herbal extracts to ensure quality and compliance.",
    icon: FileCheck,
    color: "bg-purple-500/10 text-purple-500",
    features: [
      "Document validation",
      "Parameter analysis",
      "Quality indicators",
      "Compliance checking"
    ],
    link: "/tools/coa-validator"
  },
  {
    id: "cost-estimator",
    name: "Supplement Formulation Cost Estimator",
    description: "Calculate production costs, estimate retail pricing, and analyze ROI for your supplement formulations.",
    icon: DollarSign,
    color: "bg-orange-500/10 text-orange-500",
    features: [
      "Cost breakdown",
      "ROI calculation",
      "Pricing analysis",
      "Manufacturing costs"
    ],
    link: "/tools/cost-estimator"
  }
];

const Tools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Formulation Tools
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional tools to help you with herbal formulation, quality control, and cost estimation.
              Streamline your development process with our suite of specialized calculators.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {TOOLS.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={tool.link} className="block">
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-200 group">
                    <div className="space-y-6">
                      <div className="flex items-start justify-between">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          tool.color
                        )}>
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h2>
                        <p className="text-gray-600 mb-4">
                          {tool.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {tool.features.map((feature, i) => (
                          <div 
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-1 h-1 rounded-full bg-primary/60" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-200"
                        >
                          Launch Tool
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Professional Tools for Herbal Industry</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Our tools are designed to help manufacturers, formulators, and quality control professionals 
                  streamline their processes. Each tool provides detailed analysis and recommendations based 
                  on industry standards and best practices. For specific requirements or custom solutions, 
                  please contact our team.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Tools; 