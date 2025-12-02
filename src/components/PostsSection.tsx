import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue, animate } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { PostsSectionContent } from "@/types/cms"
import { getTextStyle } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Linkedin, ExternalLink } from "lucide-react"

export const PostsSection = () => {
  const { content } = useCMS();
  const postsData = content.sections.find(s => s.id === 'posts') as PostsSectionContent;
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [postsData?.posts, isMobile]);

  const shouldEnableCarousel = isMobile || postsData.posts.length > 4;

  useEffect(() => {
    if (!shouldEnableCarousel || width === 0) return;

    const duration = 20; // Seconds for full scroll
    
    // Create infinite scroll animation
    const startAnimation = () => {
      // If we are at the end, reset to 0
      if (x.get() <= -width) {
        x.set(0);
      }

      controls.start({
        x: -width,
        transition: {
          duration: duration * (1 - Math.abs(x.get()) / width),
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0
        }
      });
    };

    if (!isHovered) {
      startAnimation();
    } else {
      controls.stop();
    }

    return () => controls.stop();
  }, [width, isHovered, shouldEnableCarousel, x, controls]);

  if (!postsData || !postsData.isVisible) return null;

  return (
    <section id="posts" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        {postsData.backgroundType === 'color' ? (
          <div 
            className="w-full h-full"
            style={{ background: postsData.backgroundColor || 'transparent' }}
          />
        ) : (
          <>
            {postsData.videoUrl && !postsData.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <img 
                src={postsData.videoUrl} 
                alt="Posts Background" 
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                {postsData.videoUrl && <source src={postsData.videoUrl} type="video/mp4" />}
              </video>
            )}
            <div className="absolute inset-0 bg-white/90 -z-10"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block w-full mb-4 px-6 py-2 shadow-lg backdrop-blur-sm rounded-xl"
            style={{ background: postsData.headerBgColor || 'linear-gradient(to right, #f8fafc, #e2e8f0)' }}
          >
            <h2 
              className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
              style={getTextStyle(postsData.titleColor || '#1f2937')}
            >
              {postsData.title}
            </h2>
            <p 
              className="text-lg md:text-xl font-medium"
              style={getTextStyle(postsData.subtitleColor || '#64748b')}
            >
              {postsData.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Posts Display */}
        {shouldEnableCarousel ? (
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <motion.div 
              ref={carouselRef} 
              className="cursor-grab overflow-hidden"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div 
                drag="x" 
                dragConstraints={{ right: 0, left: -width }}
                style={{ x }}
                animate={controls}
                onDragStart={() => setIsHovered(true)}
                onDragEnd={() => setIsHovered(false)}
                className="flex gap-6"
              >
                {postsData.posts.map((post) => (
                  <motion.div 
                    key={post.id} 
                    className="min-w-[300px] md:min-w-[350px]"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt="Post cover" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          draggable="false"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm backdrop-blur-sm">
                          {post.platform === 'instagram' ? (
                            <Instagram className="w-5 h-5 text-pink-600" />
                          ) : (
                            <Linkedin className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col h-[calc(100%-16rem)]">
                        <p className="text-gray-600 mb-6 flex-grow line-clamp-4">
                          {post.description}
                        </p>
                        <a 
                          href={post.postUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors mt-auto"
                        >
                          Ver publicación <ExternalLink className="w-4 h-4" />
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
              Desliza para ver más
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {postsData.posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt="Post cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm backdrop-blur-sm">
                      {post.platform === 'instagram' ? (
                        <Instagram className="w-5 h-5 text-pink-600" />
                      ) : (
                        <Linkedin className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col h-[calc(100%-16rem)]">
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-4">
                      {post.description}
                    </p>
                    <a 
                      href={post.postUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors mt-auto"
                    >
                      Ver publicación <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
