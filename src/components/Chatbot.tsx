import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Settings, Sparkles, Bot, Trash2, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `
You are the AI Assistant of Lokesh Nargesh. Your job is to answer questions about Lokesh's professional background, skills, projects, work experience, education, and contact details.

Here are Lokesh's details:
- Name: Lokesh Nargesh
- Role: Full Stack Developer
- Location: Mayur Nagar, Musakhedi, Indore, Madhya Pradesh (MP), India
- Phone: +91 88277 29125 (tel:+918827729125)
- Email: nargeshraj2912@gmail.com (mailto:nargeshraj2912@gmail.com)
- Education: B.Tech in Information Technology (IT) from IET-DAVV Indore (Institute of Engineering & Technology, Devi Ahilya Vishwavidyalaya)
- Social Profiles:
  * GitHub: https://github.com/lokesh-nargesh
  * LinkedIn: https://www.linkedin.com/in/lokesh-nargesh/
  * Twitter/X: https://twitter.com/RajNargesh
  * Instagram: https://www.instagram.com/_raj_1_13_7/

Work Experience:
1. Software Developer at Cansvolution (Indore, MP) - August 2024 to Present (Full-Time)
   * Responsibilities: Developing and maintaining scalable web applications using modern frontend and backend technologies. API development, database management, and delivering responsive, secure applications aligned with business needs.
2. Full Stack Developer Intern at Amstech Training Association Pvt Ltd. (Indore, MP) - October 2021 to April 2022 (Full-Time Training)
   * Responsibilities: Comprehensive training in full-stack development, covering frontend/backend technologies, database management, and deployment practices.
3. Web Developer Intern at The Sparks Foundation - November 2021 (Part-Time, Remote)
   * Responsibilities: Worked on real-world web development projects, gaining hands-on experience with modern web technologies and collaborative workflows.
4. Frontend Developer Intern at Suven Consultant & Technology Pvt Ltd. - October 2021 (Part-Time, Remote)
   * Responsibilities: Focused on frontend development, creating responsive user interfaces and implementing interactive features using HTML, CSS, and JavaScript.

Skills:
- Languages: C, C++, Java, Python, JavaScript
- Frameworks & Technologies: Spring, Spring Boot, Hibernate, REST APIs, Node.js, Angular, Bootstrap, React, Tailwind CSS
- Databases: DBMS, MySQL, MongoDB, PostgreSQL, IBMDB, Firebase, Redis
- Developer & DevOps Tools: Git, Bitbucket, Jira, Confluence, Jenkins, OpenShift, Nexus Scan, AppScan
- IDEs: IntelliJ IDEA, Eclipse, VS Code, NetBeans, Spring Tool Suite (STS)
- Libraries & Build Tools: Maven, Apache Libraries, HTTP Libraries, Java Standard Libraries

Projects:
1. Countdown Timer (Featured)
   * Description: A web application that takes a date input and displays the remaining days, hours, minutes, and seconds until that date.
   * Tech: HTML, CSS, JavaScript
   * Live Link: https://dazzling-tereshkova-c26e10.netlify.app/
2. Weather Application (Featured)
   * Description: A weather detection app where users can search for any city to get real-time temperature, humidity, and wind speed data.
   * Tech: HTML, CSS, JavaScript, API
   * Live Link: https://lokesh-nargesh.github.io/Weather/index.html
3. Movies Website
   * Description: A movie search application where users can browse and filter movies by categories like Action, Drama, and Sci-Fi.
   * Tech: HTML, CSS, JavaScript
   * Live Link: https://lokesh-nargesh.github.io/Movies-Web-Pages/movies.html
4. Food Delivery
   * Description: An online food delivery web page showcasing various meal items with a clean and appetizing design.
   * Tech: HTML, CSS, Bootstrap
   * Live Link: https://lokesh-nargesh.github.io/Online-food-delivery/index.html

Guidelines for answers:
- Be polite, professional, and friendly.
- If the user asks about something unrelated to Lokesh or his professional profile, gently remind them that you are Lokesh's portfolio assistant, but try to answer briefly or redirect them to check Lokesh's skills, projects, or contact info.
- Keep your answers concise, engaging, and clear. Use bullet points or lists where appropriate.
- Do not make up any details that are not in the context.
`;

