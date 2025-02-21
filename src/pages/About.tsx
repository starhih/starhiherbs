import { motion } from "framer-motion";
import { Shield, Microscope, Award, Target, Leaf, Heart, Trophy, Users, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2004;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              About Star Hi Herbs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Leaders in standardized herbal extracts and probiotics since 2004
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/director.jpg.png"
                  alt="Mr. Firoz Hussain - Managing Director"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">Visionary Leader</p>
                    <p className="text-sm text-gray-600">Chemical Engineering</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-3xl font-semibold mb-6">Our Managing Director</h2>
              <h3 className="text-xl text-primary font-medium mb-4">Mr. Firoz Hussain</h3>
              <p className="text-gray-600 mb-6">
                A visionary entrepreneur dedicated to leading Star Hi Herbs Pvt Ltd toward innovation and excellence in the herbal industry. With extensive experience in herbal extraction, product development, and business operations, he has established the company as a trusted name in natural health solutions.
              </p>
              <p className="text-gray-600 mb-6">
                A distinguished alumnus of Dayananda Sagar College of Engineering, Bangalore, with a degree in Chemical Engineering, Mr. Hussain combines strategic thinking with practical execution to deliver high-quality, effective herbal products.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-sm text-gray-600">Chemical Engineering, Dayananda Sagar College</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold mb-2">Expertise</h4>
                  <p className="text-sm text-gray-600">Herbal Extraction & Product Development</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2004 in Bangalore, India, Star Hi Herbs Pvt Ltd draws on the extensive experience of its founders in the natural dietary supplements and nutraceuticals sectors. Over {yearsOfExperience} years, we've built a trusted reputation among clients worldwide, delivering exceptional products and innovative solutions with unparalleled service.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <span className="text-3xl font-bold text-primary">{yearsOfExperience}+</span>
                  <p className="text-sm text-gray-600 mt-2">Years of Excellence</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <span className="text-3xl font-bold text-primary">100+</span>
                  <p className="text-sm text-gray-600 mt-2">Global Partners</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/facility.jpg"
                  alt="Star Hi Herbs Facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <Award className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">Quality Certified</p>
                    <p className="text-sm text-gray-600">cGMP Guidelines</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Mission & Vision</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                "To enable people to achieve their best health, vitality, and well-being through natural and innovative solutions that support a long, active life."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <Leaf className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                "To be a leader in the wellness industry, driving innovation and setting high standards for products that positively impact lives and promote sustainable health."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Our Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "FSSC",
              "HACCP",
              "WHO GMP",
              "ISO",
              "Halal",
              "Kosher",
              "Ayush",
              "GMP"
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold mb-4">Company Awards</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "2023",
                title: "Excellence in Herbal Innovation",
                organization: "Natural Products Association",
                description: "Recognized for breakthrough developments in herbal extraction technology"
              },
              {
                year: "2022",
                title: "Best Quality Standards",
                organization: "Quality Council of India",
                description: "Awarded for maintaining exceptional quality standards in manufacturing"
              },
              {
                year: "2021",
                title: "Export Excellence Award",
                organization: "Federation of Indian Export Organizations",
                description: "Honored for outstanding contribution to Indian exports"
              }
            ].map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <Trophy className="w-12 h-12 text-primary mb-4" />
                <p className="text-sm text-primary font-medium mb-2">{award.year}</p>
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{award.organization}</p>
                <p className="text-gray-600">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Microscope className="w-10 h-10" />,
                title: "Advanced R&D",
                description: "State-of-the-art facilities with HPLC, GC, and UV equipment for continuous innovation."
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Quality Assurance",
                description: "Strict control over cultivation and manufacturing processes ensuring premium quality."
              },
              {
                icon: <Heart className="w-10 h-10" />,
                title: "Global Impact",
                description: "Improving health and wellness of individuals across the globe with natural solutions."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold mb-4">Our Leadership Team</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "HM Firoz",
                position: "Founder Managing Director",
                expertise: "30+ Years of Experience in Nutraceutical business",
                education: "Chemical Engineer - Dayananda Sagar Institutions",
                image: "/director.jpg.png"
              },
              {
                name: "Najish N Nadaf",
                position: "Global Marketing Head",
                expertise: "20+ Years of Experience in Marketing & Business Development",
                education: "MBA - Karnataka University",
                image: "/placeholder.svg"
              },
              {
                name: "Keshava",
                position: "Product Development and Marketing",
                expertise: "24+ Years of Experience in Business Development",
                education: "BSc-CZS - Kuvempu University",
                image: "/placeholder.svg"
              },
              {
                name: "Balamurali Krishna K",
                position: "Director - Technical & Business Development",
                expertise: "Over 30 years of experience in Production & Operations",
                education: "Chemical Engineer & PGDM from IIMM",
                image: "/placeholder.svg"
              },
              {
                name: "Youhan Hussain",
                position: "International Business Manager",
                expertise: "Over 5+ Years of experience in International Marketing",
                education: "MBA in Marketing at Liverpool University",
                image: "/placeholder.svg"
              },
              {
                name: "Radhakrishna Patil",
                position: "General Manager",
                expertise: "20+ Years of Experience in QA & QC",
                education: "MSc- Chemistry - Mangalore University",
                image: "/placeholder.svg"
              },
              {
                name: "Dr. Sadashiv",
                position: "General Manager & R&D Head",
                expertise: "20+ Years of Experience in R&D",
                education: "MSc PHD- Mysore University, Post doc - KwaZulu-Natal University",
                image: "/placeholder.svg"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="aspect-square relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.expertise}</p>
                  <p className="text-gray-500 text-sm italic">{member.education}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
