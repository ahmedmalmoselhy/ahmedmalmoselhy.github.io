import { Button } from "@/components/ui/button";

const NotFound = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-navy text-portfolio-white p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-portfolio-highlight mb-8">404</h1>
        <p className="text-3xl font-semibold mb-4">Page Not Found</p>
        <p className="text-portfolio-slate mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          className="btn-primary"
          onClick={() => window.location.href = '/'}
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
