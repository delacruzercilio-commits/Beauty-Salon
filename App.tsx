
import React, { useState } from 'react';
import { Button } from './components/Button';
import { ImageUploadBox } from './components/ImageUploadBox';
import { generateHairstylePreview } from './services/geminiService';
import { GenerationResult } from './types';

const SERVICES = [
  { 
    name: 'Tinte Profesional', 
    description: 'Coloración de alta gama con pigmentos europeos.', 
    icon: '✨', 
    bg: 'bg-fuchsia-500/10',
    color: 'text-fuchsia-400',
    details: 'Logra matices vibrantes y duraderos con nuestra técnica de micro-pigmentación. Utilizamos productos líderes que cuidan la integridad de tu fibra capilar.',
    achievementGallery: [
      { 
        img: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=800&auto=format&fit=crop', 
        label: 'Cyber Pink Fusion', 
        desc: 'Combinación eléctrica de magenta y violeta con acabado espejo de alta costura.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop', 
        label: 'Electric Blue Edge', 
        desc: 'Coloración fantasía de larga duración con profundidad dimensional y brillo extremo.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=800&auto=format&fit=crop', 
        label: 'Rainbow Avant-Garde', 
        desc: 'Transiciones suaves de espectro completo para una personalidad audaz y única.' 
      }
    ]
  },
  { 
    name: 'Lavado Luxury', 
    description: 'Terapia capilar con masaje shiatsu relajante.', 
    icon: '💆‍♀️', 
    bg: 'bg-purple-500/10',
    color: 'text-purple-400',
    details: 'Siente la pureza del agua tratada y nuestros tónicos botánicos mientras disfrutas de un masaje craneal diseñado para liberar el estrés.',
    achievementGallery: [
      { 
        img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop', 
        label: 'Deep Spa Wash', 
        desc: 'Experiencia inmersiva de lavado con espumas ricas en nutrientes y agua a temperatura ideal.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop', 
        label: 'Hydration Fountain', 
        desc: 'Infusión de hidratación profunda durante el lavado para revitalizar la fibra capilar desde la raíz.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?q=80&w=800&auto=format&fit=crop', 
        label: 'Zen Scalp Therapy', 
        desc: 'Técnica de lavado terapéutico que combina limpieza experta con relajación sensorial.' 
      }
    ]
  },
  { 
    name: 'Tratamientos Gold', 
    description: 'Hidratación con partículas de seda y keratina.', 
    icon: '🏆', 
    bg: 'bg-amber-500/10',
    color: 'text-amber-400',
    details: 'Restaura la vitalidad con nuestra fórmula exclusiva de aminoácidos y micro-partículas de oro para una suavidad inigualable.',
    achievementGallery: [
      { 
        img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop', 
        label: 'Silk Infusion Result', 
        desc: 'Tratamiento intensivo que devuelve la elasticidad y suavidad de la seda al cabello seco.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=800&auto=format&fit=crop', 
        label: 'Keratin Smoothing', 
        desc: 'Control total del frizz y alineación de la fibra capilar con brillo radiante.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop', 
        label: 'Gloss Coating', 
        desc: 'Capa protectora de alto brillo que resalta el color y protege contra el calor.' 
      }
    ]
  },
  { 
    name: 'Corte Editorial', 
    description: 'Diseño de imagen personalizado por expertos.', 
    icon: '✂️', 
    bg: 'bg-indigo-500/10',
    color: 'text-indigo-400',
    details: 'Arquitectura capilar diseñada para resaltar tus facciones únicas. Analizamos tu visagismo para crear el corte perfecto.',
    achievementGallery: [
      { 
        img: 'https://images.unsplash.com/photo-1617391654484-2894195c4ab9?q=80&w=1200&auto=format&fit=crop', 
        label: 'Magenta Couture Cut', 
        desc: 'Un corte de vanguardia con capas profundas y un tono magenta neón que redefine la elegancia moderna.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1605983023444-dc9534005273?q=80&w=1200&auto=format&fit=crop', 
        label: 'Emerald Editorial Flow', 
        desc: 'Fluidez y movimiento con una coloración esmeralda profunda, diseñada para pasarelas y portadas de revista.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop', 
        label: 'Precision Layers', 
        desc: 'Capas texturizadas que aportan volumen estratégico y una caída elegante.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1552662793-167732298711?q=80&w=800&auto=format&fit=crop', 
        label: 'Avant-Garde Pixie', 
        desc: 'Cortes cortos con personalidad y versatilidad para estilos audaces.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1619543015112-985652594589?q=80&w=800&auto=format&fit=crop', 
        label: 'Modern Shag Couture', 
        desc: 'Estructura desfilada con movimiento orgánico para un look editorial desenfadado.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?q=80&w=800&auto=format&fit=crop', 
        label: 'Architectural Bob', 
        desc: 'Líneas nítidas y precisas que definen el rostro con elegancia y un toque de color sutil.' 
      }
    ]
  },
  { 
    name: 'Peinados Gala', 
    description: 'Estilismo impecable para tus noches especiales.', 
    icon: '👸', 
    bg: 'bg-pink-500/10',
    color: 'text-pink-400',
    details: 'Desde recogidos arquitectónicos hasta ondas glamurosas de alfombra roja. Garantizamos duración y elegancia extrema.',
    achievementGallery: [
      { 
        img: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=800&auto=format&fit=crop', 
        label: 'Imperial Gala Updo', 
        desc: 'Recogido estructurado con técnica de entrelazado para una elegancia sin igual.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1492158244976-29b84ba93025?q=80&w=800&auto=format&fit=crop', 
        label: 'Hollywood Gold Waves', 
        desc: 'Ondas pulidas de alto brillo que evocan el glamour de las estrellas mundiales.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop', 
        label: 'Majestic Evening Look', 
        desc: 'Semi-recogido sofisticado con texturas naturales para una presencia imponente en eventos nocturnos.' 
      }
    ]
  },
  { 
    name: 'Nails & Spa', 
    description: 'Cuidado estético premium para manos y pies.', 
    icon: '💅', 
    bg: 'bg-rose-500/10',
    color: 'text-rose-400',
    details: 'Arte en tus uñas y cuidado profundo con aceites esenciales. Experiencia de spa completa para tus extremidades.',
    achievementGallery: [
      { 
        img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop', 
        label: 'Artisan Gel Master', 
        desc: 'Diseños de alta gama con esmaltado semipermanente y acabados artísticos.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop', 
        label: 'Royal Treatment', 
        desc: 'Cuidado profundo de la piel con mascarillas de colágeno y aceites relajantes.' 
      },
      { 
        img: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=800&auto=format&fit=crop', 
        label: 'Luxury Polish', 
        desc: 'Suavidad extrema y terminados impecables que resisten el día a día.' 
      }
    ]
  },
];

