import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucketName?: string;
}

export const ImageUpload = ({ label, value, onChange, bucketName = 'media' }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      onChange(data.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex gap-4 items-start">
        {value && (
          <div className="relative w-40 h-24 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group">
            {isVideo(value) ? (
              <video src={value} className="w-full h-full object-cover" />
            ) : (
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            )}
            <button
              onClick={() => onChange('')}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        <div 
          className={`flex-1 border-2 border-dashed rounded-lg p-4 transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="p-2 bg-slate-100 rounded-full">
              {isUploading ? (
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              ) : (
                <Upload className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700">
                {isUploading ? "Subiendo..." : "Arrastra o selecciona un archivo"}
              </p>
              <p className="text-xs text-slate-500">
                Soporta imágenes y videos
              </p>
            </div>
            <Input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*,video/*"
            />
            <Button 
              type="button" 
              variant="secondary" 
              size="sm"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
            >
              Seleccionar Archivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
