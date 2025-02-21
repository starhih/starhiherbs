import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Beaker,
  Calculator,
  FileCheck,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  Star,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const TOOLS = [
  {
    id: "synergistic-builder",
    name: "Herbal Extract Synergistic Formulation Builder",
    description: "Design optimal herbal extract combinations with AI-powered synergy analysis and scientific evidence.",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-500",
    features: [
      "AI-powered synergy analysis",
      "Scientific evidence support",
      "Dosage recommendations",
      "Detailed formulation reports"
    ],
    link: "/tools/synergistic-builder"
  },
  {
    id: "stability-predictor",
    name: "Herbal Extract Stability & Shelf Life Predictor",
    description: "Predict stability and determine optimal storage conditions for your herbal extracts with our advanced analysis tool.",
    icon: Clock,
    color: "bg-blue-500/10 text-blue-500",
    features: [
      "Shelf life prediction",
      "Storage optimization",
      "Stability analysis",
      "PDF report generation"
    ],
    link: "/tools/stability-predictor"
  },
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
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            <Star className="w-4 h-4" />
            Professional Tools
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Formulation Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional tools to help you with herbal formulation, quality control, and cost estimation.
            Streamline your development process with our suite of specialized calculators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <Link to={tool.link} className="block p-6">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color}`}>
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h2>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {tool.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full group-hover:bg-primary group-hover:text-white text-white transition-all duration-200"
                  >
                    Launch Tool
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Tools for Herbal Industry</h3>
              <p className="text-gray-600 leading-relaxed">
                Our tools are designed to help manufacturers, formulators, and quality control professionals 
                streamline their processes. Each tool provides detailed analysis and recommendations based 
                on industry standards and best practices. For specific requirements or custom solutions, 
                please contact our team.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tools; 