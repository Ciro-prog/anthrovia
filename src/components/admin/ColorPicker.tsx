import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Paintbrush } from "lucide-react"

interface ColorPickerProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
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

export const ColorPicker = ({ label, value = "#000000", onChange }: ColorPickerProps) => {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal px-3">
              <div 
                className="w-4 h-4 rounded-full mr-2 border border-gray-200" 
                style={{ backgroundColor: value }}
              />
              <span className="flex-1">{value}</span>
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
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-8 p-1 cursor-pointer"
                  />
                  <Input 
                    value={value} 
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
                      className="w-8 h-8 rounded-md border border-gray-200 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ backgroundColor: color }}
                      onClick={() => onChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
