import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { InteractiveBiDemo } from '../components/InteractiveBiDemo';
import { projectsData } from '../data/portfolioData';
import { ArrowRight, Camera, CheckCircle2, Cpu, Database, ExternalLink, Layers, Zap, ShieldCheck, Copy, Check } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { config, setIsConfigModalOpen, setIsPhotoModalOpen } = useConfig();
  const [copiedPhoto, setCopiedPhoto] = useState(false);
  
  const featuredProjects = projectsData.filter(p => p.featured);

  const handleCopyPhotoLink = () => {
    navigator.clipboard.writeText(config.photoUrl);
    setCopiedPhoto(true);
    setTimeout(() => setCopiedPhoto(false), 2000);
  };

  return (
    <div className="space-y-20 pb-16 animate-fadeIn">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & Config confirmation badge */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Confirmation Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-lg shadow-emerald-500/5 text-xs text-slate-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400">Confirmation Site Propre</span>
              <span className="text-slate-500">•</span>
              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-mono text-[11px]"
              >
                Voir _config.yml <ExternalLink className="w-3 h-3 inline" />
              </button>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
              Mentor <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">MALONGA</span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-base sm:text-xl font-bold text-cyan-300 font-mono">
              <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                <Database className="w-5 h-5 inline mr-1.5 -mt-1" />
                Data Analyst
              </span>
              <span className="text-slate-500">&amp;</span>
              <span className="p-1 rounded bg-blue-500/10 text-blue-400">
                BI Developer 🚀
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {config.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('/projects')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Explorer les Projets BI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-100 font-semibold rounded-xl border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Me Contacter</span>
              </button>

              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="px-4 py-3.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono rounded-xl border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                title="Consulter et modifier le lien de la photo"
              >
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Lien Photo URL</span>
              </button>
            </div>

            {/* Config quick recap bar */}
            <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Thème Actif</span>
                <code className="text-purple-300 font-mono">{config.theme}</code>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Domaine Pages</span>
                <a href={config.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-mono hover:underline truncate max-w-[200px] inline-block">
                  {config.url}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-semibold">Email Public</span>
                <span className="text-slate-300 font-mono truncate max-w-[200px] inline-block">{config.email}</span>
              </div>
            </div>

          </div>

          {/* Right: The Dedicated Photo Link Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative">
              
              {/* Outer glowing border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-30 animate-pulse" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Profil Validé</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/20 flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Lien Photo Actif
                  </span>
                </div>

                {/* Photo frame */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-inner bg-slate-950 flex items-center justify-center group">
                  <img
                    src={config.photoUrl}
                    alt={config.author}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-left">
                      <span className="text-xs font-mono px-2 py-0.5 bg-cyan-500 text-slate-950 rounded font-bold">
                        {config.author}
                      </span>
                      <p className="text-xs text-slate-200 mt-1 font-medium">
                        De l'Électronique à Microsoft Fabric &amp; Power BI
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct photo URL link widget */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-semibold">Lien URL de la photo :</span>
                    <button
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[10px] cursor-pointer"
                    >
                      <span>Modifier</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                    <span className="truncate text-cyan-200 flex-1">{config.photoUrl}</span>
                    <button
                      onClick={handleCopyPhotoLink}
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
                      title="Copier le lien direct de la photo"
                    >
                      {copiedPhoto ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Pillars: Electronics + Microsoft Fabric + Power BI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            Dernière Génération BI
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Une Synergie Unique au Service des Données
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Comment ma formation en Électronique renforce la qualité et la rigueur de mes architectures Microsoft Fabric et Power BI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-1 shadow-xl space-y-4 relative overflow-hidden group">
            <div className="p-3 bg-cyan-500/10 text-cyan-400 w-fit rounded-xl border border-cyan-500/20 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. Rigueur de l'Électronique</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              La mesure physique de signaux, la métrologie et le diagnostic de circuits imprimés exigent une précision mathématique totale. J'applique cette même rigueur de contrôle à chaque étape de validation des données d'entreprise.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Acquisition IoT</span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Traitement du Signal</span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Diagnostic 0 Erreur</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-1 shadow-xl space-y-4 relative overflow-hidden group">
            <div className="p-3 bg-blue-500/10 text-blue-400 w-fit rounded-xl border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. Puissance Microsoft Fabric</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Exploitation du Lakehouse unifié et de OneLake. Architecture Medallion structurée (Bronze, Silver, Gold) via PySpark et Data Factory pour traiter des millions d'enregistrements en continu.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">OneLake</span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Lakehouse PySpark</span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Medallion Gold</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 sm:p-8 transition-all hover:-translate-y-1 shadow-xl space-y-4 relative overflow-hidden group">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 w-fit rounded-xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Power BI &amp; Direct Lake</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Rapports sémantiques ultra-rapides en Direct Lake sur OneLake. Modélisation Tabulaire en étoile pure, calculs DAX complexes de Time Intelligence et restitution visuelle exécutive intuitive.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5">
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Direct Lake</span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">DAX Studio</span>
              <span className="text-[11px] px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">Modèle en Étoile</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive BI Dashboard Demo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              Démonstration Interactive
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Simulateur Live Microsoft Fabric &amp; Power BI
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Testez les filtres en direct pour observer comment les indicateurs financiers et les modèles DAX se mettent à jour instantanément.
          </p>
        </div>

        <InteractiveBiDemo />
      </section>

      {/* Featured Projects Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl sm:text-3xl font-bold text-white">Projets en Vedette</h3>
            <p className="text-xs sm:text-sm text-slate-400">Cas concrets de déploiements Microsoft Fabric &amp; Power BI</p>
          </div>
          <button
            onClick={() => onNavigate('/projects')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors cursor-pointer"
          >
            <span>Voir tous les projets ({projectsData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full border border-cyan-500/20">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Confirmé
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h4>
                <p className="text-xs font-medium text-cyan-400/90 font-mono">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics highlights */}
                <div className="grid grid-cols-3 gap-2 pt-2 pb-1">
                  {project.metrics.map(m => (
                    <div key={m.label} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block font-medium truncate">{m.label}</span>
                      <span className="text-xs sm:text-sm font-bold text-white block mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tools tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tools.slice(0, 5).map(tool => (
                    <span key={tool} className="text-[11px] font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('/projects')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Consulter l'architecture &amp; DAX</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-500 font-mono">ID: {project.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
