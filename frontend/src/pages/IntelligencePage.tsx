import React from 'react';
import { Brain, Sparkles, Cpu, CheckCircle2, AlertTriangle, Zap, RefreshCw } from 'lucide-react';

export const IntelligencePage: React.FC = () => {
  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <Brain className="w-5 h-5 text-white" />
            <span>Local AI/ML Data Intelligence Center</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Embedded machine learning models for anomaly detection, schema drift prediction, and semantic duplicate detection. 100% offline local execution.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Third-Party API Keys</span>
          </span>
          <button className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow">
            <RefreshCw className="w-3.5 h-3.5 text-black" />
            <span>Retrain Local Models</span>
          </button>
        </div>
      </div>

      {/* Local Models Registry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono text-[10px] font-bold">ML-MODEL-01</span>
            <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
          </div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-white" />
            <span>Statistical Anomaly Detector</span>
          </h3>
          <p className="text-xs text-zinc-400">Isolation Forest & Z-score outlier detection over numeric telemetry streams.</p>
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Library: Scikit-Learn</span>
            <span>Accuracy: 99.1%</span>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono text-[10px] font-bold">NLP-MODEL-02</span>
            <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
          </div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span>PII Semantic Classification</span>
          </h3>
          <p className="text-xs text-zinc-400">Local Sentence-Transformers embeddings for column-name and sample-value PII inference.</p>
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Library: spaCy / HF Local</span>
            <span>Accuracy: 97.8%</span>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono text-[10px] font-bold">DRIFT-MODEL-03</span>
            <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
          </div>
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Schema Drift Predictor</span>
          </h3>
          <p className="text-xs text-zinc-400">Monitors structural DDL changes and predicts breaking upstream schema evolution.</p>
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Library: Local PyTorch</span>
            <span>Accuracy: 95.4%</span>
          </div>
        </div>

      </div>

      {/* Model Inference Results Log */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white">Recent AI/ML Inference Runs & Anomaly Alerts</h3>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Volume Anomaly Detected in Inventory Stream</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">Model predicted 1.2M events/hr; received 5.4M events/hr (+350% deviation).</div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-zinc-500">10 mins ago</div>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-zinc-900 text-emerald-400 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Duplicate Dataset Candidate Found</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">96.4% cosine similarity match between `customer_profiles` and `legacy_cust_backup`.</div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-zinc-500">1 hour ago</div>
          </div>
        </div>
      </div>

    </div>
  );
};
