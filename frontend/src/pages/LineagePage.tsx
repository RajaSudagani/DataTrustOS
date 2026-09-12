import React, { useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { GitFork, Layers, Database, Sparkles, AlertCircle } from 'lucide-react';
import { MOCK_LINEAGE } from '../mock';

const initialNodes: Node[] = MOCK_LINEAGE.nodes.map((n, idx) => ({
  id: n.id,
  data: { label: n.label, domain: n.domain, type: n.type, qualityScore: n.qualityScore },
  position: { x: (idx % 3) * 280 + 50, y: Math.floor(idx / 3) * 160 + 50 },
  style: {
    background: n.type === 'DATASET' ? '#1e293b' : n.type === 'ML_MODEL' ? '#311b92' : '#0f172a',
    color: '#f8fafc',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '12px',
    width: 220,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
  }
}));

const initialEdges: Edge[] = MOCK_LINEAGE.edges.map(e => ({
  id: e.id,
  source: e.source,
  target: e.target,
  label: e.label,
  animated: true,
  style: { stroke: '#3b82f6', strokeWidth: 2 }
}));

export const LineagePage: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(initialNodes[1]);

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <GitFork className="w-6 h-6 text-brand-400" />
            <span>Visual Data Lineage & Dependency Graph</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end data provenance tracing from ingestion sources through transformations, feature stores, and downstream analytics views.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-brand-500/10 text-brand-300 border border-brand-500/30 rounded-full text-xs font-semibold">
            Interactive Node Engine
          </span>
        </div>
      </div>

      {/* Graph Studio & Inspector Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        
        {/* React Flow Graph Studio */}
        <div className="lg:col-span-3 glass-panel rounded-2xl border border-slate-800 overflow-hidden relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => setSelectedNode(node)}
            fitView
          >
            <Background color="#334155" gap={16} />
            <Controls className="bg-slate-900 border-slate-800 text-white" />
          </ReactFlow>
        </div>

        {/* Selected Node Inspector Sidebar */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-5 overflow-y-auto">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Node Inspector</span>
          </h3>

          {selectedNode ? (
            <div className="space-y-4 text-xs">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Node Label</div>
                <div className="text-sm font-mono font-bold text-brand-300 mt-1">{String(selectedNode.data.label)}</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Node Category</div>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-bold">
                  {String(selectedNode.data.type)}
                </span>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Domain Context</div>
                <div className="text-slate-300 font-medium mt-1">{String(selectedNode.data.domain)}</div>
              </div>

              {selectedNode.data.qualityScore !== undefined && (
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Associated Quality SLA</div>
                  <div className="text-sm font-extrabold text-emerald-400 mt-1">{String(selectedNode.data.qualityScore)}%</div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="text-[10px] text-slate-400 font-semibold">Impact Analysis</div>
                <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] text-slate-400">
                  Modifying this dataset schema will trigger change notifications to 2 downstream analytical views.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              Click any node on the graph to inspect lineage metadata.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
