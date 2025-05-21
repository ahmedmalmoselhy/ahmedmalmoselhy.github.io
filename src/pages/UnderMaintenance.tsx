
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderMaintenance: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-portfolio-navy p-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <Wrench className="h-24 w-24 text-portfolio-highlight" />
        </div>
        <h1 className="text-4xl font-bold text-portfolio-white mb-4">Under Maintenance</h1>
        <p className="text-portfolio-slate text-lg mb-8">
          We're currently working on making improvements to our site. Please check back soon!
        </p>
        <div className="flex justify-center">
          <Button asChild variant="outline" className="btn-primary">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
