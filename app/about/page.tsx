import Link from 'next/link'
import Image from 'next/image'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, FileText } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Header Section */}
      <div className="relative py-12 mb-8 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary/10"></div>
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4 text-slate-800">About Me</h1>
          <div className="w-16 h-1 bg-accent mb-8"></div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3">
          <div className="rounded-xl overflow-hidden border shadow-sm bg-white">
            <Image 
              src="/profile-image.jpg" 
              alt="Sanjeev Kumar Badrinath" 
              width={300} 
              height={300} 
              className="w-full h-auto object-cover"
              priority
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-slate-800">Sanjeev Kumar Badrinath</h2>
              <p className="text-slate-600 mb-4">Full Stack Developer & Engineering Leader</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://www.linkedin.com/in/sanjeevkumar-badrinath/" target="_blank">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/yourusername" target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="mailto:youremail@example.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resume.pdf" target="_blank">
                    <FileText className="h-4 w-4 mr-2" />
                    Resume
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <Card className="p-6 shadow-sm h-full">
            <h3 className="text-xl font-bold mb-4 text-slate-800">Summary</h3>
            <p className="text-slate-600 mb-4">
              Experienced software engineer with a track record of building scalable web applications. 
              Passionate about creating elegant solutions to complex problems through clean, maintainable code.
              Skilled in full-stack development, with expertise in Next.js, React, TypeScript, and cloud infrastructure.
            </p>
            <p className="text-slate-600">
              Currently focused on developing modern web applications that deliver exceptional user experiences.
              Strong believer in continuous learning and staying updated with the latest technologies and best practices.
            </p>
          </Card>
        </div>
      </div>

      {/* Experience Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">Work Experience</h3>
        
        <div className="space-y-6">
          <Card className="p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="text-lg font-bold text-slate-800">Senior Software Engineer</h4>
              <span className="text-slate-500">Jan 2021 - Present</span>
            </div>
            <h5 className="text-primary font-medium mb-2">Company Name</h5>
            <p className="text-slate-600 mb-4">
              Led the development of a high-performance web application serving thousands of users.
              Implemented modern front-end architecture using React, TypeScript, and Next.js.
              Collaborated with cross-functional teams to define and implement product features.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Next.js</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">React</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">TypeScript</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">AWS</span>
            </div>
          </Card>
          
          <Card className="p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="text-lg font-bold text-slate-800">Software Developer</h4>
              <span className="text-slate-500">Jun 2018 - Dec 2020</span>
            </div>
            <h5 className="text-primary font-medium mb-2">Previous Company</h5>
            <p className="text-slate-600 mb-4">
              Developed and maintained multiple web applications using JavaScript, React, and Node.js.
              Optimized database queries and API endpoints to improve application performance.
              Participated in code reviews and mentored junior developers.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">JavaScript</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">React</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Node.js</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">MongoDB</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">Education</h3>
        
        <Card className="p-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between mb-2">
            <h4 className="text-lg font-bold text-slate-800">Master of Science in Computer Science</h4>
            <span className="text-slate-500">2016 - 2018</span>
          </div>
          <h5 className="text-primary font-medium mb-2">University Name</h5>
          <p className="text-slate-600">
            Focused on advanced algorithms, distributed systems, and machine learning.
            Graduated with distinction.
          </p>
        </Card>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">Skills</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 text-slate-800">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">JavaScript</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">TypeScript</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">React</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Next.js</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Node.js</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">SQL</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">NoSQL</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">AWS</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Docker</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">CI/CD</span>
            </div>
          </Card>
          
          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 text-slate-800">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Team Leadership</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Project Management</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Problem Solving</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Communication</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Mentoring</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Agile Methodologies</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Projects Section (Optional) */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">Featured Projects</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800">Personal Blog & Portfolio</h4>
            <p className="text-slate-600 mb-4">
              A modern blog and portfolio site built with Next.js, TypeScript, and Supabase.
              Features include user authentication, blog management, newsletter subscription, and more.
            </p>
            <div className="flex gap-2 mt-auto">
              <Button variant="outline" size="sm" asChild>
                <Link href="#">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="#">
                  View Demo
                </Link>
              </Button>
            </div>
          </Card>
          
          {/* Add more projects as needed */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">Get In Touch</h3>
        
        <Card className="p-6 shadow-sm">
          <p className="text-slate-600 mb-6">
            I'm always open to discussing new projects, opportunities, or partnerships. 
            Feel free to reach out through any of the channels below:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              <span className="text-slate-700">youremail@example.com</span>
            </div>
            <div className="flex items-center">
              <Linkedin className="h-5 w-5 mr-3 text-primary" />
              <Link href="https://www.linkedin.com/in/sanjeevkumar-badrinath/" target="_blank" className="text-primary hover:underline">
                LinkedIn Profile
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
} 