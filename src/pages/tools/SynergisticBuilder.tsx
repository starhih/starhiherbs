import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Beaker,
  Loader2,
  Download,
  ArrowRight,
  Star,
  BookOpen,
  Scale,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// Types
type HerbalExtract = {
  id: string;
  name: string;
  scientificName: string;
  bioactiveCompounds: string[];
  traditionalUses: string[];
  dosageRange: {
    min: number;
    max: number;
    unit: string;
  };
};

type SynergyResult = {
  primaryExtract: HerbalExtract;
  complementaryExtracts: Array<{
    extract: HerbalExtract;
    synergyScore: number;
    mechanism: string;
    dosageAdjustment: string;
  }>;
  scientificReferences: Array<{
    title: string;
    authors: string;
    journal: string;
    year: number;
    doi: string;
  }>;
  recommendations: string[];
};

// Mock Data
const MOCK_EXTRACTS: HerbalExtract[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    bioactiveCompounds: ["Withanolides", "Alkaloids", "Saponins"],
    traditionalUses: ["Adaptogenic", "Stress Relief", "Immune Support"],
    dosageRange: { min: 300, max: 600, unit: "mg" },
  },
  {
    id: "turmeric",
    name: "Turmeric",
    scientificName: "Curcuma longa",
    bioactiveCompounds: ["Curcuminoids", "Essential Oils"],
    traditionalUses: ["Anti-inflammatory", "Antioxidant", "Joint Health"],
    dosageRange: { min: 500, max: 2000, unit: "mg" },
  },
  {
    id: "ginger",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    bioactiveCompounds: ["Gingerols", "Shogaols"],
    traditionalUses: ["Digestive Health", "Anti-inflammatory"],
    dosageRange: { min: 250, max: 1000, unit: "mg" },
  },
];

// Form Schema
const formSchema = z.object({
  primaryExtract: z.string({
    required_error: "Please select a primary herbal extract",
  }),
  targetOutcome: z.string({
    required_error: "Please specify your desired outcome",
  }),
  dosageForm: z.string({
    required_error: "Please select a dosage form",
  }),
});

const SynergisticBuilder = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SynergyResult | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryExtract: "",
      targetOutcome: "",
      dosageForm: "",
    },
  });

  const analyzeSynergy = async (values: z.infer<typeof formSchema>) => {
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result
    const mockResult: SynergyResult = {
      primaryExtract: MOCK_EXTRACTS[0],
      complementaryExtracts: [
        {
          extract: MOCK_EXTRACTS[1],
          synergyScore: 0.85,
          mechanism: "Enhanced bioavailability and anti-inflammatory effects",
          dosageAdjustment: "Reduce turmeric dosage by 20% when combined",
        },
        {
          extract: MOCK_EXTRACTS[2],
          synergyScore: 0.75,
          mechanism: "Complementary adaptogenic and digestive support",
          dosageAdjustment: "Standard dosage recommended",
        },
      ],
      scientificReferences: [
        {
          title: "Synergistic effects of Withania somnifera and Curcuma longa",
          authors: "Smith J, et al.",
          journal: "Journal of Ethnopharmacology",
          year: 2023,
          doi: "10.1016/j.jep.2023.001",
        },
      ],
      recommendations: [
        "Take the combination with a meal containing healthy fats",
        "Space doses throughout the day for optimal effects",
        "Monitor for enhanced effects and adjust dosage if needed",
      ],
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your formulation report has been downloaded.",
    });
  };

  const getSynergyScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600 bg-green-50";
    if (score >= 0.6) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Beaker className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                Formulation Tool
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Synergistic Formulation Builder
            </h1>
            <p className="text-xl text-gray-600">
              Design optimal herbal extract combinations with AI-powered synergy analysis
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create Your Formulation</CardTitle>
              <CardDescription>
                Select your primary extract and desired outcomes to discover synergistic combinations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(analyzeSynergy)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="primaryExtract"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Herbal Extract</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select primary extract" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MOCK_EXTRACTS.map((extract) => (
                              <SelectItem key={extract.id} value={extract.id}>
                                <div className="flex flex-col">
                                  <span>{extract.name}</span>
                                  <span className="text-sm text-gray-500">
                                    {extract.scientificName}
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetOutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Outcome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Stress relief and immune support"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dosageForm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage Form</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select dosage form" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="capsule">Capsule</SelectItem>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="liquid">Liquid Extract</SelectItem>
                            <SelectItem value="powder">Powder</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-11 text-white"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Synergies...
                      </>
                    ) : (
                      <>
                        Analyze Formulation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Synergistic Combinations
                  </CardTitle>
                  <CardDescription>
                    Recommended complementary extracts based on scientific evidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {result.complementaryExtracts.map((combo, index) => (
                    <div key={combo.extract.id} className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{combo.extract.name}</h4>
                          <p className="text-sm text-gray-500">{combo.extract.scientificName}</p>
                        </div>
                        <Badge
                          className={`${getSynergyScoreColor(combo.synergyScore)}`}
                        >
                          Synergy Score: {(combo.synergyScore * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Mechanism of Action</p>
                          <p className="text-sm text-gray-600">{combo.mechanism}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Dosage Adjustment</p>
                          <p className="text-sm text-gray-600">{combo.dosageAdjustment}</p>
                        </div>
                      </div>
                      {index < result.complementaryExtracts.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Scientific References
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.scientificReferences.map((ref) => (
                    <div key={ref.doi} className="space-y-2">
                      <h4 className="font-medium">{ref.title}</h4>
                      <p className="text-sm text-gray-600">
                        {ref.authors} • {ref.journal} ({ref.year})
                      </p>
                      <p className="text-sm text-primary">DOI: {ref.doi}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    Formulation Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important Notes</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-4 mt-2 space-y-1">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm">{rec}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Button
                onClick={handleDownloadReport}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Detailed Report
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default SynergisticBuilder; 