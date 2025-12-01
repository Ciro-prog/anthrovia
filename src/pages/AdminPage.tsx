import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCMS } from "@/context/CMSContext"
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Layout, Type, Image as ImageIcon, Link as LinkIcon, Eye, Edit, Monitor, Smartphone, Trash2, Plus, LogOut } from "lucide-react"
import { HeroSectionContent, ServicesSectionContent, AboutSectionContent, ContactSectionContent } from "@/types/cms"
import { HeroSection } from "@/components/HeroSection"
import { ServicesSection } from "@/components/ServicesSection"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { iconMap } from "@/lib/iconMap"
import { ColorPicker } from "@/components/admin/ColorPicker"
import { IconPicker } from "@/components/admin/IconPicker"

export const AdminPage = () => {
  const { content, updateSection, saveContent, isLoading } = useCMS();
  const [selectedSectionId, setSelectedSectionId] = useState<string>(content.sections[0].id);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const selectedSection = content.sections.find(s => s.id === selectedSectionId);

  const handleSave = () => {
    saveContent();
  };

  const renderPreview = () => {
    switch (selectedSectionId) {
      case 'hero': return <HeroSection />;
      case 'services': return <ServicesSection />;
      case 'about': return <AboutSection />;
      case 'contact': return <ContactSection />;
      default: return <div>Preview not available</div>;
    }
  };

  const renderEditor = () => {
    if (!selectedSection) return <div>Select a section</div>;

    switch (selectedSection.type) {
      case 'hero':
        const heroData = selectedSection as HeroSectionContent;
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título Principal</Label>
                <Input 
                  id="title" 
                  value={heroData.title} 
                  onChange={(e) => updateSection(heroData.id, { title: e.target.value })}
                />
                <ColorPicker 
                  label="Color del Título" 
                  value={heroData.titleColor} 
                  onChange={(color) => updateSection(heroData.id, { titleColor: color })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input 
                  id="subtitle" 
                  value={heroData.subtitle} 
                  onChange={(e) => updateSection(heroData.id, { subtitle: e.target.value })}
                />
                <ColorPicker 
                  label="Color del Subtítulo" 
                  value={heroData.subtitleColor} 
                  onChange={(color) => updateSection(heroData.id, { subtitleColor: color })} 
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description" 
                  value={heroData.description} 
                  onChange={(e) => updateSection(heroData.id, { description: e.target.value })}
                  className="min-h-[100px]"
                />
                <ColorPicker 
                  label="Color de la Descripción" 
                  value={heroData.descriptionColor} 
                  onChange={(color) => updateSection(heroData.id, { descriptionColor: color })} 
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="videoUrl">URL del Video de Fondo</Label>
                <Input 
                  id="videoUrl" 
                  value={heroData.videoUrl} 
                  onChange={(e) => updateSection(heroData.id, { videoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" /> Botones
              </h3>
              <div className="grid gap-4">
                {heroData.buttons.map((button, index) => (
                  <Card key={index} className="bg-slate-50">
                    <CardContent className="p-4 grid gap-4 md:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Texto</Label>
                        <Input 
                          value={button.text}
                          onChange={(e) => {
                            const newButtons = [...heroData.buttons];
                            newButtons[index] = { ...button, text: e.target.value };
                            updateSection(heroData.id, { buttons: newButtons });
                          }}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Enlace</Label>
                        <Input 
                          value={button.link}
                          onChange={(e) => {
                            const newButtons = [...heroData.buttons];
                            newButtons[index] = { ...button, link: e.target.value };
                            updateSection(heroData.id, { buttons: newButtons });
                          }}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Variante</Label>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={button.variant}
                          onChange={(e) => {
                            const newButtons = [...heroData.buttons];
                            newButtons[index] = { ...button, variant: e.target.value as 'primary' | 'secondary' };
                            updateSection(heroData.id, { buttons: newButtons });
                          }}
                        >
                          <option value="primary">Primario</option>
                          <option value="secondary">Secundario</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'services':
        const servicesData = selectedSection as ServicesSectionContent;
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={servicesData.title} 
                  onChange={(e) => updateSection(servicesData.id, { title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker 
                    label="Color del Título" 
                    value={servicesData.titleColor} 
                    onChange={(color) => updateSection(servicesData.id, { titleColor: color })} 
                  />
                  <ColorPicker 
                    label="Fondo del Título" 
                    value={servicesData.headerBgColor} 
                    onChange={(color) => updateSection(servicesData.id, { headerBgColor: color })} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description" 
                  value={servicesData.description} 
                  onChange={(e) => updateSection(servicesData.id, { description: e.target.value })}
                  className="min-h-[100px]"
                />
                <ColorPicker 
                  label="Color de la Descripción" 
                  value={servicesData.descriptionColor} 
                  onChange={(color) => updateSection(servicesData.id, { descriptionColor: color })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">URL del Video de Fondo</Label>
                <Input 
                  id="videoUrl" 
                  value={servicesData.videoUrl} 
                  onChange={(e) => updateSection(servicesData.id, { videoUrl: e.target.value })}
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Servicios</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const newService = {
                      title: "Nuevo Servicio",
                      description: "Descripción del nuevo servicio",
                      iconName: "Layers",
                      color: "from-primary to-accent-teal"
                    };
                    updateSection(servicesData.id, { services: [...servicesData.services, newService] });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Servicio
                </Button>
              </div>
              <div className="grid gap-4">
                {servicesData.services.map((service, index) => (
                  <Card key={index} className="bg-slate-50 relative group">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      onClick={() => {
                        const newServices = servicesData.services.filter((_, i) => i !== index);
                        updateSection(servicesData.id, { services: newServices });
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <CardContent className="p-4 grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Título</Label>
                          <Input 
                            value={service.title}
                            onChange={(e) => {
                              const newServices = [...servicesData.services];
                              newServices[index] = { ...service, title: e.target.value };
                              updateSection(servicesData.id, { services: newServices });
                            }}
                            placeholder="Título del servicio"
                          />
                        </div>
                        <div className="grid gap-2">
                          <IconPicker 
                            label="Icono"
                            value={service.iconName}
                            onChange={(iconName) => {
                              const newServices = [...servicesData.services];
                              newServices[index] = { ...service, iconName };
                              updateSection(servicesData.id, { services: newServices });
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Descripción</Label>
                        <Textarea 
                          value={service.description}
                          onChange={(e) => {
                            const newServices = [...servicesData.services];
                            newServices[index] = { ...service, description: e.target.value };
                            updateSection(servicesData.id, { services: newServices });
                          }}
                          placeholder="Descripción"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        const aboutData = selectedSection as AboutSectionContent;
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={aboutData.title} 
                  onChange={(e) => updateSection(aboutData.id, { title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker 
                    label="Color del Título" 
                    value={aboutData.titleColor} 
                    onChange={(color) => updateSection(aboutData.id, { titleColor: color })} 
                  />
                  <ColorPicker 
                    label="Fondo del Título" 
                    value={aboutData.headerBgColor} 
                    onChange={(color) => updateSection(aboutData.id, { headerBgColor: color })} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Introducción (Párrafos)</Label>
                {aboutData.introText.map((text, index) => (
                  <Textarea 
                    key={index}
                    value={text} 
                    onChange={(e) => {
                      const newIntro = [...aboutData.introText];
                      newIntro[index] = e.target.value;
                      updateSection(aboutData.id, { introText: newIntro });
                    }}
                    className="min-h-[100px]"
                  />
                ))}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="videoUrl">URL del Video de Fondo</Label>
                <Input 
                  id="videoUrl" 
                  value={aboutData.videoUrl} 
                  onChange={(e) => updateSection(aboutData.id, { videoUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 border-t pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Propósito</h3>
                <Input 
                  value={aboutData.purpose.title}
                  onChange={(e) => updateSection(aboutData.id, { purpose: { ...aboutData.purpose, title: e.target.value } })}
                />
                <Textarea 
                  value={aboutData.purpose.description}
                  onChange={(e) => updateSection(aboutData.id, { purpose: { ...aboutData.purpose, description: e.target.value } })}
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Misión</h3>
                <Input 
                  value={aboutData.mission.title}
                  onChange={(e) => updateSection(aboutData.id, { mission: { ...aboutData.mission, title: e.target.value } })}
                />
                <Textarea 
                  value={aboutData.mission.description}
                  onChange={(e) => updateSection(aboutData.id, { mission: { ...aboutData.mission, description: e.target.value } })}
                />
              </div>
            </div>
          </div>
        );

      case 'contact':
        const contactData = selectedSection as ContactSectionContent;
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={contactData.title} 
                  onChange={(e) => updateSection(contactData.id, { title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker 
                    label="Color del Título" 
                    value={contactData.titleColor} 
                    onChange={(color) => updateSection(contactData.id, { titleColor: color })} 
                  />
                  <ColorPicker 
                    label="Fondo del Título" 
                    value={contactData.headerBgColor} 
                    onChange={(color) => updateSection(contactData.id, { headerBgColor: color })} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea 
                  id="description" 
                  value={contactData.description} 
                  onChange={(e) => updateSection(contactData.id, { description: e.target.value })}
                  className="min-h-[100px]"
                />
                <ColorPicker 
                  label="Color de la Descripción" 
                  value={contactData.descriptionColor} 
                  onChange={(color) => updateSection(contactData.id, { descriptionColor: color })} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">Número de WhatsApp (sin +)</Label>
                <Input 
                  id="whatsapp" 
                  value={contactData.whatsappNumber} 
                  onChange={(e) => updateSection(contactData.id, { whatsappNumber: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            Editor no implementado para este tipo de sección aún.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <Layout className="w-6 h-6" />
            CMS Admin
          </h1>
        </div>
        <nav className="p-4 space-y-2">
          {content.sections.map(section => (
            <button
              key={section.id}
              onClick={() => setSelectedSectionId(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                selectedSectionId === section.id 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {section.type === 'hero' && <ImageIcon className="w-4 h-4" />}
              {section.type === 'services' && <Layout className="w-4 h-4" />}
              {section.type === 'about' && <Type className="w-4 h-4" />}
              {section.type === 'contact' && <LinkIcon className="w-4 h-4" />}
              <span className="capitalize">{section.id}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              {isPreviewMode ? `Previsualizando: ${selectedSectionId}` : `Editando: ${selectedSectionId}`}
            </h2>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  !isPreviewMode ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isPreviewMode ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            {isPreviewMode && (
              <div className="flex bg-gray-100 rounded-lg p-1 ml-4">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    previewDevice === 'desktop' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title="Vista Escritorio"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    previewDevice === 'mobile' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-900'
                  }`}
                  title="Vista Móvil"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <a href="/" target="_blank">Ver Sitio</a>
            </Button>
            <Button onClick={handleLogout} variant="destructive" size="icon" title="Cerrar Sesión">
              <LogOut className="w-4 h-4" />
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="gap-2">
              <Save className="w-4 h-4" />
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {isPreviewMode ? (
            <div className={`transition-all duration-300 ease-in-out ${
              previewDevice === 'mobile' 
                ? 'w-[375px] mx-auto border-x-8 border-y-[60px] border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden h-[812px] bg-white relative' 
                : 'w-full border rounded-xl overflow-hidden shadow-2xl bg-white'
            }`}>
              {previewDevice === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-50"></div>
              )}
              <div className={`h-full overflow-y-auto ${previewDevice === 'mobile' ? 'scrollbar-hide' : ''}`}>
                {renderPreview()}
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contenido de la Sección</CardTitle>
              </CardHeader>
              <CardContent>
                {renderEditor()}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
