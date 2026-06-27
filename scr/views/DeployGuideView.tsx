import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Globe, Terminal, CheckCircle2, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';

export const DeployGuideView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const toggleStep = (step: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  };

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => handleCopy(text, id)}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer flex-shrink-0 ${
        copiedId === id
          ? 'bg-emerald-500 text-white'
          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
      }`}
    >
      {copiedId === id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      <span>{copiedId === id ? "Copié !" : "Copier"}</span>
    </button>
  );

  const CodeBlock = ({ code, id, lang = "bash" }: { code: string; id: string; lang?: string }) => (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800">
        <span className="text-[10px] font-mono text-slate-500 uppercase">{lang}</span>
        <CopyButton text={code} id={id} />
      </div>
      <div className="p-4 font-mono text-sm text-cyan-200 overflow-x-auto">
        <code>{code}</code>
      </div>
    </div>
  );

  const StepCard = ({ step, title, children }: { step: number; title: string; children: React.ReactNode }) => {
    const isDone = completedSteps.has(step);
    return (
      <div className={`rounded-2xl border transition-all duration-300 ${
        isDone 
          ? 'bg-emerald-500/5 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
          : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleStep(step)}
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all cursor-pointer ${
                isDone
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
            >
              {isDone ? <Check className="w-4 h-4" /> : step}
            </button>
            <h3 className="text-base sm:text-lg font-bold text-white pt-1">{title}</h3>
          </div>
          <div className="pl-11 space-y-3">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const totalSteps = 6;
  const progress = (completedSteps.size / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 inline-flex items-center gap-2">
          <Globe className="w-3.5 h-3.5" /> Guide de Déploiement GitHub Pages
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Mettre votre site en ligne sur <span className="text-cyan-400">Mentor077.github.io</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Suivez ces 6 étapes simples. Cochez chaque étape terminée pour suivre votre progression. Toutes les commandes sont prêtes à copier-coller.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">Progression : <strong className="text-white">{completedSteps.size}/{totalSteps}</strong> étapes terminées</span>
          <span className="text-cyan-400 font-bold font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        {completedSteps.size === totalSteps && (
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold pt-1 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Félicitations ! Votre site est en ligne sur https://Mentor077.github.io 🎉</span>
          </div>
        )}
      </div>

      {/* Prerequisites */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-2 text-amber-200 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
          <AlertTriangle className="w-5 h-5" /> Prérequis avant de commencer
        </div>
        <ul className="space-y-1.5 pl-7 list-disc text-amber-200/90">
          <li>Un compte GitHub (<strong className="text-white">@Mentor077</strong> — vous l'avez déjà ✅)</li>
          <li><strong>Git</strong> installé sur votre ordinateur — <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">Télécharger Git ici</a></li>
          <li>Un éditeur de code comme <strong>VS Code</strong> (recommandé) — <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300">Télécharger VS Code</a></li>
        </ul>
      </div>

      {/* Step 1 */}
      <StepCard step={1} title="Créer le dépôt GitHub nommé Mentor077.github.io">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Allez sur GitHub et créez un nouveau dépôt public. Le nom du dépôt <strong className="text-cyan-300">doit être exactement</strong> :
        </p>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 font-mono text-sm">
          <span className="text-emerald-300 font-bold select-all">Mentor077.github.io</span>
          <CopyButton text="Mentor077.github.io" id="repo-name" />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          ⚠️ Ne cochez <strong>PAS</strong> « Add a README file » ni « Add .gitignore ». Laissez le dépôt complètement vide.
        </p>
        <a
          href="https://github.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" /> Ouvrir la page Créer un dépôt
        </a>
      </StepCard>

      {/* Step 2 */}
      <StepCard step={2} title="Ouvrir le dossier du projet dans le Terminal">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ouvrez un terminal (ou l'invite de commande) et naviguez vers le dossier contenant votre projet. Remplacez le chemin par celui de votre machine :
        </p>
        <CodeBlock code={`cd /chemin/vers/votre/dossier/mentor-portfolio`} id="cd" />
        <p className="text-xs text-slate-400">
          💡 Sous Windows : vous pouvez aussi faire <strong>Clic droit</strong> dans le dossier &gt; <strong>Ouvrir dans le Terminal</strong> (ou « Ouvrir dans Code » si VS Code est installé).
        </p>
      </StepCard>

      {/* Step 3 */}
      <StepCard step={3} title="Initialiser Git et lier au dépôt GitHub">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Exécutez ces 3 commandes l'une après l'autre dans votre terminal :
        </p>
        <div className="space-y-3">
          <CodeBlock code={`git init`} id="git-init" />
          <CodeBlock code={`git branch -M main`} id="git-branch" />
          <CodeBlock code={`git remote add origin https://github.com/Mentor077/Mentor077.github.io.git`} id="git-remote" />
        </div>
        <p className="text-xs text-slate-400">
          La première commande initialise Git, la deuxième nomme la branche principale <code className="text-white">main</code>, et la troisième relie votre dossier au dépôt GitHub.
        </p>
      </StepCard>

      {/* Step 4 */}
      <StepCard step={4} title="Ajouter les fichiers et faire le premier commit">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ces commandes ajoutent tous les fichiers du projet et créent votre premier point de sauvegarde (commit) :
        </p>
        <div className="space-y-3">
          <CodeBlock code={`git add .`} id="git-add" />
          <CodeBlock code={`git commit -m "🚀 Premier déploiement du portfolio Mentor MALONGA"`} id="git-commit" />
        </div>
      </StepCard>

      {/* Step 5 */}
      <StepCard step={5} title="Envoyer (push) le code sur GitHub">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Cette commande envoie tout votre code vers GitHub :
        </p>
        <CodeBlock code={`git push -u origin main`} id="git-push" />
        <p className="text-xs text-slate-400">
          💡 GitHub vous demandera de vous identifier la première fois. Utilisez votre <strong>Personal Access Token</strong> (PAT) comme mot de passe.
          <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300 ml-1">Créer un token ici</a>
        </p>
      </StepCard>

      {/* Step 6 */}
      <StepCard step={6} title="Activer GitHub Pages avec GitHub Actions">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Le fichier <code className="text-cyan-300">.github/workflows/deploy.yml</code> est déjà inclus dans le projet. Il déploie votre site automatiquement à chaque push. Activez GitHub Pages :
        </p>
        <ol className="text-xs sm:text-sm text-slate-300 space-y-2 pl-4">
          <li className="flex gap-2">
            <span className="text-cyan-400 font-bold">a.</span>
            <span>Allez sur votre dépôt <a href="https://github.com/Mentor077/Mentor077.github.io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Mentor077.github.io</a></span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400 font-bold">b.</span>
            <span>Cliquez sur l'onglet <strong className="text-white">Settings</strong> (en haut du dépôt)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400 font-bold">c.</span>
            <span>Dans le menu à gauche, cliquez sur <strong className="text-white">Pages</strong></span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400 font-bold">d.</span>
            <span>Sous <strong className="text-white">Build and deployment</strong> &gt; <strong className="text-white">Source</strong>, choisissez : <strong className="text-emerald-300">GitHub Actions</strong></span>
          </li>
        </ol>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-emerald-200">
            <Sparkles className="w-4 h-4" /> C'est tout ! Le déploiement est automatique
          </div>
          <p>
            Dès que vous avez poussé le code (étape 5) et activé GitHub Actions (cette étape), GitHub construit et publie votre site automatiquement en ~2 minutes.
          </p>
        </div>
      </StepCard>

      {/* Final verification */}
      <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-3">
          <Globe className="w-6 h-6 text-cyan-400" />
          Vérification Finale
        </h3>
        <p className="text-sm text-slate-300">
          Après avoir terminé toutes les étapes, votre site sera accessible à cette adresse :
        </p>
        <div className="flex items-center gap-3 bg-slate-950 px-5 py-4 rounded-xl border border-slate-800">
          <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 select-all">https://Mentor077.github.io</span>
          <CopyButton text="https://Mentor077.github.io" id="final-url" />
          <a
            href="https://Mentor077.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Ouvrir
          </a>
        </div>
        <p className="text-xs text-slate-400">
          ⏱️ Les 2 premières minutes après le push, GitHub Actions construit le site. Vous pouvez suivre l'avancement dans l'onglet <strong className="text-white">Actions</strong> de votre dépôt.
        </p>
      </div>

      {/* Quick recap: all commands in sequence */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" /> Récapitulatif : Toutes les commandes d'un coup
        </h3>
        <p className="text-xs text-slate-400">Si vous êtes à l'aise avec le terminal, voici la séquence complète à exécuter :</p>
        <CodeBlock
          code={`cd /chemin/vers/votre/dossier/mentor-portfolio
git init
git branch -M main
git remote add origin https://github.com/Mentor077/Mentor077.github.io.git
git add .
git commit -m "🚀 Premier déploiement du portfolio Mentor MALONGA"
git push -u origin main`}
          id="all-commands"
        />
        <p className="text-xs text-slate-400">
          Après le push, allez dans <strong className="text-white">Settings &gt; Pages &gt; Source : GitHub Actions</strong> sur votre dépôt GitHub. C'est tout !
        </p>
      </div>

      {/* Future updates */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 space-y-3 text-xs sm:text-sm text-slate-400">
        <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-cyan-400" /> Pour les mises à jour futures
        </h4>
        <p>
          Quand vous modifiez le code du site, il suffit de relancer ces 3 commandes pour mettre à jour le site en ligne :
        </p>
        <CodeBlock
          code={`git add .
git commit -m "📝 Mise à jour du portfolio"
git push`}
          id="update-commands"
        />
      </div>

    </div>
  );
};
