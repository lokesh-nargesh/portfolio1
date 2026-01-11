import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Mayur Nagar, Musakhedi, Indore, MP, India",
    href: null,
  },
  {
    icon: Mail,
    label: "Email",
    value: "nargeshraj2912@gmail.com",
    href: "mailto:nargeshraj2912@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 88277 29125",
    href: "tel:+918827729125",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/lokesh-nargesh", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/lokesh-nargesh/", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/RajNargesh", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/_raj_1_13_7/", label: "Instagram" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-2xl h-96 bg-gradient-to-t from-primary/10 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Get in touch</span>
          <h2 className="section-heading mt-2">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover-lift"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="glass-card rounded-xl p-6"
              >
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-secondary hover:bg-primary/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} className="text-muted-foreground hover:text-primary" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 animate-pulse-glow">
                <Send size={32} className="text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-4">
                Let's Work Together
              </h3>
              
              <p className="text-muted-foreground mb-8">
                Have a project in mind? Let's create something amazing together. 
                Drop me a message and I'll get back to you as soon as possible.
              </p>
              
              <motion.a
                href="mailto:nargeshraj2912@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:glow-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Send Me an Email
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
