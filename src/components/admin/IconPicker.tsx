import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, ChevronDown, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { iconMap } from "@/lib/iconMap"

interface IconPickerProps {
  label: string;
  value: string;
  onChange: (iconName: string) => void;
}

export const IconPicker = ({ label, value, onChange }: IconPickerProps) => {
  const [search, setSearch] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    const iconNames = Object.keys(iconMap).filter(key => 
      key !== "icons" && 
      key !== "createLucideIcon" &&
      key !== "default" &&
      // Ensure it starts with uppercase (components)
      /^[A-Z]/.test(key) &&
      key.toLowerCase().includes(search.toLowerCase())
    );
    return iconNames.slice(0, 200); // Increased limit
  }, [search]);

  // @ts-ignore
  const SelectedIcon = iconMap[value] || iconMap.HelpCircle;

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between font-normal px-3" type="button">
            <div className="flex items-center gap-2">
              <SelectedIcon className="h-4 w-4" />
              <span>{value || 'Seleccionar icono'}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar icono..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <ScrollArea className="h-[300px] p-4">
            <div className="grid grid-cols-4 gap-2">
              {filteredIcons.map((iconName) => {
                // @ts-ignore
                const Icon = iconMap[iconName];
                if (!Icon) return null;
                
                return (
                  <button
                    key={iconName}
                    type="button"
                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                      value === iconName ? "bg-primary/10 text-primary" : ""
                    }`}
                    onClick={() => {
                      onChange(iconName);
                      setIsOpen(false);
                    }}
                    title={iconName}
                  >
                    <Icon className="h-6 w-6" />
                  </button>
                )
              })}
              {filteredIcons.length === 0 && (
                <div className="col-span-4 text-center text-sm text-muted-foreground py-4">
                  No se encontraron iconos
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-2 border-t">
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
              Quitar Icono
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
