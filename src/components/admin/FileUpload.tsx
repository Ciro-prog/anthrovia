import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, FileSpreadsheet, Image as ImageIcon, Link as LinkIcon, Loader2 } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { Attachment } from '@/types/cms';

interface FileUploadProps {
  label: string;
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  bucketName?: string;
}

export const FileUpload = ({ label, attachments, onChange, bucketName = 'media' }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      
      let type: Attachment['type'] = 'link';
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt?.toLowerCase() || '')) type = 'image';
      else if (['pdf'].includes(fileExt?.toLowerCase() || '')) type = 'pdf';
      else if (['xls', 'xlsx', 'csv'].includes(fileExt?.toLowerCase() || '')) type = 'excel';

      const newAttachment: Attachment = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: data.publicUrl,
        type
      };

      onChange([...attachments, newAttachment]);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    onChange(attachments.filter(a => a.id !== id));
  };

  const getIcon = (type: Attachment['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'image': return <ImageIcon className="w-4 h-4 text-blue-500" />;
      default: return <LinkIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="relative">
          <Input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleUpload}
            // accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? "Subiendo..." : "Agregar Archivo"}
          </Button>
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="grid gap-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-md border border-slate-200">
              <div className="flex items-center gap-2 overflow-hidden">
                {getIcon(attachment.type)}
                <span className="text-sm truncate max-w-[200px]" title={attachment.name}>
                  {attachment.name}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeAttachment(attachment.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