const getLocalResponse = (query: string): string => {
  const q = query.toLowerCase();
  
  // Greetings
  if (/\b(hi|hello|hey|hola|greetings|wassup|sup|morning|afternoon|evening)\b/i.test(q)) {
    return `👋 **Hello!** I am Lokesh Nargesh's AI Portfolio Assistant.\n\nI can answer any questions about Lokesh's projects, experience, skills, education, or contact info. How can I help you today?`;
  }
  
  // Education
  if (q.includes("education") || q.includes("college") || q.includes("study") || q.includes("degree") || q.includes("iet") || q.includes("davv") || q.includes("indore") || q.includes("btech") || q.includes("qualification") || q.includes("university")) {
    return `🎓 **Education Details**:\n\nLokesh completed his **B.Tech in Information Technology (IT)** from the **Institute of Engineering & Technology, Devi Ahilya Vishwavidyalaya (IET-DAVV)**, located in Indore, Madhya Pradesh, India.`;
  }

  // Experience
  if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("intern") || q.includes("career") || q.includes("cansvolution") || q.includes("amstech") || q.includes("spark") || q.includes("suven") || q.includes("history")) {
    return `💼 **Lokesh's Work Experience**:\n\n` +
           `• **Software Developer** at **Cansvolution** (Indore, MP)\n` +
           `  *August 2024 - Present* | Full-Time\n` +
           `  Developing scalable web applications, API development, database management, and designing responsive interfaces.\n\n` +
           `• **Full Stack Developer Intern** at **Amstech Training Association**\n` +
           `  *Oct 2021 - Apr 2022* | Full-Time Training\n` +
           `  Focused on full-stack development, database management, and deployment pipelines.\n\n` +
           `• **Web Developer Intern** at **The Sparks Foundation**\n` +
           `  *Nov 2021* | Part-Time | Remote\n` +
           `  Worked on real-world web development projects using modern web technologies.\n\n` +
           `• **Frontend Developer Intern** at **Suven Consultant & Technology**\n` +
           `  *Oct 2021* | Part-Time | Remote\n` +
           `  Created responsive UIs and implemented interactive features using HTML, CSS, and JS.`;
  }

  // Skills
  if (q.includes("skills") || q.includes("tech") || q.includes("languages") || q.includes("framework") || q.includes("c++") || q.includes("java") || q.includes("python") || q.includes("javascript") || q.includes("databases") || q.includes("react") || q.includes("spring") || q.includes("database") || q.includes("tools")) {
    return `🛠️ **Lokesh's Skills & Technologies**:\n\n` +
           `• **Languages**: C, C++, Java, Python, JavaScript\n` +
           `• **Frameworks & Tech**: Spring, Spring Boot, Hibernate, REST APIs, Node.js, Angular, Bootstrap, React, Tailwind CSS\n` +
           `• **Databases**: DBMS, MySQL, MongoDB, PostgreSQL, IBMDB, Firebase, Redis\n` +
           `• **Developer Tools**: Git, Bitbucket, Jira, Confluence, Jenkins, OpenShift, Nexus Scan, AppScan\n` +
           `• **IDEs**: IntelliJ IDEA, Eclipse, VS Code, NetBeans, STS\n` +
           `• **Libraries & Build Tools**: Maven, Apache Libraries, Java Standard Libraries`;
  }

  // Projects
  if (q.includes("projects") || q.includes("portfolio") || q.includes("built") || q.includes("apps") || q.includes("websites") || q.includes("countdown") || q.includes("weather") || q.includes("movies") || q.includes("food") || q.includes("timer")) {
    return `🚀 **Lokesh's Projects**:\n\n` +
           `1. **Countdown Timer** (Featured)\n` +
           `   - Counts down to a user-provided date.\n` +
           `   - *Tech*: HTML, CSS, JS\n` +
           `   - *Link*: [Live Demo](https://dazzling-tereshkova-c26e10.netlify.app/)\n\n` +
           `2. **Weather Application** (Featured)\n` +
           `   - Real-time weather, temperature, humidity, and wind detection.\n` +
           `   - *Tech*: HTML, CSS, JS, API\n` +
           `   - *Link*: [Live Demo](https://lokesh-nargesh.github.io/Weather/index.html)\n\n` +
           `3. **Movies Website**\n` +
           `   - Browse and filter movies by genre.\n` +
           `   - *Tech*: HTML, CSS, JS\n` +
           `   - *Link*: [Live Demo](https://lokesh-nargesh.github.io/Movies-Web-Pages/movies.html)\n\n` +
           `4. **Food Delivery Page**\n` +
           `   - Clean, appetizing mockup page for meals.\n` +
           `   - *Tech*: HTML, CSS, Bootstrap\n` +
           `   - *Link*: [Live Demo](https://lokesh-nargesh.github.io/Online-food-delivery/index.html)\n\n` +
           `Check out more on [GitHub](https://github.com/lokesh-nargesh)!`;
  }

  // Contact / Socials / Hire
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("number") || q.includes("hire") || q.includes("social") || q.includes("address") || q.includes("location") || q.includes("call") || q.includes("linkedin") || q.includes("github") || q.includes("instagram") || q.includes("twitter")) {
    return `📞 **Contact Lokesh Nargesh**:\n\n` +
           `• **Email**: [nargeshraj2912@gmail.com](mailto:nargeshraj2912@gmail.com)\n` +
           `• **Phone**: [+91 88277 29125](tel:+918827729125)\n` +
           `• **Location**: Mayur Nagar, Musakhedi, Indore, MP, India\n\n` +
           `🌐 **Social Links**:\n` +
           `• [LinkedIn](https://www.linkedin.com/in/lokesh-nargesh/)\n` +
           `• [GitHub](https://github.com/lokesh-nargesh)\n` +
           `• [Twitter/X](https://twitter.com/RajNargesh)\n` +
           `• [Instagram](https://www.instagram.com/_raj_1_13_7/)`;
  }

  // About Lokesh general
  if (q.includes("about") || q.includes("who") || q.includes("lokesh") || q.includes("nargesh") || q.includes("bio") || q.includes("profile") || q.includes("yourself") || q.includes("details")) {
    return `👨‍💻 **Lokesh Nargesh** is a Full Stack Developer from Indore, MP, India. He completed a B.Tech in IT from **IET-DAVV Indore**.\n\nHe has expertise in Java, Spring Boot, React, Node.js, and SQL/NoSQL databases, and works as a Software Developer at **Cansvolution**.\n\nHe is passionate about creating beautiful, scalable digital experiences and is always open to new opportunities!`;
  }

  // Fallback
  return `🤖 **Lokesh's AI Assistant**:\n\nI couldn't quite find details for that specific query. However, I can share info on:\n` +
         `• 👨‍💻 **About** - general info about Lokesh\n` +
         `• 🛠️ **Skills** - coding skills and technologies\n` +
         `• 💼 **Experience** - jobs and training internships\n` +
         `• 🚀 **Projects** - websites and apps built\n` +
         `• 🎓 **Education** - college and graduation\n` +
         `• 📞 **Contact** - details to reach Lokesh\n\n` +
         `Try asking a question related to these topics, or rephrasing your message!`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi! I'm Lokesh's AI Assistant. Ask me anything about his skills, experience, projects, education, or how to contact him!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load Gemini API Key from localStorage if exists
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessageText = inputValue.trim();
    setInputValue("");

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: userMessageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate network delay for AI experience
    setTimeout(async () => {
      let botResponse = "";
      
      if (apiKey) {
        // Run Gemini API call
        try {
          // Construct chat history context
          const chatHistory = messages
            .filter((m) => m.id !== "welcome")
            .concat(userMsg)
            .map((m) => ({
              role: m.sender === "user" ? "user" : "model",
              parts: [{ text: m.text }],
            }));

          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: chatHistory,
                systemInstruction: {
                  parts: [{ text: SYSTEM_PROMPT }],
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
          }

          const data = await response.json();
          if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            botResponse = data.candidates[0].content.parts[0].text;
          } else {
            botResponse = "Oops, I couldn't generate a response. Falling back to local search:\n\n" + getLocalResponse(userMessageText);
          }
        } catch (error) {
          console.error("Gemini API call failed:", error);
          toast({
            title: "API Error",
            description: "Failed to connect to Gemini. Using offline search instead.",
            variant: "destructive",
          });
          botResponse = getLocalResponse(userMessageText);
        }
      } else {
        // Use local matcher
        botResponse = getLocalResponse(userMessageText);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          sender: "bot",
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // Directly submit after state update
    setTimeout(() => {
      const inputForm = document.getElementById("chat-form") as HTMLFormElement;
      if (inputForm) {
        inputForm.requestSubmit();
      }
    }, 50);
  };

  const saveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("gemini_api_key", apiKey);
    setShowSettings(false);
    toast({
      title: apiKey ? "Gemini Key Saved" : "Gemini Key Cleared",
      description: apiKey 
        ? "Chatbot is now running in real-time Gemini AI mode!" 
        : "Chatbot is now running in local responsive mode.",
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "👋 Chat history cleared. What else would you like to know about Lokesh?",
        timestamp: new Date(),
      },
    ]);
  };

  const renderMarkdown = (text: string) => {
    // Escape simple HTML characters, but keep markup safely
    let html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Replace Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Replace Links [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary-foreground font-medium transition-colors">$1</a>');
    
    // Split by newline and wrap bullet points or add breaks
    return html.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <div key={idx} className="flex gap-2 my-1 pl-2">
            <span className="text-primary">•</span>
            <span dangerouslySetInnerHTML={{ __html: line.replace(/^[•\-*]\s*/, '') }} />
          </div>
        );
      }
      return (
        <p key={idx} className="min-h-[1rem] my-1" dangerouslySetInnerHTML={{ __html: line }} />
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="glass-card w-[calc(100vw-2rem)] sm:w-[380px] h-[550px] rounded-2xl flex flex-col shadow-2xl overflow-hidden border border-primary/20 mb-4"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center relative shadow-md">
                  {apiKey ? (
                    <Sparkles size={20} className="text-white animate-pulse-glow" />
                  ) : (
                    <Bot size={22} className="text-white" />
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-1.5">
                    Lokesh's Assistant
                    {apiKey && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-medium">Gemini AI</span>}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">Always active to answer queries</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear conversation"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted/50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="AI Settings"
                  className={`p-1.5 rounded-lg transition-colors ${showSettings ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                >
                  <Settings size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-hidden relative bg-background/30 flex flex-col">
              {showSettings ? (
                /* Settings Panel */
                <div className="absolute inset-0 z-10 bg-background/95 backdrop-blur-md p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                      <Settings size={18} className="text-primary" />
                      Configure AI Assistant
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      By default, this chatbot uses a fast offline keyword-based search engine to answer questions about Lokesh.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      To unlock full generative AI capabilities, you can enter your personal **Gemini API Key** below. The key is saved locally in your browser.
                    </p>
                    
                    <form onSubmit={saveApiKey} className="space-y-3 pt-2">
                      <label className="text-xs font-semibold text-foreground block">
                        Gemini API Key
                      </label>
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setApiKey("");
                            localStorage.removeItem("gemini_api_key");
                            setShowSettings(false);
                            toast({
                              title: "Gemini Key Cleared",
                              description: "Switched back to local matching mode.",
                            });
                          }}
                          className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Clear Key
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground font-medium hover:glow-primary transition-all duration-300"
                        >
                          Save Settings
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="text-[11px] text-muted-foreground/60 border-t border-border/50 pt-3 flex items-center gap-1.5">
                    <HelpCircle size={12} />
                    Get a key from Google AI Studio.
                  </div>
                </div>
              ) : null}

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted text-foreground rounded-tl-none border border-border/50"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <div className="space-y-1.5">
                          {renderMarkdown(message.text)}
                        </div>
                      ) : (
                        <p>{message.text}</p>
                      )}
                      <span className={`text-[9px] block text-right mt-1.5 ${message.sender === 'user' ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted border border-border/50 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-4 py-2 border-t border-border bg-card/20 flex gap-2 overflow-x-auto scrollbar-none py-2 text-xs">
                <button
                  onClick={() => handleQuickQuestion("Who is Lokesh?")}
                  className="px-3 py-1.5 rounded-full glass-card border-primary/20 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
                >
                  👨‍💻 About
                </button>
                <button
                  onClick={() => handleQuickQuestion("What are his skills?")}
                  className="px-3 py-1.5 rounded-full glass-card border-primary/20 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
                >
                  🛠️ Skills
                </button>
                <button
                  onClick={() => handleQuickQuestion("What are his featured projects?")}
                  className="px-3 py-1.5 rounded-full glass-card border-primary/20 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
                >
                  🚀 Projects
                </button>
                <button
                  onClick={() => handleQuickQuestion("What is his work experience?")}
                  className="px-3 py-1.5 rounded-full glass-card border-primary/20 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
                >
                  💼 Experience
                </button>
                <button
                  onClick={() => handleQuickQuestion("How can I contact him?")}
                  className="px-3 py-1.5 rounded-full glass-card border-primary/20 text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 whitespace-nowrap shrink-0 hover:scale-105"
                >
                  📞 Contact
                </button>
              </div>
            </div>

            {/* Chat Input Footer */}
            <form
              id="chat-form"
              onSubmit={handleSendMessage}
              className="p-3 border-t border-border bg-card/50 flex gap-2 items-center"
            >
              <input
                type="text"
                placeholder={apiKey ? "Ask Gemini about Lokesh..." : "Ask Lokesh's AI Assistant..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 text-sm px-3.5 py-2.5 rounded-full bg-background border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:glow-primary disabled:opacity-50 disabled:hover:shadow-none disabled:bg-muted disabled:text-muted-foreground transition-all duration-300"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl glow-primary border-2 border-primary-foreground/10 transition-all duration-300 relative ${isOpen ? 'rotate-90 bg-card hover:bg-card text-foreground' : ''}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background flex items-center justify-center animate-bounce">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
