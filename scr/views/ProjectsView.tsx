import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import { Check, Code2, Copy, Filter, Layers, X } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [copiedDax, setCopiedDax] = useState(false);

  const categories = ['Tous', 'Power BI', 'Microsoft Fabric', 'ETL & SQL', 'Électronique & Data'];

  const filteredProjects = selectedCategory === 'Tous'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const handleCopyCode = (code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedDax(true);
    setTimeout(() => setCopiedDax(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">
            Portfolio Réalisations
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projets &amp; Cas Clients
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
            Découvrez mes solutions complètes d'architecture décisionnelle, de modélisation sémantique Tabulaire, et d'acquisition électronique.
          </p>
        </div>

        {/* Categories Slicers */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Filter className="w-3 h-3 inline" />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="p-6 sm:p-8 space-y-5">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-semibold rounded-full border border-cyan-500/20">
                  {project.category}
                </span>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  ✓ Solution Validée
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-cyan-400 font-mono mt-1 font-medium">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex flex-col justify-center text-center">
                    <span className="text-[10px] text-slate-400 font-medium truncate block">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-white block mt-1">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Tools list */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">Technologies &amp; Outils :</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map(t => (
                    <span key={t} className="text-[11px] font-mono px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setActiveProjectModal(project)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Voir le Code DAX / SQL &amp; Architecture</span>
              </button>
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  GitHub
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col">
            
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 flex-shrink-0" />

            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
              <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">{activeProjectModal.category}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{activeProjectModal.title}</h3>
                </div>
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Architecture diagram steps */}
              {activeProjectModal.architecture && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" /> Étapes de l'Architecture Technique
                  </h4>
                  <div className="space-y-2">
                    {activeProjectModal.architecture.map((step, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5 font-mono">
                          {idx + 1}
                        </span>
                        <span className="text-slate-200 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code snippet display */}
              {activeProjectModal.daxExample && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-emerald-400" /> Extrait de Code DAX / SQL du Projet
                    </h4>
                    <button
                      onClick={() => handleCopyCode(activeProjectModal.daxExample)}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg transition-colors border border-slate-700 cursor-pointer"
                    >
                      {copiedDax ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                      <span>{copiedDax ? "Copié !" : "Copier le Code"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed max-h-72 shadow-inner">
                    <pre>{activeProjectModal.daxExample}</pre>
                  </div>
                </div>
              )}

            </div>

            <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-end flex-shrink-0">
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
