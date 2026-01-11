import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Database, Wrench, Layout, Monitor, Package } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["C", "C++", "Java", "Python", "JavaScript"],
    color: "primary",
  },
  {
    title: "Frameworks & Technologies",
    icon: Layout,
    skills: ["Spring", "Spring Boot", "Hibernate", "REST APIs", "Node.js", "Angular", "Bootstrap"],
    color: "primary",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["DBMS", "MySQL", "MongoDB", "PostgreSQL", "IBMDB", "Firebase", "Redis"],
    color: "primary",
  },
  {
    title: "Developer & DevOps Tools",
    icon: Wrench,
    skills: ["Git", "Bitbucket", "Jira", "Confluence", "Jenkins", "OpenShift", "Nexus Scan", "AppScan"],
    color: "accent",
  },
  {
    title: "IDEs",
    icon: Monitor,
    skills: ["IntelliJ IDEA", " Eclipse", "VS Code", "NetBeans", "Spring Tool Suite (STS)"],
    color: "accent",
  },
  {
    title: "Libraries & Build Tools",
    icon: Package,
    skills: ["Maven", " Apache Libraries", "HTTP Libraries", " Java Standard Libraries"],
    color: "accent",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">What I work with</span>
          <h2 className="section-heading mt-2">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-card rounded-2xl p-6 hover-lift"
            >
              <div className={`w-14 h-14 rounded-xl ${category.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'} flex items-center justify-center mb-6`}>
                <category.icon className={category.color === 'primary' ? 'text-primary' : 'text-accent'} size={28} />
              </div>
              
              <h3 className="text-xl font-display font-bold mb-4">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.3, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
