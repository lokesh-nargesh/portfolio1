import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Countdown Timer",
    description: "A web application that takes a date input and displays the remaining days, hours, minutes, and seconds until that date.",
    image: "https://cdn.dorik.com/61f362d71ef20c00110748eb/62bd217e6db1d50011c54a53/images/timer3_5ioahyal.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://dazzling-tereshkova-c26e10.netlify.app/",
    featured: true,
  },
  {
    title: "Weather Application",
    description: "A weather detection app where users can search for any city to get real-time temperature, humidity, and wind speed data.",
    image: "https://cdn.dorik.com/61f362d71ef20c00110748eb/62bd217e6db1d50011c54a53/images/m-clouds_tdng4xk9.jpg",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    liveUrl: "https://lokesh-nargesh.github.io/Weather/index.html",
    featured: true,
  },
  {
    title: "Movies Website",
    description: "A movie search application where users can browse and filter movies by categories like Action, Drama, and Sci-Fi.",
    image: "https://cdn.dorik.com/61f362d71ef20c00110748eb/62bd217e6db1d50011c54a53/images/Movies1_070z3gpc.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://lokesh-nargesh.github.io/Movies-Web-Pages/movies.html",
    featured: false,
  },
  {
    title: "Food Delivery",
    description: "An online food delivery web page showcasing various meal items with a clean and appetizing design.",
    image: "https://cdn.dorik.com/61f362d71ef20c00110748eb/62bd217e6db1d50011c54a53/images/salad_ft16giru.jpg",
    tech: ["HTML", "CSS", "Bootstrap"],
    liveUrl: "https://lokesh-nargesh.github.io/Online-food-delivery/index.html",
    featured: false,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium">Things I've built</span>
          <h2 className="section-heading mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden hover-lift">
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-full bg-primary text-primary-foreground mx-2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={24} />
                    </motion.a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="glass-card rounded-xl p-6 hover-lift group h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <ExternalLink size={18} className="text-muted-foreground hover:text-primary" />
                  </a>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs font-medium bg-secondary text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/lokesh-nargesh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
