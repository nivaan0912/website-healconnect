import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Therapist } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import TherapistCard from "@/components/therapist-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Therapists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const { data: therapists, isLoading, error } = useQuery<Therapist[]>({
    queryKey: ["/api/therapists"],
  });

  const filteredTherapists = therapists?.filter((therapist) => {
    const matchesSearch = 
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = 
      specialtyFilter === "all" || 
      therapist.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  const specialties = therapists ? 
    ["all", ...new Set(therapists.map(t => t.specialty.split(" ")[0].toLowerCase()))] : 
    ["all"];

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600">Failed to load therapists. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-warm py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Therapist
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our directory of licensed mental health professionals and find someone who matches your needs and preferences.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty === "all" ? "All Specialties" : specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto mb-4" />
                    <div className="space-y-2 mb-6">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTherapists && filteredTherapists.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTherapists.map((therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} />
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600">No therapists found matching your search criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSpecialtyFilter("all");
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