const PORTFOLIO = [
  { category: 'Colección Classic', items: [
    { title: 'Bob de Oro Radiante', img: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop' },
    { title: 'Luxury Salon Experience', img: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop' }
  ]},
  { category: 'Corte Editorial', items: [
    { title: 'Magenta Couture Cut', img: 'https://images.unsplash.com/photo-1617391654484-2894195c4ab9?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Emerald Editorial Flow', img: 'https://images.unsplash.com/photo-1605983023444-dc9534005273?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Structural Chic', img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop' },
    { title: 'Precision Edge Sculpt', img: 'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?q=80&w=800&auto=format&fit=crop' }
  ]},
  { category: 'Trendsetter 2025', items: [
    { title: 'Balayage Platinum', img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Elite Styling Lounge', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop' }
  ]},
  { category: 'Avant-Garde', items: [
    { title: 'Escultura Asimétrica', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop' },
    { title: 'Neon Fusion Art', img: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=800&auto=format&fit=crop' },
    { title: 'Prism Spectral Design', img: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop' }
  ]}
];

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<typeof SERVICES[0] | null>(null);

  const phone = "978-828-4094";

  const handleGenerate = async () => {
    if (!personImage || !styleImage) {
      setError("Se requieren ambas imágenes para el análisis.");
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const generatedUrl = await generateHairstylePreview(personImage, styleImage, description);
      setResult({ imageUrl: generatedUrl, timestamp: Date.now() });
      setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }), 500);
    } catch (err) {
      setError("La conexión con el estudio AI falló. Reintenta.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-fuchsia-500 selection:text-white relative bg-[#020617]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full"></div>
      </div>

      <header className="glass sticky top-0 z-[60] px-6 py-5 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 vibrant-gradient rounded-2xl flex items-center justify-center text-white font-serif text-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">G</div>
            <div className="hidden sm:block text-white">
              <h1 className="text-xl font-black tracking-tighter leading-none text-white">GENESIS</h1>
              <span className="text-[10px] tracking-[0.4em] text-amber-500 font-bold uppercase">BEAUTY STUDIO</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <a href="#visualizador" className="hover:text-fuchsia-400 transition-colors">AI Studio</a>
            <a href="#servicios" className="hover:text-fuchsia-400 transition-colors">Servicios</a>
            <a href="#portafolio" className="hover:text-fuchsia-400 transition-colors">Portafolio</a>
            <a href="#contacto" className="hover:text-fuchsia-400 transition-colors">Reservar</a>
          </nav>

          <Button variant="gold" className="!px-6 !py-3 !text-[10px]" onClick={() => window.location.href=`tel:${phone}`}>
            LLAMAR AHORA
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        <section className="pt-24 pb-32 px-6 text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full mb-4 border-fuchsia-500/20">
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black tracking-widest text-fuchsia-300 uppercase">Tecnología de Vanguardia</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-serif italic font-bold leading-[0.9] text-white">
            Tu Belleza, <br />
            <span className="gold-text">Redefinida.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Experimenta el futuro del estilismo. Fusiona tu imagen con tendencias globales antes de tocarlas en nuestro salón.
          </p>
          <div className="pt-8">
             <button onClick={() => document.getElementById('visualizador')?.scrollIntoView({behavior: 'smooth'})} className="group relative px-1 py-1 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 transition-all hover:scale-105 active:scale-95">
                <div className="bg-slate-950 px-10 py-4 rounded-full flex items-center gap-3">
                  <span className="text-xs font-black tracking-widest text-white uppercase">Comenzar Experiencia</span>
                  <svg className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
             </button>
          </div>
        </section>

        <section id="visualizador" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
              <ImageUploadBox label="Client Look" description="Sube tu mejor foto" image={personImage} onUpload={setPersonImage} icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
              <ImageUploadBox label="Inspiración" description="Sube el estilo soñado" image={styleImage} onUpload={setStyleImage} icon={<svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Instrucciones de Personalización</label>
                <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ej: Mantenlo castaño con reflejos ámbar, flequillo desfilado..."
                    className="w-full h-48 bg-slate-900/50 p-6 rounded-[22px] text-fuchsia-100 border-none focus:ring-2 focus:ring-fuchsia-500/50 outline-none transition-all resize-none font-medium placeholder:text-slate-700 text-white"
                  />
                </div>
              </div>

              {error && <div className="p-4 bg-red-500/10 text-red-400 rounded-2xl text-[11px] font-bold border border-red-500/20">{error}</div>}

              <div className="space-y-4">
                <Button onClick={handleGenerate} className="w-full !py-6 text-sm" isLoading={isGenerating} disabled={!personImage || !styleImage}>TRANSFORMAR LOOK</Button>
                <Button variant="outline" onClick={() => { setPersonImage(null); setStyleImage(null); setResult(null); }} className="w-full">REINICIAR</Button>
              </div>
            </div>
          </div>
        </section>

        {result && (
          <section id="result-section" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24">
            <div className="glass p-8 md:p-16 rounded-[4rem] border-fuchsia-500/30 overflow-hidden relative shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
               <div className="absolute top-0 right-0 w-full h-full bg-vibrant-gradient opacity-[0.03]"></div>
               <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="space-y-10">
                    <div className="inline-block gold-text font-black text-sm tracking-widest uppercase border-b border-amber-500/30 pb-2">Tu Visión Genesis</div>
                    <h3 className="text-5xl md:text-7xl font-serif italic font-bold text-white leading-tight">La perfección, <br /> hecha imagen.</h3>
                    <p className="text-slate-400 text-lg font-light leading-relaxed">Esta es una proyección de alta fidelidad. Nuestros estilistas senior están listos para recrear este resultado exacto para ti.</p>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <Button variant="gold" className="flex-1 !py-5" onClick={() => window.location.href=`tel:${phone}`}>RESERVAR CITA</Button>
                      <a href={result.imageUrl} download="genesis-look.png" className="flex-1 flex items-center justify-center gap-2 glass rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Descargar
                      </a>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                      <img src={result.imageUrl} alt="Resultado" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-8 -left-8 glass p-8 rounded-3xl border-fuchsia-500/20 shadow-2xl hidden lg:block transform group-hover:translate-x-4 transition-transform">
                      <p className="text-[10px] text-fuchsia-400 font-black tracking-widest uppercase mb-1">PROCESADO POR</p>
                      <p className="text-2xl font-serif italic font-bold text-white">Genesis AI Studio</p>
                    </div>
                  </div>
               </div>
            </div>
          </section>
        )}

        <section id="servicios" className="max-w-7xl mx-auto px-6 py-32 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white">Experiencias <span className="gold-text">Exclusivas</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg font-light">Elevamos el concepto de salón a un santuario de belleza. Haz clic en un servicio para visualizar el logro.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <button 
                key={i} 
                onClick={() => setActiveService(s)}
                className={`text-left p-10 rounded-[2.5rem] border border-white/5 hover:border-fuchsia-500/30 transition-all group glass overflow-hidden relative active:scale-95`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${s.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="text-5xl mb-8 relative z-10 group-hover:scale-110 transition-transform inline-block grayscale group-hover:grayscale-0">{s.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-4 relative z-10 tracking-tight">{s.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10 group-hover:text-slate-300 transition-colors mb-6">{s.description}</p>
                <div className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Ver Visualización <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </button>
            ))}
          </div>

          {activeService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 animate-in fade-in zoom-in duration-300">
              <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl" onClick={() => setActiveService(null)}></div>
              <div className="relative glass w-full max-w-6xl rounded-[3rem] overflow-hidden border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row h-full max-h-[90vh]">
                <button 
                  onClick={() => setActiveService(null)} 
                  className="absolute top-8 right-8 z-50 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="lg:w-3/5 grid grid-cols-2 grid-rows-2 gap-1 p-2 bg-slate-900/50 overflow-y-auto lg:overflow-hidden text-white">
                  {/* Grid layout that scales with achievement count */}
                  <div className={`relative group overflow-hidden rounded-t-[2.5rem] lg:rounded-tr-none ${activeService.achievementGallery.length > 3 ? 'col-span-2 row-span-1 h-[60%]' : 'col-span-2 row-span-1'}`}>
                    <img src={activeService.achievementGallery[0].img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 p-4">
                      <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Destacado</span>
                      <h5 className="text-white text-xl font-bold mb-1">{activeService.achievementGallery[0].label}</h5>
                      <p className="text-slate-300 text-xs font-medium max-w-xs">{activeService.achievementGallery[0].desc}</p>
                    </div>
                  </div>
                  
                  <div className={`grid gap-1 ${activeService.achievementGallery.length > 5 ? 'col-span-2 grid-cols-5 h-[40%]' : activeService.achievementGallery.length > 3 ? 'col-span-2 grid-cols-4 h-[40%]' : 'col-span-2 grid-cols-2 h-auto'}`}>
                    {activeService.achievementGallery.slice(1).map((item, idx) => (
                      <div key={idx} className="relative overflow-hidden group">
                        <img src={item.img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/40 transition-all p-4 flex flex-col justify-end">
                           <p className="text-white text-[10px] font-bold tracking-tight mb-0.5">{item.label}</p>
                           <p className="text-slate-400 text-[8px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity truncate">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-2/5 p-12 sm:p-16 flex flex-col justify-center space-y-8 overflow-y-auto bg-slate-900/40">
                    <div className={`inline-block w-16 h-16 ${activeService.bg} rounded-2xl flex items-center justify-center text-4xl shadow-2xl`}>
                      {activeService.icon}
                    </div>
                    <div className="space-y-4">
                      <h3 className={`text-4xl font-bold ${activeService.color} tracking-tight`}>{activeService.name}</h3>
                      <p className="text-slate-300 text-lg font-light leading-relaxed">
                        {activeService.details}
                      </p>
                      <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <p className="text-slate-400 text-sm">Productos orgánicos de importación exclusiva de Europa.</p>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                          <p className="text-slate-400 text-sm">Personal certificado en técnicas globales de tendencia 2025.</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8 space-y-4">
                      <Button variant="gold" className="w-full !py-5" onClick={() => window.location.href=`tel:${phone}`}>
                        LLAMAR PARA AGENDAR CITA
                      </Button>
                      <button onClick={() => setActiveService(null)} className="w-full text-[10px] font-black tracking-widest text-slate-500 uppercase hover:text-white transition-colors">Volver al catálogo</button>
                    </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <section id="portafolio" className="max-w-7xl mx-auto px-6 py-32 space-y-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white">Nuestra <span className="text-fuchsia-500 italic">Curaduría</span></h2>
              <p className="text-slate-500 text-lg font-light">Una mirada a nuestras creaciones más icónicas y vibrantes.</p>
            </div>
            <Button variant="outline" onClick={() => window.open('https://instagram.com')}>EXPLORAR MÁS</Button>
          </div>
          
          <div className="space-y-32 text-white">
            {PORTFOLIO.map((cat, idx) => (
              <div key={idx} className="space-y-12">
                <div className="flex items-center gap-6">
                  <h3 className="text-sm font-black tracking-[0.5em] text-amber-500 uppercase">{cat.category}</h3>
                  <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {cat.items.map((item, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-[3rem] aspect-[16/10] glass ring-1 ring-white/5">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 opacity-0 group-hover:opacity-100">
                        <h5 className="text-3xl font-serif font-bold text-white mb-2">{item.title}</h5>
                        <p className="text-fuchsia-400 font-black text-[10px] tracking-widest uppercase">Diseño Genesis Studio</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="contacto" className="bg-slate-950/50 backdrop-blur-3xl pt-32 pb-16 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 vibrant-gradient rounded-3xl flex items-center justify-center text-white font-serif text-3xl shadow-2xl">G</div>
              <div className="text-white">
                <h4 className="text-3xl font-black tracking-tighter leading-none text-white">GENESIS</h4>
                <span className="text-xs tracking-[0.5em] text-amber-500 font-bold uppercase">BEAUTY STUDIO</span>
              </div>
            </div>
            <p className="text-slate-500 text-xl font-light leading-relaxed max-w-md">
              Donde la alta peluquería se encuentra con el futuro. Elevamos tu confianza a través de la perfección técnica.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase border-b border-white/5 pb-4 text-white">Studio Directo</h4>
            <div className="space-y-6">
              <a href={`tel:${phone}`} className="block group">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-amber-500 transition-colors">Reserva tu Experiencia</p>
                <p className="text-3xl font-serif italic font-bold text-white group-hover:gold-text transition-all">{phone}</p>
              </a>
              <div className="space-y-2">
                <p className="text-slate-500 text-xs font-medium">Calle de la Moda #100, San Salvador</p>
                <p className="text-slate-500 text-xs font-medium text-white">Lunes - Sábado: 9AM - 8PM</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase border-b border-white/5 pb-4 text-white">Suscripción VIP</h4>
            <div className="space-y-6 text-white">
              <p className="text-slate-500 text-xs font-medium leading-relaxed">Únete a nuestra lista exclusiva para recibir tendencias y beneficios premium.</p>
              <div className="relative">
                <input type="email" placeholder="Email corporativo" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-fuchsia-500 transition-all text-white" />
                <button className="absolute right-2 top-2 w-10 h-10 vibrant-gradient rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-black tracking-widest uppercase">© 2025 GENESIS BEAUTY STUDIO. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
