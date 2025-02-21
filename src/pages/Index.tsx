import { Button } from "@/components/ui/button";
import { Microscope, Leaf, Shield, ArrowRight, ChevronRight, Globe, Award, Sparkles, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white z-0" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        {/* Decorative circles */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-500/10 rounded-full blur-xl" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  Premium Botanical Ingredients
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Pure, Potent & <br />
                <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Science-Backed
                </span> <br />
                Herbal Extracts
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Empowering supplement manufacturers & private label brands with premium 
                botanical ingredients backed by scientific research and innovation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  size="lg" 
                  className="h-14 text-lg text-white shadow-md hover:shadow-lg transition-shadow" 
                  asChild
                >
                  <Link to="/catalog">
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 text-lg border-2 hover:bg-gray-50/50" 
                  asChild
                >
                  <Link to="/forms/sample-request">
                    Request Sample
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Enhanced Illustration Section */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full max-w-[600px] mx-auto">
                {/* Decorative ring */}
                <div className="absolute inset-0 border-4 border-primary/5 rounded-full animate-[spin_60s_linear_infinite] z-0" />
                <div className="absolute inset-0 border-4 border-primary/3 rounded-full animate-[spin_40s_linear_infinite_reverse] z-0" />
                
                {/* Main illustration container */}
                <div className="relative z-10 transform hover:scale-102 transition-transform duration-500">
                  <div className="aspect-square relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50 shadow-2xl shadow-primary/5 backdrop-blur-sm">
                    <img
                      src="/illustration.svg"
                      alt="Herbal Innovation Illustration"
                      className="w-full h-full object-contain p-6 transform hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-30" />
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-6 right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-8 left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-x-1 rounded-full px-4 py-1 text-sm/6 font-medium ring-1 ring-inset text-primary ring-primary/10 bg-primary/5">
              <Star className="h-4 w-4" />
              Why Choose Us
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Top{" "}
              <div className="relative inline-flex h-[1.5em] overflow-hidden">
                <div className="animate-word-rotate flex flex-col">
                  <span className="block h-[1.5em] leading-[1.5em] bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Nutraceutical</span>
                  <span className="block h-[1.5em] leading-[1.5em] bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Pharmaceutical</span>
                  <span className="block h-[1.5em] leading-[1.5em] bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Cosmeceutical</span>
                  <span className="block h-[1.5em] leading-[1.5em] bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Supplements</span>
                  <span className="block h-[1.5em] leading-[1.5em] bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">Nutraceutical</span>
                </div>
              </div>{" "}
              Brands Trust Us
            </h2>
            <p className="text-gray-600 text-lg">
              We combine traditional wisdom with modern science to deliver 
              premium quality botanical ingredients.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Microscope,
                title: "Scientific Innovation",
                description: "State-of-the-art research and development ensuring optimal efficacy and consistency.",
                color: "bg-blue-500/10 text-blue-500"
              },
              {
                icon: Globe,
                title: "Sustainable Sourcing",
                description: "Ethically sourced ingredients with complete traceability and environmental responsibility.",
                color: "bg-green-500/10 text-green-500"
              },
              {
                icon: Award,
                title: "Quality Excellence",
                description: "GMP-certified facilities with rigorous quality control and testing protocols.",
                color: "bg-purple-500/10 text-purple-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 bg-white rounded-2xl border hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                  feature.color
                )}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Product Categories
          </h2>
            <p className="text-gray-600 text-lg">
              Discover our comprehensive range of premium botanical ingredients
              tailored for various applications.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Microscope,
                title: "Standardized Extracts",
                description: "Scientifically validated active compounds",
                link: "/catalog",
                color: "bg-blue-500/10 text-blue-500"
              },
              {
                icon: Leaf,
                title: "Organic Extracts",
                description: "Certified organic botanical ingredients",
                link: "/ingredients",
                color: "bg-green-500/10 text-green-500"
              },
              {
                icon: Shield,
                title: "Branded Ingredients",
                description: "Proprietary formulations with proven efficacy",
                link: "/catalog",
                color: "bg-purple-500/10 text-purple-500"
              },
              {
                icon: Globe,
                title: "Custom Solutions",
                description: "Tailored formulations for your needs",
                link: "/applications",
                color: "bg-orange-500/10 text-orange-500"
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={category.link}
                  className="group block p-6 bg-white rounded-2xl border hover:border-primary transition-all duration-300 hover:shadow-lg"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                    category.color
                  )}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                <p className="text-gray-600">{category.description}</p>
                  <div className="mt-4 flex items-center text-primary">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
              </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-primary/5 to-primary/10 p-8 md:p-12 rounded-3xl border border-primary/10 relative"
              style={{ pointerEvents: "auto" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience the quality of our premium botanical ingredients. 
                Request a sample today and discover the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-20">
                <Button 
                  asChild 
                  size="lg" 
                  className="h-14 text-lg text-white w-full sm:w-auto relative z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link 
                    to="/forms/sample-request" 
                    className="flex items-center justify-center w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Request Sample
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="h-14 text-lg w-full sm:w-auto relative z-30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link 
                    to="/contact" 
                    className="flex items-center justify-center w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Contact Sales
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
