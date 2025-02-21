import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";

interface SubscriptionPopupProps {
  trigger: "load" | "scroll" | "exit" | "inactive";
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionPopup = ({ trigger, isOpen, onClose }: SubscriptionPopupProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store that user has subscribed
      localStorage.setItem("subscribedUser", "true");
      
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing. We'll keep you updated.",
        duration: 5000,
      });

      // Close popup after showing success message
      setTimeout(() => {
        onClose();
        setEmail("");
        setPhone("");
      }, 2000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {trigger === "load" && "Welcome to Star Hi Herbs!"}
            {trigger === "scroll" && "Before You Go..."}
            {trigger === "exit" && "Wait! Don't Leave Yet"}
            {trigger === "inactive" && "Still There?"}
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <p className="text-center text-gray-600 mb-6">
            {trigger === "load" && "Subscribe to receive updates about our latest products and innovations."}
            {trigger === "scroll" && "Join our newsletter to stay updated with our latest offerings."}
            {trigger === "exit" && "Subscribe to get exclusive offers and updates."}
            {trigger === "inactive" && "Subscribe to our newsletter while you're here!"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                  Subscribing...
                </>
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            By subscribing, you agree to our{" "}
            <a href="/legal/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPopup; 