import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paintbrush, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface GradientPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PRESET_GRADIENTS = [
  "from-primary to-accent-teal",
  "from-primary to-accent-burgundy",
  "from-accent-teal to-primary",
  "from-accent-burgundy to-primary",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-slate-700 to-slate-900",
  "from-gray-200 to-gray-400",
];

export const GradientPicker = ({ label, value, onChange }: GradientPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal px-3 relative group" type="button">
              <div 
                className={cn("w-4 h-4 rounded-full mr-2 border border-gray-200 bg-gradient-to-br", value)} 
              />
              <span className="flex-1 truncate">{value || 'Sin gradiente'}</span>
              <Paintbrush className="h-4 w-4 opacity-50 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Clases de Tailwind</h4>
                <Input 
                  value={value} 
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="from-primary to-accent-teal"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Preajustes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_GRADIENTS.map((gradient) => (
                    <button
                      key={gradient}
                      type="button"
                      className={cn(
                        "h-10 rounded-md border border-gray-200 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary bg-gradient-to-r",
                        gradient
                      )}
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
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Quitar Gradiente
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
