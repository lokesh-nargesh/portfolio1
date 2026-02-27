import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Software Developer",
    company: "Cansvolution",
    location: "Indore, Madhya Pradesh",
    duration: "August 2024 - Present",
    type: "Full-Time",
    description: "Developing and maintaining scalable web applications using modern frontend and backend technologies. Responsible for API development, database management, and delivering responsive, secure applications aligned with business needs.",
  },
  {
    role: "Full Stack Developer Intern",
    company: "Amstech Training Association Pvt Ltd.",
    location: "Indore, Madhya Pradesh",
    duration: "Oct 2021 - Apr 2022",
    type: "Full-Time Training",
    description: "Comprehensive training in full stack development, covering frontend and backend technologies, database management, and deployment practices.",
  },
  {
    role: "Web Developer Intern",
    company: "Spark Foundation",
    location: "Remote",
    duration: "November 2021",
    type: "Part-Time",
    description: "Worked on real-world web development projects, gaining hands-on experience with modern web technologies and collaborative development workflows.",
  },
  {
    role: "Frontend Developer Intern",
    company: "Suven Consultant & Technology Pvt Ltd.",
    location: "Remote",
    duration: "October 2021",
    type: "Part-Time",
    description: "Focused on frontend development, creating responsive user interfaces and implementing interactive features using HTML, CSS, and JavaScript.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">My journey so far</span>
          <h2 className="section-heading mt-2">
            Training & <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2 glow-primary" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-8 md:pl-0`}>
                  <motion.div
                    className="glass-card rounded-2xl p-6 hover-lift"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      {exp.type}
                    </span>
                    
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {exp.role}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-primary mb-2 justify-start md:justify-end" style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}>
                      <Briefcase size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    
                    <div className={`flex items-center gap-6 text-sm text-muted-foreground mb-4 whitespace-nowrap ${ index % 2 === 0 ? "md:justify-end" : "justify-start"}`}>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground">{exp.description}</p>
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
