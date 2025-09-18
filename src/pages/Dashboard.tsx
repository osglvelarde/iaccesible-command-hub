import { useState, useEffect } from "react";
import { 
  Home, 
  BarChart3, 
  Zap, 
  FileText, 
  Map, 
  Monitor, 
  FolderEdit, 
  TestTube, 
  BookOpen, 
  Settings, 
  Users 
} from "lucide-react";
import { NavigationBar } from "@/components/NavigationBar";
import { ToolCard } from "@/components/ToolCard";
import { ToolGroup } from "@/components/ToolGroup";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [animationDelay, setAnimationDelay] = useState(0);

  // Staggered entrance animations
  useEffect(() => {
    const cards = document.querySelectorAll(".tool-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-entrance");
      }, index * 100);
    });
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, this would handle logout logic
    console.log("User logged out");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Welcome Section */}
          <div className="text-center space-y-4 animate-entrance">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome to iAccessible Command Center
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive accessibility testing and monitoring platform. 
              Choose from the tools below to ensure your digital content meets accessibility standards.
            </p>
          </div>

          {/* Reports & Dashboards */}
          <ToolGroup title="Reports & Dashboards" className="animate-entrance-delayed">
            <ToolCard
              icon={Home}
              title="Dashboard"
              description="View your accessibility metrics, recent scans, and overall compliance status."
              href="/dashboard"
              className="tool-card"
            />
            <ToolCard
              icon={BarChart3}
              title="Report Builder"
              description="Create custom accessibility reports and track compliance over time."
              href="/reports"
              className="tool-card"
            />
          </ToolGroup>

          {/* Scanning Tools */}
          <ToolGroup title="Scanning Tools">
            <ToolCard
              icon={Zap}
              title="Webpage Scan"
              description="Run ad-hoc accessibility scans on any webpage to identify issues quickly."
              href="/scan/ad-hoc"
              className="tool-card"
            />
            <ToolCard
              icon={FileText}
              title="PDF Accessibility Scan"
              description="Analyze PDF documents for accessibility compliance and get detailed remediation guidance."
              href="/pdf-scan"
              className="tool-card"
            />
            <ToolCard
              icon={Map}
              title="Sitemap Generator"
              description="Generate comprehensive sitemaps for accessibility testing across your entire website."
              href="/sitemap"
              className="tool-card"
            />
          </ToolGroup>

          {/* Intake & Monitoring */}
          <ToolGroup title="Intake & Monitoring">
            <ToolCard
              icon={Monitor}
              title="Scan Monitor"
              description="Monitor ongoing scans and view the status of your accessibility testing workflows."
              href="/scans"
              badge={{ text: "3 Running • 1 Failed", variant: "warning" }}
              className="tool-card"
            />
            <ToolCard
              icon={FolderEdit}
              title="Edit Intake Form"
              description="Customize the intake forms used to collect accessibility requirements from stakeholders."
              href="/intake"
              className="tool-card"
            />
          </ToolGroup>

          {/* Manual Testing */}
          <ToolGroup title="Manual Testing">
            <ToolCard
              icon={TestTube}
              title="Manual Testing Tool"
              description="Conduct thorough manual accessibility tests with guided workflows and documentation."
              href="/manual-testing"
              className="tool-card"
            />
          </ToolGroup>

          {/* Knowledge */}
          <ToolGroup title="Knowledge">
            <ToolCard
              icon={BookOpen}
              title="Guidelines & Resources"
              description="Access WCAG guidelines, best practices, and accessibility resources for your team."
              href="/guidelines"
              className="tool-card"
            />
          </ToolGroup>

          {/* Admin */}
          <ToolGroup title="Admin">
            <ToolCard
              icon={Settings}
              title="Settings"
              description="Configure system settings, integrations, and accessibility testing preferences."
              href="/settings"
              className="tool-card"
            />
            <ToolCard
              icon={Users}
              title="Users & Roles"
              description="Manage team members, assign roles, and control access to accessibility tools."
              href="/admin/users"
              className="tool-card"
            />
          </ToolGroup>
        </div>
      </main>
    </div>
  );
}