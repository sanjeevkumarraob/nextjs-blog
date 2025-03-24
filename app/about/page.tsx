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
              <h2 className="text-2xl font-bold text-slate-800">
                Sanjeev Kumar Badrinath
              </h2>
              <p className="text-slate-600 mb-4">
                Senior DevOps Engineer & Platform Architect
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="https://www.linkedin.com/in/sanjeevkumar-badrinath/"
                    target="_blank"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="mailto:sanjeevkumarrao@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/Sanjeev_kumar_badrinath_resume.pdf" target="_blank">
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
            <h3 className="text-xl font-bold mb-4 text-slate-800">Professional Summary</h3>
            <p className="text-slate-600 mb-4">
              Senior DevOps Engineer and Platform Architect with 16+ years of experience in cloud infrastructure, automation, and full-stack development. Expert in designing and implementing cloud-native solutions with recent focus on AI/ML infrastructure. Proven track record in leading complex platform migrations, architecting scalable solutions, and driving innovation across enterprise environments.
            </p>
            <p className="text-slate-600 mb-4">
              Core Competencies: Cloud Platform Architecture & Migration, DevOps & Infrastructure Automation, AI/ML Infrastructure Management, API Platform Design & Implementation, Team Leadership & Cross-functional Collaboration, Continuous Integration/Deployment (CI/CD).
            </p>
          </Card>
        </div>
      </div>

      {/* Experience Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">
          Work Experience
        </h3>

        <div className="space-y-6">
          <Card className="p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="text-lg font-bold text-slate-800">
                Senior DevOps Engineer
              </h4>
              <span className="text-slate-500">June 2022 - Present</span>
            </div>
            <h5 className="text-primary font-medium mb-2">PEXA Ltd</h5>
            <p className="text-slate-600 mb-4">
              Led the APIM Platform team, responsible for enabling and consuming APIs through KONG gateway. Key achievements include:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Successfully designed and implemented the APIM platform from ground up as an individual contributor</li>
              <li>Spearheaded complete re-architecture, migrating from Kong Enterprise to Kong Konnect with Auth0 integration</li>
              <li>Took ownership of PEXA AI Assistant and managed it independently</li>
              <li>Won Best Marketing award in company Hackathon</li>
              <li>Completed AWS Certified AI Practitioner certification</li>
            </ul>
          </Card>

          <Card className="p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h4 className="text-lg font-bold text-slate-800">
                Senior DevOps Engineer
              </h4>
              <span className="text-slate-500">April 2021 - June 2022</span>
            </div>
            <h5 className="text-primary font-medium mb-2">Cognizant Technology Solutions (ANZ Bank)</h5>
            <p className="text-slate-600 mb-4">
              Worked with the Business Bankers Lending team, handling lending applications for small and medium businesses. Notable achievements:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4">
              <li>Automated local setup of 14+ micro services using a single command, saving 800+ hours of developer time</li>
              <li>Created Synthetic Monitoring for end-to-end application flow using Dynatrace</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6 text-slate-800">Technical Expertise</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 text-slate-800">
              Cloud & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">AWS</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">GCP</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Kubernetes</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Docker</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Kong</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Terraform</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Auth0</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">OKTA</span>
            </div>
          </Card>

          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 text-slate-800">
              Development & Automation
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Python</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Ruby</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">React</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">NextJS</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">Jenkins</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">GitHub Actions</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-medium rounded-full">NodeJS</span>
            </div>
          </Card>

          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 text-slate-800">
              Certifications
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent/10 text-accent font-medium rounded-full">AWS Certified AI Practitioner (2024)</span>
              <span className="px-3 py-1 bg-accent/10 text-accent font-medium rounded-full">Hashicorp Certified Terraform Associate</span>
              <span className="px-3 py-1 bg-accent/10 text-accent font-medium rounded-full">ISC2 Certified in Cybersecurity</span>
              <span className="px-3 py-1 bg-accent/10 text-accent font-medium rounded-full">SAFe Certified Scrum Master</span>
            </div>
          </Card>

          <Card className="p-6 shadow-sm">
            <h4 className="text-lg font-bold mb-4 text-slate-800">
              Monitoring & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Splunk</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Dynatrace</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">AppDynamics</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">SumoLogic</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">Atlassian Suite</span>
              <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">RabbitMQ</span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
} 