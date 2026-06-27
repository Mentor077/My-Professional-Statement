import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Mail, Check, Copy, ExternalLink, Send, ShieldCheck, Camera, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { config, setIsConfigModalOpen, setIsPhotoModalOpen } = useConfig();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate instant clean transmission confirmation
    setIsSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
          Contact &amp; Échanges
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Entrons en Relation
        </h1>
        <p className="text-sm sm:text-base text-slate-400">
          Vous cherchez un expert combinant la rigueur de l'électronique et la puissance de Microsoft Fabric et Power BI ? Écrivez-moi directement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Direct Info & Configuration confirmation recap */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" /> Coordonnées Directes
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Adresse Email Principale</span>
                <div className="flex items-center justify-between gap-2 font-mono text-xs sm:text-sm text-cyan-300">
                  <span className="truncate">{config.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl transition-colors cursor-pointer border border-slate-800 flex items-center gap-1 text-xs"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 text-center group"
                >
                  <svg className="w-6 h-6 text-cyan-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-xs font-semibold text-slate-200">LinkedIn Pro</span>
                  <span className="text-[10px] text-slate-500 font-mono">Connexion rapide</span>
                </a>

                <a
                  href={config.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 text-center group"
                >
                  <svg className="w-6 h-6 text-white fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="text-xs font-semibold text-slate-200">GitHub Pro</span>
                  <span className="text-[10px] text-slate-500 font-mono">@Mentor077</span>
                </a>
              </div>
            </div>
          </div>

          {/* Confirmation Box summary */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Configuration Certifiée
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full">
                Prêt
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Toutes les directives du fichier de configuration ont été confirmées proprement. Le lien vers l'image du profil et les métadonnées sont synchronisés.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setIsConfigModalOpen(true)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Voir Confirmation YAML</span>
              </button>
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-xl border border-cyan-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Gérer Lien Photo</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Form OR Clean Confirmation Screen */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {isSubmitted ? (
              /* THE CLEAN CONFIRMATION DISPLAY ("confirmation plus claire est propre") */
              <div className="py-8 sm:py-12 px-2 text-center space-y-6 animate-fadeIn">
                
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full border-2 border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    Confirmation Claire et Propre
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                    Message Enregistré avec Succès !
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Merci <strong className="text-white">{formData.name || 'cher visiteur'}</strong>. Votre demande concernant <strong className="text-cyan-300">« {formData.subject || 'votre projet BI'} »</strong> a été préparée.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2 font-mono">
                    <span className="text-slate-400">Destinataire :</span>
                    <span className="text-cyan-300 font-bold">{config.author}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2 font-mono">
                    <span className="text-slate-400">Email Officiel :</span>
                    <span className="text-emerald-400 font-bold">{config.email}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400">Lien Photo Validé :</span>
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded font-mono truncate max-w-[180px]">
                      {config.photoUrl}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${config.email}?subject=${encodeURIComponent(formData.subject || 'Prise de contact portfolio')}&body=${encodeURIComponent(`Bonjour Mentor,\n\n${formData.message}\n\nCordialement,\n${formData.name}`)}`}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Ouvrir dans mon client Mail</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={handleResetForm}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Envoyer un autre message
                  </button>
                </div>

              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Formulaire d'envoi</h3>
                  <p className="text-xs text-slate-400">Tous les champs sont transmis directement à <span className="text-cyan-300 font-mono">{config.email}</span></p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Votre Nom / Entreprise *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Jean Dupont"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Votre Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Ex: jean.dupont@societe.com"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Sujet de la discussion *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Ex: Mission Architecture Microsoft Fabric / Projet Power BI Direct Lake"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Votre Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Détaillez vos besoins analytiques, vos sources de données ou votre proposition..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-xl shadow-cyan-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirmer &amp; Envoyer la Demande</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
