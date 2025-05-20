
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-navy text-portfolio-white p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-portfolio-highlight mb-8">404</h1>
        <p className="text-3xl font-semibold mb-4">Page Not Found</p>
        <p className="text-portfolio-slate mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="btn-primary">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
