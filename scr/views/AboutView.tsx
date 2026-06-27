import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { skillCategories, timelineData } from '../data/portfolioData';
import { Award, BarChart3, Camera, CheckCircle2, Cpu, Database, GraduationCap, ShieldCheck, Zap } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { config, setIsPhotoModalOpen, setIsConfigModalOpen } = useConfig();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Database': return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      default: return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-20 animate-fadeIn">
      
      {/* Bio / Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Profile Photo Link Display */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group max-w-sm w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500" />
            
            <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl">
              <img
                src={config.photoUrl}
                alt={config.author}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Lien photo synchronisé
              </span>
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs rounded-xl border border-cyan-500/30 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" /> Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Text Bio */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold">
            <span>À Propos de Mentor MALONGA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Allier la Rigueur de l'Électronique à la Puissance de la BI
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Passionné par la structuration des données et l'aide à la décision, mon parcours est le fruit d'une hybridation technique rare. Diplômé et formé initialement en <strong>Électronique</strong>, j'ai développé une culture absolue du diagnostic de précision, du contrôle de signaux et de la fiabilité matérielle.
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Aujourd'hui <strong>Data Analyst &amp; BI Developer</strong>, j'applique cette même rigueur mathématique et systémique à la modélisation sémantique sur <strong>Microsoft Fabric</strong> et <strong>Power BI</strong>. Qu'il s'agisse d'ingérer des flux massifs dans OneLake en architecture Medallion ou de bâtir des mesures DAX ultra-optimisées, ma mission est de transformer la complexité brute en clarté exécutive.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold rounded-xl text-xs sm:text-sm border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Confirmation Claire Configuration</span>
            </button>
            <div className="text-xs text-slate-400 font-mono">
              GitHub: <a href={config.social.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@Mentor077</a>
            </div>
          </div>
        </div>

      </section>

      {/* Skills Matrix */}
      <section className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Compétences Techniques</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">Matrice d'Expertise</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">De la métrologie physique au cloud analytique Microsoft Fabric</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {getCategoryIcon(category.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-slate-400">{category.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {category.skills.map(skill => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className="font-mono text-[11px] text-cyan-400 font-bold">{skill.badge || `${skill.level}%`}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                      <div
                        style={{ width: `${skill.level}%` }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Journey */}
      <section className="space-y-10">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Parcours &amp; Évolution</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">Trajectoire &amp; Genèse</h2>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-3 sm:ml-6 space-y-12 pb-4">
          {timelineData.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline marker node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors text-cyan-400">
                <GraduationCap className="w-4 h-4" />
              </div>

              <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/30 p-6 sm:p-8 rounded-2xl shadow-xl transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    {item.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 font-mono">
                    {item.companyOrSchool}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-mono px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
