import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'orchestrator',
    type: 'default',
    position: { x: 300, y: 50 },
    data: { 
      label: '🎯 Multi Agent Orchestrator',
      status: 'active'
    },
    className: 'agent-node orchestrator status-active'
  },
  {
    id: 'human-loop',
    type: 'default',
    position: { x: 300, y: 150 },
    data: { 
      label: '👤 Human in Loop',
      status: 'active'
    },
    className: 'agent-node human status-active'
  },
  {
    id: 'fault-agent',
    type: 'default', 
    position: { x: 50, y: 250 },
    data: { 
      label: '⚠️ Fault Agent',
      status: 'processing'
    },
    className: 'agent-node fault status-processing'
  },
  {
    id: 'performance-agent',
    type: 'default',
    position: { x: 200, y: 250 },
    data: { 
      label: '📊 Performance Agent',
      status: 'active'
    },
    className: 'agent-node performance status-active'
  },
  {
    id: 'inventory-agent',
    type: 'default',
    position: { x: 350, y: 250 },
    data: { 
      label: '📦 Inventory Agent',
      status: 'active'
    },
    className: 'agent-node inventory status-active'
  },
  {
    id: 'ticket-agent',
    type: 'default',
    position: { x: 500, y: 250 },
    data: { 
      label: '🎫 Ticket Agent', 
      status: 'idle'
    },
    className: 'agent-node ticket status-idle'
  },
  {
    id: 'notification-agent',
    type: 'default',
    position: { x: 125, y: 350 },
    data: { 
      label: '🔔 Notification Agent',
      status: 'active'
    },
    className: 'agent-node notification status-active'
  },
  {
    id: 'customer-agent',
    type: 'default',
    position: { x: 425, y: 350 },
    data: { 
      label: '👤 Customer Agent',
      status: 'idle'
    },
    className: 'agent-node customer status-idle'
  },
  {
    id: 'data-source',
    type: 'input',
    position: { x: 300, y: 450 },
    data: { label: '📡 Data Sources' },
    className: 'data-node'
  }
];

const initialEdges: Edge[] = [
  // Human to Orchestrator (bidirectional)
  {
    id: 'human-orchestrator',
    source: 'human-loop',
    target: 'orchestrator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 3 }
  },
  {
    id: 'orchestrator-human',
    source: 'orchestrator',
    target: 'human-loop',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--secondary))', strokeWidth: 2 }
  },
  // Orchestrator to all agents
  {
    id: 'orchestrator-fault',
    source: 'orchestrator',
    target: 'fault-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--destructive))' }
  },
  {
    id: 'orchestrator-performance', 
    source: 'orchestrator',
    target: 'performance-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--warning))' }
  },
  {
    id: 'orchestrator-inventory',
    source: 'orchestrator',
    target: 'inventory-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--info))' }
  },
  {
    id: 'orchestrator-ticket',
    source: 'orchestrator', 
    target: 'ticket-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--accent))' }
  },
  {
    id: 'orchestrator-notification',
    source: 'orchestrator',
    target: 'notification-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--secondary))' }
  },
  {
    id: 'orchestrator-customer',
    source: 'orchestrator',
    target: 'customer-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--success))' }
  },
  // Agent feedback to orchestrator
  {
    id: 'fault-orchestrator',
    source: 'fault-agent',
    target: 'orchestrator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--destructive))', strokeDasharray: '5,5' }
  },
  {
    id: 'performance-orchestrator',
    source: 'performance-agent',
    target: 'orchestrator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--warning))', strokeDasharray: '5,5' }
  },
  {
    id: 'notification-orchestrator',
    source: 'notification-agent',
    target: 'orchestrator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--secondary))', strokeDasharray: '5,5' }
  },
  // Data sources to multiple agents
  {
    id: 'data-fault',
    source: 'data-source',
    target: 'fault-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'data-performance',
    source: 'data-source',
    target: 'performance-agent', 
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'data-inventory',
    source: 'data-source',
    target: 'inventory-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'data-notification',
    source: 'data-source',
    target: 'notification-agent',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: 'hsl(var(--muted-foreground))' }
  }
];

export function AgentDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Keep statuses static as per requirements
  // (No interval updates)

  return (
    <div className="h-full w-full bg-gradient-secondary rounded-lg border border-border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-transparent"
      >
        <Controls className="bg-card border-border" />
        <Background gap={20} size={1} color="hsl(var(--border))" />
      </ReactFlow>
      
      <style>{`
        .agent-node {
          background: #1a4d3a !important;
          border: 2px solid #000000 !important;
          border-radius: 8px !important;
          box-shadow: var(--shadow-card) !important;
          color: #ffffff !important;
          font-weight: 500 !important;
          min-width: 180px !important;
          text-align: center !important;
        }
        
        /* Status-based colors */
        .agent-node.status-idle {
          background: hsl(var(--agent-idle) / 0.1) !important;
          border-color: hsl(var(--agent-idle)) !important;
        }
        .agent-node.status-processing {
          background: hsl(var(--agent-processing) / 0.1) !important;
          border-color: hsl(var(--agent-processing)) !important;
        }
        .agent-node.status-error {
          background: hsl(var(--agent-error) / 0.1) !important;
          border-color: hsl(var(--agent-error)) !important;
        }
        
        .agent-node.orchestrator {
          background: hsl(var(--primary) / 0.1) !important;
          border-color: hsl(var(--primary)) !important;
          box-shadow: var(--shadow-glow) !important;
        }
        
        .agent-node.human {
          background: hsl(var(--secondary) / 0.1) !important;
          border-color: hsl(var(--secondary)) !important;
          box-shadow: 0 0 10px hsl(var(--secondary) / 0.3) !important;
        }
        
        .agent-node.inventory {
          background: hsl(var(--info) / 0.1) !important;
          border-color: hsl(var(--info)) !important;
        }
        
        .agent-node.notification {
          background: hsl(var(--secondary) / 0.1) !important;
          border-color: hsl(var(--secondary)) !important;
        }
        
        .agent-node.customer {
          background: hsl(var(--success) / 0.1) !important;
          border-color: hsl(var(--success)) !important;
        }
        
        .data-node {
          background: hsl(var(--accent) / 0.1) !important;
          border-color: hsl(var(--accent)) !important;
          color: hsl(var(--foreground)) !important;
        }
        
        .react-flow__controls button {
          background: hsl(var(--card)) !important;
          border-color: hsl(var(--border)) !important;
          color: hsl(var(--foreground)) !important;
        }
        
        .react-flow__minimap {
          background: hsl(var(--card)) !important;
          border-color: hsl(var(--border)) !important;
        }
      `}</style>
    </div>
  );
}