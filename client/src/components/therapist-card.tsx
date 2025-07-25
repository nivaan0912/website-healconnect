import { type Therapist } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Star, Mail, Phone } from "lucide-react";

interface TherapistCardProps {
  therapist: Therapist;
}

export default function TherapistCard({ therapist }: TherapistCardProps) {
  const handleContact = () => {
    // In a real app, this would open a contact form or modal
    window.location.href = `mailto:${therapist.email}`;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="text-center">
          {therapist.imageUrl && (
            <img
              src={therapist.imageUrl}
              alt={therapist.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{therapist.name}</h3>
          <p className="text-primary mb-4 font-medium">{therapist.specialty}</p>
          
          <div className="space-y-2 mb-6 text-left">
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{therapist.education}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{therapist.experience}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-400 fill-current" />
              <span>{therapist.rating}</span>
            </div>
          </div>
          
          {therapist.bio && (
            <p className="text-sm text-gray-600 mb-4 text-left line-clamp-3">
              {therapist.bio}
            </p>
          )}
          
          <div className="space-y-2">
            <Button 
              onClick={handleContact}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact {therapist.name.split(' ')[1]}
            </Button>
            
            {therapist.phone && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.href = `tel:${therapist.phone}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
