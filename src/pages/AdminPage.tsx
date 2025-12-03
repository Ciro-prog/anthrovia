import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useCMS } from "@/context/CMSContext"
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Layout, Type, Image as ImageIcon, Link as LinkIcon, Eye, Edit, Monitor, Smartphone, Trash2, Plus, LogOut, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { HeroSectionContent, ServicesSectionContent, AboutSectionContent, ContactSectionContent, PostsSectionContent, NewsSectionContent, NewsItem, NewsMedia } from "@/types/cms"
import { ColorPicker } from "@/components/admin/ColorPicker"
import { IconPicker } from "@/components/admin/IconPicker"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { GradientPicker } from "@/components/admin/GradientPicker"
import { FileUpload } from "@/components/admin/FileUpload"
import { Switch } from "@/components/ui/switch"

export const AdminPage = () => {
  const { content, updateSection, saveContent, isLoading } = useCMS();
  const [selectedSectionId, setSelectedSectionId] = useState<string>(content.sections[0].id);
  const [activeTab, setActiveTab] = useState('home');
  const [previewArticleId, setPreviewArticleId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const selectedSection = content.sections.find(s => s.id === selectedSectionId);

  const handleSave = () => {
    saveContent();
  };

  // Send updates to iframe when content changes
  useEffect(() => {
    if (isPreviewMode && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'cms-update',
        content
      }, '*');
    }
  }, [content, isPreviewMode]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'preview-ready' && iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({
          type: 'cms-update',
          content
        }, '*');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [content]); // Add content dependency to ensure fresh content is sent

  const renderPreview = () => {
    let url = `/preview?section=${selectedSectionId}`;
    if (selectedSection?.type === 'news') {
      url += `&view=${activeTab}`;
      if (activeTab === 'items' && previewArticleId) {
        url += `&articleId=${previewArticleId}`;
      }
    }

    return (
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full border-0"
        title="Preview"
        onLoad={() => {
           // Send initial content when iframe loads
           iframeRef.current?.contentWindow?.postMessage({
             type: 'cms-update',
             content
           }, '*');
        }}
      />
    );
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
                  value={heroData.titleColor || '#ffffff'} 
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
                  value={heroData.subtitleColor || '#e2e8f0'} 
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
                  value={heroData.descriptionColor || '#cbd5e1'} 
                  onChange={(color) => updateSection(heroData.id, { descriptionColor: color })} 
                />
              </div>

              <div className="grid gap-2">
                <Label>Tipo de Fondo</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="heroBackgroundType"
                      checked={heroData.backgroundType !== 'color'} 
                      onChange={() => updateSection(heroData.id, { backgroundType: 'media' })}
                    />
                    Multimedia (Imagen/Video)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="heroBackgroundType"
                      checked={heroData.backgroundType === 'color'} 
                      onChange={() => updateSection(heroData.id, { backgroundType: 'color' })}
                    />
                    Color/Gradiente
                  </label>
                </div>
              </div>

              {heroData.backgroundType === 'color' ? (
                <div className="grid gap-2">
                  <GradientPicker 
                    label="Color de Fondo" 
                    value={heroData.backgroundColor || ''} 
                    onChange={(color) => updateSection(heroData.id, { backgroundColor: color })} 
                  />
                </div>
              ) : (
                <div className="grid gap-2">
                  <ImageUpload 
                    label="Fondo (Imagen o Video)" 
                    value={heroData.videoUrl} 
                    onChange={(url) => updateSection(heroData.id, { videoUrl: url })} 
                  />
                </div>
              )}
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
                    value={servicesData.titleColor || '#1f2937'} 
                    onChange={(color) => updateSection(servicesData.id, { titleColor: color })} 
                  />
                  <ColorPicker 
                    label="Fondo del Título" 
                    value={servicesData.headerBgColor || 'hsl(345 60% 35%)'} 
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
                  value={servicesData.descriptionColor || '#4b5563'} 
                  onChange={(color) => updateSection(servicesData.id, { descriptionColor: color })} 
                />
              </div>
              <div className="grid gap-2">
                <Label>Tipo de Fondo</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="servicesBackgroundType"
                      checked={servicesData.backgroundType !== 'color'} 
                      onChange={() => updateSection(servicesData.id, { backgroundType: 'media' })}
                    />
                    Multimedia (Imagen/Video)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="servicesBackgroundType"
                      checked={servicesData.backgroundType === 'color'} 
                      onChange={() => updateSection(servicesData.id, { backgroundType: 'color' })}
                    />
                    Color/Gradiente
                  </label>
                </div>
              </div>

              {servicesData.backgroundType === 'color' ? (
                <div className="grid gap-2">
                  <GradientPicker 
                    label="Color de Fondo" 
                    value={servicesData.backgroundColor || ''} 
                    onChange={(color) => updateSection(servicesData.id, { backgroundColor: color })} 
                  />
                </div>
              ) : (
                <div className="grid gap-2">
                  <ImageUpload 
                    label="Fondo (Imagen o Video)" 
                    value={servicesData.videoUrl} 
                    onChange={(url) => updateSection(servicesData.id, { videoUrl: url })} 
                  />
                </div>
              )}
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
                          <GradientPicker 
                            label="Color/Gradiente (Icono y Borde)"
                            value={service.color}
                            onChange={(color) => {
                              const newServices = [...servicesData.services];
                              newServices[index] = { ...service, color };
                              updateSection(servicesData.id, { services: newServices });
                            }}
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
                    value={aboutData.titleColor || '#1f2937'} 
                    onChange={(color) => updateSection(aboutData.id, { titleColor: color })} 
                  />
                  <ColorPicker 
                    label="Fondo del Título" 
                    value={aboutData.headerBgColor || 'hsl(172 44% 19%)'} 
                    onChange={(color) => updateSection(aboutData.id, { headerBgColor: color })} 
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Texto de Introducción (Párrafos)</Label>
                {aboutData.introText.map((text, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea 
                      value={text}
                      onChange={(e) => {
                        const newIntro = [...aboutData.introText];
                        newIntro[index] = e.target.value;
                        updateSection(aboutData.id, { introText: newIntro });
                      }}
                      className="min-h-[100px]"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newIntro = aboutData.introText.filter((_, i) => i !== index);
                        updateSection(aboutData.id, { introText: newIntro });
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => updateSection(aboutData.id, { introText: [...aboutData.introText, "Nuevo párrafo"] })}
                >
                  <Plus className="w-4 h-4 mr-2" /> Agregar Párrafo
                </Button>
              </div>

              <div className="space-y-4 border-t pt-4">
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

              <div className="space-y-4 border-t pt-4">
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

              <div className="grid gap-2 border-t pt-4">
                <Label>Tipo de Fondo</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="aboutBackgroundType"
                      checked={aboutData.backgroundType !== 'color'} 
                      onChange={() => updateSection(aboutData.id, { backgroundType: 'media' })}
                    />
                    Multimedia (Imagen/Video)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="aboutBackgroundType"
                      checked={aboutData.backgroundType === 'color'} 
                      onChange={() => updateSection(aboutData.id, { backgroundType: 'color' })}
                    />
                    Color/Gradiente
                  </label>
                </div>

                {aboutData.backgroundType === 'color' ? (
                  <div className="grid gap-2 mt-2">
                    <GradientPicker 
                      label="Color de Fondo" 
                      value={aboutData.backgroundColor || ''} 
                      onChange={(color) => updateSection(aboutData.id, { backgroundColor: color })} 
                    />
                  </div>
                ) : (
                  <div className="grid gap-2 mt-2">
                    <ImageUpload 
                      label="Fondo (Imagen o Video)" 
                      value={aboutData.videoUrl} 
                      onChange={(url) => updateSection(aboutData.id, { videoUrl: url })} 
                    />
                  </div>
                )}
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
                    value={contactData.titleColor || '#1f2937'} 
                    onChange={(color) => updateSection(contactData.id, { titleColor: color })} 
                  />
                  <ColorPicker 
                    label="Fondo del Título" 
                    value={contactData.headerBgColor || 'linear-gradient(to right, hsl(172 44% 19%), hsl(345 80% 90%))'} 
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
                  value={contactData.descriptionColor || '#4b5563'} 
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

              <div className="grid gap-2 border-t pt-4">
                <Label>Tipo de Fondo</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="contactBackgroundType"
                      checked={contactData.backgroundType !== 'color'} 
                      onChange={() => updateSection(contactData.id, { backgroundType: 'media' })}
                    />
                    Multimedia (Imagen/Video)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="contactBackgroundType"
                      checked={contactData.backgroundType === 'color'} 
                      onChange={() => updateSection(contactData.id, { backgroundType: 'color' })}
                    />
                    Color/Gradiente
                  </label>
                </div>

                {contactData.backgroundType === 'color' ? (
                  <div className="grid gap-2 mt-2">
                    <GradientPicker 
                      label="Color de Fondo" 
                      value={contactData.backgroundColor || ''} 
                      onChange={(color) => updateSection(contactData.id, { backgroundColor: color })} 
                    />
                  </div>
                ) : (
                  <div className="grid gap-2 mt-2">
                    <ImageUpload 
                      label="Fondo (Imagen o Video)" 
                      value={contactData.videoUrl || ''} 
                      onChange={(url) => updateSection(contactData.id, { videoUrl: url })} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'posts':
        const postsData = selectedSection as PostsSectionContent;
        return (
          <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label className="text-base">Mostrar Sección de Publicaciones</Label>
                    <p className="text-sm text-gray-500">
                      Activa o desactiva la visibilidad de esta sección en el sitio público
                    </p>
                  </div>
                  <Switch
                    checked={postsData.isVisible}
                    onChange={(e) => updateSection(postsData.id, { isVisible: e.target.checked })}
                  />
                </div>

                <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  value={postsData.title} 
                  onChange={(e) => updateSection(postsData.id, { title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker 
                    label="Color del Título" 
                    value={postsData.titleColor || '#1f2937'} 
                    onChange={(color) => updateSection(postsData.id, { titleColor: color })} 
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input 
                  id="subtitle" 
                  value={postsData.subtitle} 
                  onChange={(e) => updateSection(postsData.id, { subtitle: e.target.value })}
                />
                <ColorPicker 
                  label="Color del Subtítulo" 
                  value={postsData.subtitleColor || '#64748b'} 
                  onChange={(color) => updateSection(postsData.id, { subtitleColor: color })} 
                />
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold flex items-center justify-between">
                  Publicaciones
                  <Button
                    size="sm"
                    onClick={() => {
                      const newPost = {
                        id: Date.now().toString(),
                        imageUrl: "",
                        description: "",
                        postUrl: "",
                        platform: "instagram" as const
                      };
                      updateSection(postsData.id, { posts: [...postsData.posts, newPost] });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Nueva Publicación
                  </Button>
                </h3>
                
                <div className="grid gap-6">
                  {postsData.posts.map((post, index) => (
                    <Card key={post.id} className="relative">
                      <div className="absolute top-2 right-2 z-10 flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => {
                            const newPosts = [...postsData.posts];
                            [newPosts[index - 1], newPosts[index]] = [newPosts[index], newPosts[index - 1]];
                            updateSection(postsData.id, { posts: newPosts });
                          }}
                          title="Mover Arriba"
                        >
                          <ChevronLeft className="w-4 h-4 rotate-90" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={index === postsData.posts.length - 1}
                          onClick={() => {
                            const newPosts = [...postsData.posts];
                            [newPosts[index + 1], newPosts[index]] = [newPosts[index], newPosts[index + 1]];
                            updateSection(postsData.id, { posts: newPosts });
                          }}
                          title="Mover Abajo"
                        >
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newPosts = postsData.posts.filter(p => p.id !== post.id);
                            updateSection(postsData.id, { posts: newPosts });
                          }}
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4 grid gap-4">
                        <div className="grid gap-2">
                          <ImageUpload 
                            label="Imagen de Portada" 
                            value={post.imageUrl} 
                            onChange={(url) => {
                              const newPosts = [...postsData.posts];
                              newPosts[index] = { ...post, imageUrl: url };
                              updateSection(postsData.id, { posts: newPosts });
                            }} 
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Plataforma</Label>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={post.platform}
                            onChange={(e) => {
                              const newPosts = [...postsData.posts];
                              newPosts[index] = { ...post, platform: e.target.value as 'instagram' | 'linkedin' };
                              updateSection(postsData.id, { posts: newPosts });
                            }}
                          >
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">LinkedIn</option>
                          </select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Enlace a la Publicación</Label>
                          <Input 
                            value={post.postUrl}
                            onChange={(e) => {
                              const newPosts = [...postsData.posts];
                              newPosts[index] = { ...post, postUrl: e.target.value };
                              updateSection(postsData.id, { posts: newPosts });
                            }}
                            placeholder="https://..."
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Descripción</Label>
                          <Textarea 
                            value={post.description}
                            onChange={(e) => {
                              const newPosts = [...postsData.posts];
                              newPosts[index] = { ...post, description: e.target.value };
                              updateSection(postsData.id, { posts: newPosts });
                            }}
                            className="min-h-[80px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 border-t pt-4">
                <Label>Tipo de Fondo</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="postsBackgroundType"
                      checked={postsData.backgroundType !== 'color'} 
                      onChange={() => updateSection(postsData.id, { backgroundType: 'media' })}
                    />
                    Multimedia (Imagen/Video)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="postsBackgroundType"
                      checked={postsData.backgroundType === 'color'} 
                      onChange={() => updateSection(postsData.id, { backgroundType: 'color' })}
                    />
                    Color/Gradiente
                  </label>
                </div>

                {postsData.backgroundType === 'color' ? (
                  <div className="grid gap-2 mt-2">
                    <GradientPicker 
                      label="Color de Fondo" 
                      value={postsData.backgroundColor || ''} 
                      onChange={(color) => updateSection(postsData.id, { backgroundColor: color })} 
                    />
                  </div>
                ) : (
                  <div className="grid gap-2 mt-2">
                    <ImageUpload 
                      label="Fondo (Imagen o Video)" 
                      value={postsData.videoUrl || ''} 
                      onChange={(url) => updateSection(postsData.id, { videoUrl: url })} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'news':
        const newsData = selectedSection as NewsSectionContent
        return (
          <Card>
            <CardHeader>
              <CardTitle>Editar Sección de Noticias</CardTitle>
              <div className="flex gap-2 mt-4 border-b">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'home' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sección Home
                </button>
                <button
                  onClick={() => setActiveTab('page')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'page' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Página de Noticias
                </button>
                <button
                  onClick={() => setActiveTab('items')}
                  className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                    activeTab === 'items' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Artículos ({newsData.newsItems.length})
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {activeTab === 'home' && (
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="space-y-0.5">
                      <Label className="text-base">Mostrar Sección de Noticias</Label>
                      <p className="text-sm text-gray-500">
                        Activa o desactiva la visibilidad de esta sección en el sitio público
                      </p>
                    </div>
                    <Switch
                      checked={newsData.isVisible}
                      onChange={(e) => updateSection(newsData.id, { isVisible: e.target.checked })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Título de la Sección (Home)</Label>
                    <Input 
                      value={newsData.title} 
                      onChange={(e) => updateSection(newsData.id, { title: e.target.value })}
                    />
                    <GradientPicker
                      value={newsData.titleColor || '#1f2937'}
                      onChange={(color) => updateSection(newsData.id, { titleColor: color })}
                      label="Color del Título"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Subtítulo (Home)</Label>
                    <Textarea 
                      value={newsData.subtitle} 
                      onChange={(e) => updateSection(newsData.id, { subtitle: e.target.value })}
                    />
                    <GradientPicker
                      value={newsData.descriptionColor || '#4b5563'}
                      onChange={(color) => updateSection(newsData.id, { descriptionColor: color })}
                      label="Color del Subtítulo"
                    />
                  </div>

                  <div className="grid gap-2">
                   
                    <GradientPicker
                      value={newsData.headerBgColor || 'transparent'}
                      onChange={(color) => updateSection(newsData.id, { headerBgColor: color })}
                      label="Fondo del Encabezado"
                    />
                  </div>

                  <div className="grid gap-2">
                    
                    <GradientPicker
                      value={newsData.underlineColor || 'linear-gradient(to right, #e11d48, #9f1239)'}
                      onChange={(color) => updateSection(newsData.id, { underlineColor: color })}
                      label="Color del Subrayado"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Tipo de Fondo de Sección</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={newsData.backgroundType === 'media'}
                          onChange={() => updateSection(newsData.id, { backgroundType: 'media' })}
                        />
                        Imagen/Video
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={newsData.backgroundType === 'color'}
                          onChange={() => updateSection(newsData.id, { backgroundType: 'color' })}
                        />
                        Color/Gradiente
                      </label>
                    </div>
                  </div>

                  {newsData.backgroundType === 'media' ? (
                    <ImageUpload
                      label="Imagen/Video de Fondo"
                      value={newsData.videoUrl || ''}
                      onChange={(url) => updateSection(newsData.id, { videoUrl: url })}
                    />
                  ) : (
                    <GradientPicker
                      value={newsData.backgroundColor || '#ffffff'}
                      onChange={(color) => updateSection(newsData.id, { backgroundColor: color })}
                      label="Color de Fondo"
                    />
                  )}
                </div>
              )}

              {activeTab === 'page' && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Título de la Página (/news)</Label>
                    <Input 
                      value={newsData.newsPageTitle || newsData.title} 
                      onChange={(e) => updateSection(newsData.id, { newsPageTitle: e.target.value })}
                      placeholder="Ej: Nuestro Blog"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Subtítulo de la Página</Label>
                    <Textarea 
                      value={newsData.newsPageSubtitle || newsData.subtitle} 
                      onChange={(e) => updateSection(newsData.id, { newsPageSubtitle: e.target.value })}
                      placeholder="Ej: Explora nuestras últimas publicaciones..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'items' && (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button onClick={() => {
                      const newNews: NewsItem = {
                        id: Math.random().toString(36).substr(2, 9),
                        title: "Nueva Noticia",
                        excerpt: "Breve descripción...",
                        content: "Contenido completo...",
                        media: [],
                        date: new Date().toISOString(),
                        author: "Admin",
                        category: "General",
                        attachments: []
                      }
                      updateSection(newsData.id, { newsItems: [...newsData.newsItems, newNews] })
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Noticia
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    {newsData.newsItems.map((item, index) => (
                      <Card 
                        key={item.id} 
                        className={`relative border-2 transition-colors ${previewArticleId === item.id ? 'border-primary' : 'hover:border-primary/20'}`}
                        onClick={() => setPreviewArticleId(item.id)}
                      >
                        <div className="absolute top-2 right-2 z-10 flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            title="Previsualizar"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewArticleId(item.id);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newItems = newsData.newsItems.filter(i => i.id !== item.id);
                              updateSection(newsData.id, { newsItems: newItems });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4 grid gap-4">
                          <div className="space-y-2">
                            <Label>Galería Multimedia (Imágenes y Videos)</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                              {item.media?.map((media, mIndex) => (
                                <div key={mIndex} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                                  {media.type === 'video' ? (
                                    <video src={media.url} className="w-full h-full object-cover" />
                                  ) : (
                                    <img src={media.url} alt="" className="w-full h-full object-cover" />
                                  )}
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                      size="icon"
                                      variant={media.isMain ? "default" : "secondary"}
                                      className="h-8 w-8"
                                      title={media.isMain ? "Es Principal" : "Hacer Principal"}
                                      onClick={() => {
                                        const newMedia = item.media.map((m, i) => ({
                                          ...m,
                                          isMain: i === mIndex
                                        }));
                                        const newItems = [...newsData.newsItems];
                                        newItems[index] = { ...item, media: newMedia };
                                        updateSection(newsData.id, { newsItems: newItems });
                                      }}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="destructive"
                                      className="h-8 w-8"
                                      onClick={() => {
                                        const newMedia = item.media.filter((_, i) => i !== mIndex);
                                        // If we deleted the main one, make the first one main
                                        if (media.isMain && newMedia.length > 0) {
                                          newMedia[0].isMain = true;
                                        }
                                        const newItems = [...newsData.newsItems];
                                        newItems[index] = { ...item, media: newMedia };
                                        updateSection(newsData.id, { newsItems: newItems });
                                      }}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  {media.isMain && (
                                    <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
                                      Principal
                                    </div>
                                  )}
                                </div>
                              ))}
                              <div className="aspect-video bg-gray-50 border-2 border-dashed rounded-lg flex items-center justify-center">
                                <ImageUpload 
                                  label="Agregar"
                                  value=""
                                  onChange={(url) => {
                                    if (!url) return;
                                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                                    const newMediaItem: NewsMedia = {
                                      type: isVideo ? 'video' : 'image',
                                      url,
                                      isMain: item.media?.length === 0 // First one is main by default
                                    };
                                    const newMedia = [...(item.media || []), newMediaItem];
                                    const newItems = [...newsData.newsItems];
                                    newItems[index] = { ...item, media: newMedia };
                                    updateSection(newsData.id, { newsItems: newItems });
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Título</Label>
                              <Input 
                                value={item.title}
                                onChange={(e) => {
                                  const newItems = [...newsData.newsItems];
                                  newItems[index] = { ...item, title: e.target.value };
                                  updateSection(newsData.id, { newsItems: newItems });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Categoría</Label>
                              <Input 
                                value={item.category}
                                onChange={(e) => {
                                  const newItems = [...newsData.newsItems];
                                  newItems[index] = { ...item, category: e.target.value };
                                  updateSection(newsData.id, { newsItems: newItems });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Autor</Label>
                              <Input 
                                value={item.author}
                                onChange={(e) => {
                                  const newItems = [...newsData.newsItems];
                                  newItems[index] = { ...item, author: e.target.value };
                                  updateSection(newsData.id, { newsItems: newItems });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Fecha</Label>
                              <Input 
                                type="date"
                                value={item.date.split('T')[0]}
                                onChange={(e) => {
                                  const newItems = [...newsData.newsItems];
                                  newItems[index] = { ...item, date: new Date(e.target.value).toISOString() };
                                  updateSection(newsData.id, { newsItems: newItems });
                                }}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Extracto (Resumen)</Label>
                            <Textarea 
                              value={item.excerpt}
                              onChange={(e) => {
                                const newItems = [...newsData.newsItems];
                                newItems[index] = { ...item, excerpt: e.target.value };
                                updateSection(newsData.id, { newsItems: newItems });
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Contenido Completo</Label>
                            <Textarea 
                              className="min-h-[200px]"
                              value={item.content}
                              onChange={(e) => {
                                const newItems = [...newsData.newsItems];
                                newItems[index] = { ...item, content: e.target.value };
                                updateSection(newsData.id, { newsItems: newItems });
                              }}
                            />
                          </div>
                          <FileUpload
                            label="Archivos Adjuntos (PDF, Excel, Imágenes)"
                            attachments={item.attachments || []}
                            onChange={(attachments) => {
                              const newItems = [...newsData.newsItems];
                              newItems[index] = { ...item, attachments };
                              updateSection(newsData.id, { newsItems: newItems });
                            }}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )

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
              {section.type === 'posts' && <Monitor className="w-4 h-4" />}
              {section.type === 'news' && <FileText className="w-4 h-4" />}
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
                : 'w-full border rounded-xl overflow-hidden shadow-2xl bg-white h-[800px]'
            }`}>
              {previewDevice === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-50"></div>
              )}
              <div className={`h-full ${previewDevice === 'mobile' ? 'scrollbar-hide' : ''}`}>
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
