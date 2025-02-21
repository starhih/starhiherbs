import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Calculator,
  DollarSign,
  Package,
  Building2,
  ArrowRight,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  productType: z.string().min(1, "Please select a product type"),
  quantity: z.string().min(1, "Please enter the quantity"),
  packaging: z.string().min(1, "Please select packaging type"),
  certification: z.string().min(1, "Please select required certifications"),
  deliveryLocation: z.string().min(1, "Please enter delivery location"),
  timeline: z.string().min(1, "Please select timeline"),
});

const PRODUCT_TYPES = [
  { id: "standardized", name: "Standardized Extracts" },
  { id: "organic", name: "Organic Extracts" },
  { id: "custom", name: "Custom Formulation" },
];

const PACKAGING_TYPES = [
  { id: "drums", name: "Fiber Drums (25kg)" },
  { id: "bags", name: "Foil Bags (5kg)" },
  { id: "boxes", name: "Boxes (1kg)" },
];

const CERTIFICATIONS = [
  { id: "none", name: "No Certification Required" },
  { id: "organic", name: "Organic Certification" },
  { id: "kosher", name: "Kosher Certification" },
  { id: "halal", name: "Halal Certification" },
];

const TIMELINES = [
  { id: "standard", name: "Standard (4-6 weeks)" },
  { id: "express", name: "Express (2-3 weeks)" },
  { id: "urgent", name: "Urgent (1-2 weeks)" },
];

const QuoteCalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [quoteResult, setQuoteResult] = useState<{
    basePrice: number;
    packagingCost: number;
    certificationCost: number;
    shippingEstimate: number;
    totalEstimate: number;
  } | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: "",
      quantity: "",
      packaging: "",
      certification: "",
      deliveryLocation: "",
      timeline: "",
    },
  });

  const calculateQuote = async (values: z.infer<typeof formSchema>) => {
    setIsCalculating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation logic
    const basePrice = Math.random() * 1000 + 500;
    const packagingCost = Math.random() * 200 + 100;
    const certificationCost = values.certification === "none" ? 0 : Math.random() * 300 + 200;
    const shippingEstimate = Math.random() * 400 + 300;
    
    const result = {
      basePrice,
      packagingCost,
      certificationCost,
      shippingEstimate,
      totalEstimate: basePrice + packagingCost + certificationCost + shippingEstimate,
    };
    
    setQuoteResult(result);
    setIsCalculating(false);
    
    toast({
      title: "Quote Calculated",
      description: "Your estimated quote has been calculated. Please review the details below.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Quote Calculator
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get an instant price estimate for your herbal extract requirements. Fill in the details 
              below to calculate your quote.
            </p>
          </motion.div>

          <Card className="p-6 md:p-8 bg-white shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(calculateQuote)} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Product Requirements</h2>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Product Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border shadow-md z-50">
                            {PRODUCT_TYPES.map((type) => (
                              <SelectItem 
                                key={type.id} 
                                value={type.id}
                                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-2.5"
                              >
                                {type.name}
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
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Quantity (kg)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="Enter quantity in kilograms"
                            className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="packaging"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Packaging Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select packaging type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border shadow-md z-50">
                            {PACKAGING_TYPES.map((type) => (
                              <SelectItem 
                                key={type.id} 
                                value={type.id}
                                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-2.5"
                              >
                                {type.name}
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
                    name="certification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Required Certifications</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select required certifications" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border shadow-md z-50">
                            {CERTIFICATIONS.map((cert) => (
                              <SelectItem 
                                key={cert.id} 
                                value={cert.id}
                                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-2.5"
                              >
                                {cert.name}
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
                    name="deliveryLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Delivery Location</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter city, country"
                            className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Delivery Timeline</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select delivery timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border shadow-md z-50">
                            {TIMELINES.map((timeline) => (
                              <SelectItem 
                                key={timeline.id} 
                                value={timeline.id}
                                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-2.5"
                              >
                                {timeline.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 text-white"
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {quoteResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-8 border-t"
              >
                <div className="flex items-center gap-2 mb-6">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Quote Estimate</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-medium">${quoteResult.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Packaging Cost:</span>
                    <span className="font-medium">${quoteResult.packagingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Certification Cost:</span>
                    <span className="font-medium">${quoteResult.certificationCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Shipping Estimate:</span>
                    <span className="font-medium">${quoteResult.shippingEstimate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-4 bg-primary/5 rounded-lg px-4">
                    <span className="font-semibold">Total Estimate:</span>
                    <span className="font-bold text-primary">
                      ${quoteResult.totalEstimate.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    This is an estimated quote based on your requirements. Final pricing may vary based on 
                    specific product details, market conditions, and additional requirements. Contact our 
                    sales team for a detailed quote.
                  </p>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuoteCalculator; 