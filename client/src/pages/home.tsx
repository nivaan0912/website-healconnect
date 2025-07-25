import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Users, MessageCircle, Shield, Clock, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your Safe Space for{" "}
                <span className="text-primary">Mental Wellness</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with licensed therapists, share anonymously in our supportive community,
                and find peer support through secure chat - all in one caring platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                  <Link href="/therapists">Find a Therapist</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Peaceful meditation scene"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">100% Anonymous & Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Three Ways to Get Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you need professional help, community support, or peer connection,
              we're here for you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 group hover:shadow-lg transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <UserCheck className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Licensed Therapists</h3>
                <p className="text-gray-600 mb-6">
                  Browse profiles and connect with verified mental health professionals
                  who match your needs and preferences.
                </p>
                <Button asChild variant="link" className="text-primary">
                  <Link href="/therapists">Find Therapists →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 group hover:shadow-lg transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-secondary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Anonymous Community</h3>
                <p className="text-gray-600 mb-6">
                  Share your thoughts and feelings anonymously. Get support and encouragement
                  from people who understand.
                </p>
                <Button asChild variant="link" className="text-secondary">
                  <Link href="/community">Join Community →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 group hover:shadow-lg transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="text-accent h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Peer Chat Support</h3>
                <p className="text-gray-600 mb-6">
                  Connect anonymously with others for real-time conversations,
                  mutual support, and understanding.
                </p>
                <Button asChild variant="link" className="text-accent">
                  <Link href="/chat">Start Chatting →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How MindConnect Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting support for your mental health should be simple, accessible, and private.
              Here's how our platform helps you on your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Path</h3>
              <p className="text-gray-600">
                Browse therapist profiles, join anonymous community discussions,
                or connect with peers through our chat feature.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Safely</h3>
              <p className="text-gray-600">
                All interactions are anonymous and secure. Share as much or as little
                as you're comfortable with in our protected environment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Support</h3>
              <p className="text-gray-600">
                Receive professional guidance, community encouragement, and peer understanding
                to help you navigate your mental health journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Privacy & Safety Come First
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built MindConnect with privacy-first principles and safety measures
              to create a truly secure space for your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="text-primary h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Anonymity</h3>
                <p className="text-gray-600 text-sm">
                  No personal information required. Your identity remains completely private.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="text-primary h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                <p className="text-gray-600 text-sm">
                  All conversations are encrypted and cannot be accessed by anyone else.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="text-primary h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h3>
                <p className="text-gray-600 text-sm">
                  Someone is always here to listen. Connect with peer support whenever you need it most.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="text-primary h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Crisis Support</h3>
                <p className="text-gray-600 text-sm">
                  24/7 crisis resources and immediate professional support when needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            You Don't Have to Face This Alone
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Whether you're seeking professional help, community support, or just someone to talk to,
            MindConnect is here for you. Take the first step towards better mental health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/therapists">Find a Therapist</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
