/* ===== Step Upload — Upload de materiais de referência =====
 * Permite upload de áudios, vídeos e prints para construção da IA
 * ============================================================= */

import { useState, useRef } from "react";
import { Upload, X, FileAudio, FileImage, FileVideo, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface StepUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  observacoes: string;
  onObservacoesChange: (text: string) => void;
}

export default function StepUpload({ files, onFilesChange, observacoes, onObservacoesChange }: StepUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    onFilesChange([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("audio")) return <FileAudio className="w-4 h-4 text-[#A100FF]" />;
    if (type.startsWith("video")) return <FileVideo className="w-4 h-4 text-[#A100FF]" />;
    return <FileImage className="w-4 h-4 text-[#A100FF]" />;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[#A100FF]/10 border border-[#A100FF]/20 flex items-center justify-center">
          <Upload className="w-5 h-5 text-[#A100FF]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Materiais de Referência</h2>
          <p className="text-xs text-muted-foreground">Opcional — ajuda a personalizar sua IA</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-8 mt-4">
        Envie áudios de como você atende, prints de conversas com pacientes ou vídeos de referência. 
        Esses materiais ajudam a construir uma IA que replica seu tom de voz e estilo de comunicação.
      </p>

      {/* Área de upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          dragOver ? "border-[#A100FF] bg-[#A100FF]/5" : "border-border/40 hover:border-[#A100FF]/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-foreground font-medium mb-1">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="text-xs text-muted-foreground">
          Áudios (MP3, WAV), Imagens (PNG, JPG), Vídeos (MP4) — máx. 50MB cada
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*,image/*,video/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <Label className="text-sm font-medium">Arquivos enviados ({files.length})</Label>
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <button onClick={() => removeFile(i)} className="p-1 hover:bg-destructive/10 rounded transition-colors">
                <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Observações */}
      <div className="mt-8 space-y-2">
        <Label>Observações adicionais</Label>
        <Textarea
          value={observacoes}
          onChange={(e) => onObservacoesChange(e.target.value)}
          placeholder="Algo mais que devemos saber para construir sua IA? Contexto adicional, preferências específicas..."
          className="bg-background min-h-[100px]"
        />
      </div>

      {/* Dica */}
      <div className="mt-6 p-4 bg-[#A100FF]/5 border border-[#A100FF]/20 rounded-lg">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Dica:</strong> Quanto mais materiais de referência você enviar, 
          mais precisa será a personalização da sua IA. Áudios de atendimento real são especialmente valiosos 
          para capturar seu tom de voz e estilo de comunicação.
        </p>
      </div>
    </div>
  );
}
