
import React, { useRef, useState } from 'react';
import { CameraModal } from './CameraModal';

interface ImageUploadBoxProps {
  label: string;
  description: string;
  image: string | null;
  onUpload: (dataUrl: string) => void;
  icon: React.ReactNode;
}

export const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ label, description, image, onUpload, icon }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-3 group">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-amber-400 transition-colors">{label}</h3>
        <button 
          onClick={() => setIsCameraOpen(true)}
          className="text-[10px] font-black uppercase text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-all bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
          CAPTURA EN VIVO
        </button>
      </div>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files?.[0]; if(f) handleFile(f); }}
        className={`relative aspect-[3/4] rounded-[2rem] border-2 border-dashed transition-all duration-700 flex flex-col items-center justify-center overflow-hidden glass
          ${isDragging ? 'border-fuchsia-500 bg-fuchsia-500/10 scale-95' : 
            image ? 'border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-slate-800 hover:border-fuchsia-500/50 hover:bg-white/5'}`}
      >
        {image ? (
          <>
            <img src={image} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="vibrant-gradient px-6 py-3 rounded-full text-xs font-black tracking-tighter shadow-2xl">CAMBIAR IMAGEN</div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center p-8 space-y-4">
            <div className={`p-5 rounded-3xl transition-all duration-500 glass ${isDragging ? 'vibrant-gradient scale-110 shadow-2xl' : 'text-slate-500'}`}>
              {icon}
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight">{description}</p>
              <p className="text-[10px] text-slate-500 mt-2 font-medium tracking-widest uppercase">Arrastra o haz click</p>
            </div>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>

      {isCameraOpen && <CameraModal onCapture={onUpload} onClose={() => setIsCameraOpen(false)} />}
    </div>
  );
};
