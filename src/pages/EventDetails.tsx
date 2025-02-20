import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { getEventBySlug } from '@/data/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  User,
  Building,
  Briefcase,
  Ticket,
  ChevronRight,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

type RegistrationFormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  interestedProducts: string;
  additionalNotes?: string;
};

const EventDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const event = getEventBySlug(slug || '');
  const [activeTab, setActiveTab] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    interestedProducts: '',
    additionalNotes: '',
  });

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Registration Successful!",
      description: "Thank you for registering for the event. You will receive a confirmation email shortly.",
    });

    setIsSubmitting(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      interestedProducts: '',
      additionalNotes: '',
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isRegistrationOpen = new Date(event.registrationDeadline) > new Date();
  const hasAvailableSpots = event.registrationType.availableSpots > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                <p className="text-xl">{event.shortDescription}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                  <TabsTrigger value="speakers" className="flex-1">Speakers</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Overview</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{format(new Date(event.startDate), 'MMMM d, yyyy')}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{event.location.venue}, {event.location.city}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Schedule</CardTitle>
                      <CardDescription>Detailed timeline of activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {event.schedule.map((item) => (
                          <div key={item.id} className="border-l-2 border-gray-200 pl-4">
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>
                                {format(new Date(item.startTime), 'h:mm a')} - {format(new Date(item.endTime), 'h:mm a')}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            {item.speaker && (
                              <div className="mt-2 flex items-center">
                                <img
                                  src={item.speaker.image}
                                  alt={item.speaker.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{item.speaker.name}</p>
                                  <p className="text-xs text-gray-500">{item.speaker.title}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="speakers">
                  <Card>
                    <CardHeader>
                      <CardTitle>Speakers</CardTitle>
                      <CardDescription>Meet our distinguished speakers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {event.speakers.map((speaker) => (
                          <div key={speaker.id} className="flex space-x-4">
                            <img
                              src={speaker.image}
                              alt={speaker.name}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{speaker.name}</h4>
                              <p className="text-sm text-gray-600">{speaker.title}</p>
                              <p className="text-sm text-gray-500">{speaker.company}</p>
                              <p className="text-sm text-gray-600 mt-2">{speaker.bio}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Register for Event</CardTitle>
                  <CardDescription>Fill out the form below to register</CardDescription>
                </CardHeader>
                <CardContent>
                  {isRegistrationOpen && hasAvailableSpots ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name *
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title *
                          </label>
                          <Input
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="interestedProducts" className="block text-sm font-medium text-gray-700 mb-1">
                            Products of Interest *
                          </label>
                          <Input
                            id="interestedProducts"
                            name="interestedProducts"
                            value={formData.interestedProducts}
                            onChange={handleInputChange}
                            placeholder="e.g., Turmeric Extract, Ashwagandha"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Notes
                        </label>
                        <Textarea
                          id="additionalNotes"
                          name="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={handleInputChange}
                          placeholder="Any specific requirements or questions?"
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Register for Event
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-gray-500 text-center">
                        {event.registrationType.availableSpots} spots remaining
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {!isRegistrationOpen 
                          ? "Registration Closed" 
                          : "No Available Spots"}
                      </h3>
                      <p className="text-gray-600">
                        {!isRegistrationOpen 
                          ? "The registration deadline for this event has passed." 
                          : "This event has reached its maximum capacity."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails; 