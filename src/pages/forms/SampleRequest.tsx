import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Package,
  Building2,
  Mail,
  Phone,
  Globe,
  Loader2,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const formSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  industry: z.string().min(1, "Please select an industry"),
  
  // Contact Information
  contactName: z.string().min(2, "Contact name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  
  // Sample Details
  productInterest: z.string().min(1, "Please select a product"),
  quantity: z.string().min(1, "Please specify the quantity"),
  intendedUse: z.string().min(10, "Please provide more details about intended use"),
  
  // Additional Information
  specifications: z.string().optional(),
  timeline: z.string().min(1, "Please select a timeline"),
  
  // Terms
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

const INDUSTRIES = [
  { id: "supplements", name: "Dietary Supplements" },
  { id: "pharma", name: "Pharmaceutical" },
  { id: "food", name: "Food & Beverage" },
  { id: "cosmetics", name: "Cosmetics" },
  { id: "nutraceuticals", name: "Nutraceuticals" },
  { id: "other", name: "Other" },
];

const PRODUCTS = [
  { id: "ashwagandha", name: "Ashwagandha Extract" },
  { id: "turmeric", name: "Turmeric Extract" },
  { id: "ginger", name: "Ginger Extract" },
  { id: "green-tea", name: "Green Tea Extract" },
  { id: "custom", name: "Custom Extract" },
];

const TIMELINES = [
  { id: "immediate", name: "Immediate" },
  { id: "1-month", name: "Within 1 Month" },
  { id: "3-months", name: "Within 3 Months" },
  { id: "6-months", name: "Within 6 Months" },
  { id: "planning", name: "Planning Phase" },
];

const SampleRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      contactName: "",
      email: "",
      phone: "",
      productInterest: searchParams.get("product") || "",
      quantity: "",
      intendedUse: "",
      specifications: "",
      timeline: "",
      termsAccepted: false,
    },
  });

  // Update product interest when URL parameter changes
  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      form.setValue("productInterest", product);
    }
  }, [searchParams, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(values);
    
    toast({
      title: "Sample Request Submitted",
      description: "We'll review your request and get back to you within 24 hours.",
      duration: 5000,
    });
    
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Request a Sample
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to request product samples. Our team will review your request 
              and get back to you within 24 hours.
            </p>
          </motion.div>

          <Card className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Company Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Company Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter company name" 
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
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Website (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com" 
                              className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                            {INDUSTRIES.map((industry) => (
                              <SelectItem 
                                key={industry.id} 
                                value={industry.id}
                                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-2.5"
                              >
                                {industry.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Mail className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Contact Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Contact Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter phone number" 
                            className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Sample Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Package className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Sample Details</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="productInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Product of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                            {PRODUCTS.map((product) => (
                              <SelectItem 
                                key={product.id} 
                                value={product.id}
                                className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer py-2.5"
                              >
                                {product.name}
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
                        <FormLabel className="text-gray-700">Sample Quantity Required</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 100g, 500g" 
                            className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Specify the quantity needed for evaluation
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="intendedUse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Intended Use</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe how you plan to use the sample..."
                            className="min-h-[100px] bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Globe className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Additional Information</h2>
                  </div>

                  <FormField
                    control={form.control}
                    name="specifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Special Requirements or Specifications</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific requirements or specifications..."
                            className="min-h-[100px] bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors resize-none"
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
                        <FormLabel className="text-gray-700">Project Timeline</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors">
                              <SelectValue placeholder="Select your timeline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
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

                {/* Terms and Conditions */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-gray-700">
                            I agree to the terms and conditions
                          </FormLabel>
                          <FormDescription className="text-gray-500">
                            By submitting this form, you agree to our terms of service and privacy policy.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting Request...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Submit Sample Request</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SampleRequest; 