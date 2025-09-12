import { useState } from "react";
import { AgentCard, type Agent } from "@/components/AgentCard";
import { AgentDiagram } from "@/components/AgentDiagram";
import { LogPanel } from "@/components/LogPanel";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const mockAgents: Agent[] = [
  {
    id: "orchestrator-agent",
    name: "Multi Agent Orchestrator",
    type: "Orchestration",
    status: "active",
    description: "Coordinates all AI agents, manages task distribution, and facilitates human-in-the-loop interactions.",
    lastActivity: "15 sec ago",
    metrics: {
      requests: 2847,
      success: 2789,
      errors: 58
    }
  },
  {
    id: "fault-agent",
    name: "Fault Agent",
    type: "Diagnostic",
    status: "active",
    description: "Monitors network infrastructure and detects system faults in real-time using ML algorithms.",
    lastActivity: "2 min ago",
    metrics: {
      requests: 1247,
      success: 1198,
      errors: 49
    }
  },
  {
    id: "performance-agent",
    name: "Performance Agent", 
    type: "Analytics",
    status: "processing",
    description: "Analyzes system performance metrics and generates optimization recommendations.",
    lastActivity: "30 sec ago",
    metrics: {
      requests: 892,
      success: 867,
      errors: 25
    }
  },
  {
    id: "inventory-agent",
    name: "Inventory Agent",
    type: "Management",
    status: "active",
    description: "Tracks and manages network equipment inventory, asset allocation, and maintenance schedules.",
    lastActivity: "1 min ago",
    metrics: {
      requests: 445,
      success: 431,
      errors: 14
    }
  },
  {
    id: "ticketing-agent",
    name: "Ticketing Agent",
    type: "Automation",
    status: "active",
    description: "Automatically creates, manages, and tracks trouble tickets based on detected issues.",
    lastActivity: "1 min ago", 
    metrics: {
      requests: 324,
      success: 318,
      errors: 6
    }
  },
  {
    id: "rca-agent",
    name: "RCA Agent",
    type: "Analysis",
    status: "processing",
    description: "Performs root cause analysis on incidents to identify underlying issues and prevent recurrence.",
    lastActivity: "3 min ago",
    metrics: {
      requests: 156,
      success: 149,
      errors: 7
    }
  },
  {
    id: "notification-agent",
    name: "Notification Agent",
    type: "Communication",
    status: "active",
    description: "Manages alerts, notifications, and escalations to appropriate stakeholders.",
    lastActivity: "45 sec ago",
    metrics: {
      requests: 567,
      success: 560,
      errors: 7
    }
  },
  {
    id: "customer-agent",
    name: "Customer Agent",
    type: "Support",
    status: "idle",
    description: "Handles customer communications and provides automated support responses.",
    lastActivity: "4 min ago",
    metrics: {
      requests: 289,
      success: 275,
      errors: 14
    }
  }
];

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [networkQuery, setNetworkQuery] = useState("");

  const activeAgents = mockAgents.filter(agent => agent.status === "active").length;
  const processingAgents = mockAgents.filter(agent => agent.status === "processing").length;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Agent Portal
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage autonomous agents in real-time
            </p>
          </div>
          <div className="flex gap-3">
            <Badge variant="secondary" className="bg-success/20 text-success">
              {activeAgents} Active
            </Badge>
            <Badge variant="secondary" className="bg-warning/20 text-warning">
              {processingAgents} Processing
            </Badge>
          </div>
        </div>
      </div>

      {/* Agent Workflow */}
      <div className="mb-6">
        <Card className="p-4 bg-gradient-secondary border-border">
          <h2 className="font-semibold mb-3 text-primary">Agent Workflow</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">🎯</span>
              </div>
              <p className="text-xs text-muted-foreground">Orchestrator</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-destructive/20 rounded-lg flex items-center justify-center">
                <span className="text-destructive font-bold">1</span>
              </div>
              <p className="text-xs text-muted-foreground">Fault Detection</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-warning/20 rounded-lg flex items-center justify-center">
                <span className="text-warning font-bold">2</span>
              </div>
              <p className="text-xs text-muted-foreground">Performance Analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-info/20 rounded-lg flex items-center justify-center">
                <span className="text-info font-bold">3</span>
              </div>
              <p className="text-xs text-muted-foreground">Inventory Management</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-accent font-bold">4</span>
              </div>
              <p className="text-xs text-muted-foreground">Ticket Creation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-secondary/20 rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold">5</span>
              </div>
              <p className="text-xs text-muted-foreground">Notifications</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-success/20 rounded-lg flex items-center justify-center">
                <span className="text-success font-bold">6</span>
              </div>
              <p className="text-xs text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Assistant Query Prompt */}
      <div className="mb-6">
        <Card className="p-4 bg-gradient-secondary border-border">
          <h2 className="font-semibold mb-3 text-primary">AI Assistant Agent</h2>
          <p className="text-muted-foreground text-sm mb-3">
            Ask specific questions about network issues, performance metrics, or troubleshooting
          </p>
          <div className="flex gap-3">
            <Textarea
              placeholder="e.g., Why is server-03 experiencing high CPU usage? What's causing network latency in segment A?"
              value={networkQuery}
              onChange={(e) => setNetworkQuery(e.target.value)}
              className="flex-1 min-h-[80px] resize-none"
            />
            <Button 
              className="px-4 h-auto"
              onClick={() => {
                // Here you would handle the query submission
                console.log("Network query:", networkQuery);
                setNetworkQuery("");
              }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
        {/* Center - Agent Network and Logs */}
        <div className="col-span-8 space-y-4">
          {/* Agent Network Diagram */}
          <Card className="p-4 bg-gradient-secondary border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-primary">Agent Network</h2>
              <Badge variant="outline" className="border-primary text-primary animate-pulse">
                Live
              </Badge>
            </div>
            <div className="h-80">
              <AgentDiagram />
            </div>
          </Card>

          {/* Agent Logs */}
          <Card className="p-4 bg-gradient-secondary border-border">
            <h2 className="font-semibold mb-3 text-primary">Agent Logs</h2>
            <div className="h-52 overflow-y-auto space-y-2 font-mono text-sm">
              <div className="text-primary">[2024-01-15 14:32:45] Orchestrator: Human override received - prioritizing critical alerts</div>
              <div className="text-success">[2024-01-15 14:32:15] Fault Agent: Network scan completed - 15 devices healthy</div>
              <div className="text-warning">[2024-01-15 14:31:45] Performance Agent: CPU usage spike detected on server-03</div>
              <div className="text-info">[2024-01-15 14:31:30] Inventory Agent: Asset maintenance scheduled for router-R5</div>
              <div className="text-primary">[2024-01-15 14:31:20] Orchestrator: Task distribution initiated across 6 agents</div>
              <div className="text-muted-foreground">[2024-01-15 14:30:55] Ticket Agent: Ticket #TK-001 created for memory alert</div>
              <div className="text-secondary">[2024-01-15 14:30:40] Notification Agent: Alert sent to admin@company.com</div>
              <div className="text-success">[2024-01-15 14:30:30] Fault Agent: Diagnostic check passed for network segment A</div>
              <div className="text-destructive">[2024-01-15 14:30:10] Performance Agent: Database connection timeout on DB-02</div>
              <div className="text-primary">[2024-01-15 14:29:45] Orchestrator: Human-in-loop confirmation received</div>
              <div className="text-info">[2024-01-15 14:29:30] Inventory Agent: Equipment status updated in database</div>
              <div className="text-warning">[2024-01-15 14:29:20] Fault Agent: Minor network latency detected</div>
              <div className="text-success">[2024-01-15 14:29:00] Customer Agent: Auto-response sent to ticket #TK-000</div>
              <div className="text-primary">[2024-01-15 14:28:45] Orchestrator: Agent coordination successful - all agents online</div>
              <div className="text-muted-foreground">[2024-01-15 14:28:35] Performance Agent: System optimization completed</div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Agent I/O */}
        <div className="col-span-3 space-y-4">
          <Card className="p-4 bg-gradient-secondary border-border">
            <h2 className="font-semibold mb-3 text-primary">Agent Input/Output</h2>
            <div className="h-[calc(100vh-14rem)] overflow-y-auto space-y-4 text-sm">
              
              {/* Orchestrator Agent I/O */}
              <div className="border-l-2 border-primary pl-3">
                <h3 className="font-medium text-primary mb-2">🎯 Multi Agent Orchestrator</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: Agent coordination, human commands</div>
                  <div className="text-success">📤 Output: Task assignments, status reports</div>
                </div>
              </div>

              {/* Fault Agent I/O */}
              <div className="border-l-2 border-destructive pl-3">
                <h3 className="font-medium text-destructive mb-2">⚠️ Fault Agent</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: Network health data, SNMP logs</div>
                  <div className="text-success">📤 Output: Fault alerts, diagnostic reports</div>
                </div>
              </div>

              {/* Performance Agent I/O */}
              <div className="border-l-2 border-warning pl-3">
                <h3 className="font-medium text-warning mb-2">📊 Performance Agent</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: CPU metrics, memory usage, bandwidth</div>
                  <div className="text-success">📤 Output: Performance reports, optimization tips</div>
                </div>
              </div>

              {/* Inventory Agent I/O */}
              <div className="border-l-2 border-info pl-3">
                <h3 className="font-medium text-info mb-2">📦 Inventory Agent</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: Asset data, maintenance schedules</div>
                  <div className="text-success">📤 Output: Inventory reports, maintenance alerts</div>
                </div>
              </div>

              {/* Ticketing Agent I/O */}
              <div className="border-l-2 border-accent pl-3">
                <h3 className="font-medium text-accent mb-2">🎫 Ticketing Agent</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: Fault alerts, incident reports</div>
                  <div className="text-success">📤 Output: Tickets, tracking updates</div>
                </div>
              </div>

              {/* Notification Agent I/O */}
              <div className="border-l-2 border-secondary pl-3">
                <h3 className="font-medium text-secondary mb-2">🔔 Notification Agent</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: Alerts, escalation rules</div>
                  <div className="text-success">📤 Output: Notifications, status updates</div>
                </div>
              </div>

              {/* Customer Agent I/O */}
              <div className="border-l-2 border-success pl-3">
                <h3 className="font-medium text-success mb-2">👤 Customer Agent</h3>
                <div className="space-y-1">
                  <div className="text-info">📥 Input: Customer queries, service requests</div>
                  <div className="text-success">📤 Output: Support responses, status updates</div>
                </div>
              </div>

              {/* Recent Data Flow */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-medium text-muted-foreground mb-2">Orchestration Flow</h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-primary">🎯 Orchestrator: Coordinating agents</div>
                  <div className="text-destructive">⚠️ Fault → Orchestrator: Issue detected</div>
                  <div className="text-warning">📊 Performance → Orchestrator: Metrics analysis</div>
                  <div className="text-info">📦 Inventory → Orchestrator: Asset check</div>
                  <div className="text-accent">🎫 Orchestrator → Ticketing: Create ticket</div>
                  <div className="text-secondary">🔔 Orchestrator → Notification: Send alert</div>
                  <div className="text-success">👤 Human → Orchestrator: Override command</div>
                  <div className="text-muted-foreground">🎯 Orchestrator → All: Task distribution</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;