import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Filmmaker, ContactMessage } from "@/lib/types";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RectangleEllipsis, MapPin, Phone, Instagram, Linkedin, Youtube } from "lucide-react";
import { SiVimeo } from "react-icons/si";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  projectType: z.string().min(1, { message: "Please select a project type" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: filmmaker } = useQuery<Filmmaker>({
    queryKey: ['/api/filmmaker'],
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => 
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="page-section bg-primary py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-foreground">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Interested in collaborating on a project? Reach out to discuss how we can create something remarkable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="bg-secondary border-secondary focus:border-accent text-foreground" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Your email address" 
                          className="bg-secondary border-secondary focus:border-accent text-foreground" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Project Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-secondary focus:border-accent text-foreground">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="documentary">Documentary</SelectItem>
                          <SelectItem value="narrative">Narrative Film</SelectItem>
                          <SelectItem value="music">Music Video</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/90">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project" 
                          className="bg-secondary border-secondary focus:border-accent text-foreground resize-none" 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-primary-foreground transition duration-300 font-heading font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-secondary p-8 rounded-lg h-full">
              <h3 className="font-heading font-semibold text-2xl mb-6 text-foreground">Contact Information</h3>
              
              {filmmaker && (
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary p-3 rounded-full mr-4">
                      <RectangleEllipsis className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Email</p>
                      <a 
                        href={`mailto:${filmmaker.email}`} 
                        className="text-foreground hover:text-accent transition duration-300"
                      >
                        {filmmaker.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Location</p>
                      <p className="text-foreground">{filmmaker.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Phone</p>
                      <a 
                        href={`tel:${filmmaker.phone}`} 
                        className="text-foreground hover:text-accent transition duration-300"
                      >
                        {filmmaker.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-10">
                <h4 className="font-heading font-medium text-xl mb-4 text-foreground">Follow Me</h4>
                <div className="flex space-x-4">
                  {filmmaker && (
                    <>
                      <a 
                        href={filmmaker.socials.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-primary hover:bg-accent p-3 rounded-full text-foreground hover:text-primary-foreground transition duration-300"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a 
                        href={filmmaker.socials.vimeo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-primary hover:bg-accent p-3 rounded-full text-foreground hover:text-primary-foreground transition duration-300"
                        aria-label="Vimeo"
                      >
                        <SiVimeo className="h-5 w-5" />
                      </a>
                      <a 
                        href={filmmaker.socials.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-accent p-3 rounded-full text-foreground hover:text-primary-foreground transition duration-300"
                        aria-label="YouTube"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a 
                        href={filmmaker.socials.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-accent p-3 rounded-full text-foreground hover:text-primary-foreground transition duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
