import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Paintbrush, X, EyeOff } from "lucide-react"

interface ColorPickerProps {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
}

const PRESET_COLORS = [
  "#1B4542", // Primary (Teal)
  "#8F2341", // Accent Burgundy
  "#FCE3E8", // Accent Rose
  "#FFFFFF", // White
  "#000000", // Black
  "#F3F4F6", // Gray 100
  "#4B5563", // Gray 600
  "#1F2937", // Gray 800
];

export const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal px-3 relative group" type="button">
              <div 
                className="w-4 h-4 rounded-full mr-2 border border-gray-200" 
                style={{ background: value || 'transparent' }}
              />
              <span className="flex-1 truncate">{value === 'transparent' ? 'Oculto' : (value || 'Sin color')}</span>
              <Paintbrush className="h-4 w-4 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Color Personalizado</h4>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    value={value === 'transparent' ? '#000000' : (value || "#000000")} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-8 p-1 cursor-pointer"
                  />
                  <Input 
                    value={value === 'transparent' ? '' : (value || '')} 
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 h-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Paleta</h4>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-8 h-8 rounded-md border border-gray-200 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        onChange(color);
                        setIsOpen(false);
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Gradientes</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "linear-gradient(to right, #1B4542, #8F2341)",
                    "linear-gradient(to right, #8F2341, #FCE3E8)",
                    "linear-gradient(to right, #1f2937, #4b5563)",
                    "linear-gradient(to right, hsl(172 44% 19%), hsl(345 80% 90%))",
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
                    "linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%)",
                    "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)"
                  ].map((gradient) => (
                    <button
                      key={gradient}
                      type="button"
                      className="w-8 h-8 rounded-md border border-gray-200 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ background: gradient }}
                      onClick={() => {
                        onChange(gradient);
                        setIsOpen(false);
                      }}
                      title={gradient}
                    />
                  ))}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                type="button"
                className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  onChange('transparent');
                  setIsOpen(false);
                }}
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Ocultar (Transparente)
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                type="button"
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  onChange(undefined);
                  setIsOpen(false);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Quitar Color
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
