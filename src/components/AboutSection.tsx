import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, GraduationCap, Heart, Code } from "lucide-react";

const highlights = [
  { icon: GraduationCap, label: "B.Tech in IT", value: "IET-DAVV Indore" },
  { icon: MapPin, label: "Based in", value: "Madhya Pradesh, India" },
  { icon: Code, label: "Focus", value: "Full Stack Development" },
  { icon: Heart, label: "Passion", value: "Learning & Traveling" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Get to know me</span>
          <h2 className="section-heading mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Born and raised in <span className="text-foreground font-medium">Madhya Pradesh, India</span>, 
                I've always been fascinated by technology and how it can transform ideas into reality. 
                My journey in tech began during my engineering days at <span className="text-primary font-medium">IET-DAVV Indore</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                As a <span className="text-foreground font-medium">Full Stack Developer</span>, I enjoy working across the entire 
                development stack, from crafting pixel-perfect UIs to building robust backend systems. 
                I'm constantly learning and exploring new technologies to stay at the cutting edge.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me <span className="text-primary font-medium">traveling</span> and 
                exploring new places, spending quality time with friends and family, or diving into the latest 
                tech trends. I believe in maintaining a positive attitude and bringing enthusiasm to everything I do.
              </p>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                className="glass-card rounded-2xl p-6 hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={24} />
                </div>
                <p className="text-muted-foreground text-sm mb-1">{item.label}</p>
                <p className="text-foreground font-medium">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
