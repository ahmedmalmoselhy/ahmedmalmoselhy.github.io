
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Github, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout className="pt-28">
      <div className="container mx-auto px-4">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-white mb-4 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-portfolio-slate max-w-2xl mx-auto animate-fade-in">
            Have a question or want to work together? Feel free to contact me through the form below or via my contact details.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-portfolio-white mb-1">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-portfolio-lightNavy border-portfolio-slate/30 focus:border-portfolio-highlight text-portfolio-white placeholder:text-portfolio-slate/70"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-portfolio-white mb-1">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                  className="bg-portfolio-lightNavy border-portfolio-slate/30 focus:border-portfolio-highlight text-portfolio-white placeholder:text-portfolio-slate/70"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-portfolio-white mb-1">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  required
                  className="bg-portfolio-lightNavy border-portfolio-slate/30 focus:border-portfolio-highlight text-portfolio-white placeholder:text-portfolio-slate/70"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-portfolio-white mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={6}
                  required
                  className="bg-portfolio-lightNavy border-portfolio-slate/30 focus:border-portfolio-highlight text-portfolio-white placeholder:text-portfolio-slate/70 resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-portfolio-teal border-t-transparent rounded-full"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-semibold text-portfolio-white mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 rounded-full">
                    <Mail size={24} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-1">Email</h3>
                    <a href="mailto:ahmedalmoselhy.slm@gmail.com" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors">
                      ahmedalmoselhy.slm@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 rounded-full">
                    <Phone size={24} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-1">Phone</h3>
                    <a href="tel:+201117001262" className="text-portfolio-slate hover:text-portfolio-highlight transition-colors">
                      +20 111 700 1262
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 rounded-full">
                    <Linkedin size={24} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-1">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/ahmedmalmoselhy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
                    >
                      linkedin.com/in/ahmedmalmoselhy
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-portfolio-highlight/20 p-3 rounded-full">
                    <Github size={24} className="text-portfolio-highlight" />
                  </div>
                  <div>
                    <h3 className="text-portfolio-white font-medium mb-1">GitHub</h3>
                    <a
                      href="https://github.com/ahmedmalmoselhy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-slate hover:text-portfolio-highlight transition-colors"
                    >
                      github.com/ahmedmalmoselhy
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-semibold text-portfolio-white mb-4">Available For</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-portfolio-navy rounded p-4 border border-portfolio-slate/20">
                  <h3 className="text-portfolio-white font-medium mb-2">Freelance Work</h3>
                  <p className="text-portfolio-slate text-sm">Available for short to medium-term projects</p>
                </div>

                <div className="bg-portfolio-navy rounded p-4 border border-portfolio-slate/20">
                  <h3 className="text-portfolio-white font-medium mb-2">Full-time Positions</h3>
                  <p className="text-portfolio-slate text-sm">Open to discussing new opportunities</p>
                </div>

                <div className="bg-portfolio-navy rounded p-4 border border-portfolio-slate/20">
                  <h3 className="text-portfolio-white font-medium mb-2">Consulting</h3>
                  <p className="text-portfolio-slate text-sm">Technical consulting for your projects</p>
                </div>

                <div className="bg-portfolio-navy rounded p-4 border border-portfolio-slate/20">
                  <h3 className="text-portfolio-white font-medium mb-2">Collaboration</h3>
                  <p className="text-portfolio-slate text-sm">Interested in partnering on innovative projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        {/* <div className="mt-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="section-title mb-6">Location</h2>
          <div className="card p-0 overflow-hidden">
            <div className="bg-portfolio-slate/20 h-80 w-full flex items-center justify-center">
              <p className="text-portfolio-slate">Map Placeholder - Your Location</p>
            </div>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Contact;
