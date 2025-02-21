import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isFuture, isPast, isToday } from 'date-fns';
import { Link } from 'react-router-dom';
import { Event, EventCategory, EventStatus } from '@/types/events';
import { events } from '@/data/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  MapPin,
  Search,
  Users,
  ArrowRight,
  Filter,
  Clock,
  Building,
  Star
} from 'lucide-react';

const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>('all');

  // Function to determine event status based on dates
  const getEventStatus = (startDate: string, endDate: string): EventStatus => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (isPast(end)) {
      return 'Past';
    } else if (isFuture(start)) {
      return 'Upcoming';
    } else if (isToday(start) || (start <= now && end >= now)) {
      return 'Ongoing';
    }
    return 'Past';
  };

  // Sort and filter events
  const filteredEvents = events
    .map(event => ({
      ...event,
      currentStatus: getEventStatus(event.startDate, event.endDate)
    }))
    .sort((a, b) => {
      const priority = { 'Upcoming': 0, 'Ongoing': 1, 'Past': 2 };
      return priority[a.currentStatus] - priority[b.currentStatus];
    })
    .filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || event.currentStatus === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

  // Status badge styles
  const getStatusStyles = (status: EventStatus) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-green-100 text-green-800';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'Past':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            Industry Events
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Events & Trade Shows</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at industry-leading events worldwide. Discover our latest innovations and meet our expert team.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events by name, description, or location..."
              className="pl-10 h-11 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as EventCategory | 'all')}>
              <SelectTrigger className="w-[180px] bg-white">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Trade Show">Trade Show</SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Webinar">Webinar</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as EventStatus | 'all')}>
              <SelectTrigger className="w-[180px] bg-white">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col"
            >
              <div className="mb-6">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyles(event.currentStatus)}`}>
                      {event.currentStatus}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Building className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">{event.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.shortDescription}</p>
              </div>

              <div className="space-y-3 mt-auto mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span>{format(new Date(event.startDate), 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span>{event.location.city}, {event.location.country}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  <span>{event.currentAttendees}/{event.maxAttendees} Attendees</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link to={`/events/${event.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/events/${event.slug}#register`} className="flex-1">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm"
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 