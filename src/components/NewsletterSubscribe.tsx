import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail("");

    toast({
      title: "Successfully Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
      duration: 5000,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-gray-600 text-sm">
          Stay updated with our latest products, research, and industry insights.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 pl-4 pr-32 bg-white border-gray-200 hover:border-primary/50 focus:border-primary transition-colors"
            disabled={isSubmitting || isSubscribed}
          />
          <Button
            type="submit"
            className="absolute right-1 top-1 h-9 text-white"
            disabled={isSubmitting || isSubscribed}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : isSubscribed ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
      </form>

      {isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 rounded-lg"
        >
          <p className="text-sm text-green-700 text-center">
            Thank you for subscribing! You'll receive our next newsletter in your inbox.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default NewsletterSubscribe; 