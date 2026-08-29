import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue } from "framer-motion"
import { useCMS } from "@/context/CMSContext"
import { PostsSectionContent } from "@/types/cms"
import { Instagram, Linkedin, ExternalLink } from "lucide-react"

export const PostsSection = () => {
  const { content } = useCMS()
  const postsData = content.sections.find(s => s.id === 'posts') as PostsSectionContent
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [postsData?.posts, isMobile])

  const shouldEnableCarousel = isMobile || (postsData?.posts?.length ?? 0) > 4

  useEffect(() => {
    if (!shouldEnableCarousel || width === 0) return

    const duration = 20

    const startAnimation = () => {
      if (x.get() <= -width) {
        x.set(0)
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
      })
    }

    if (!isHovered) {
      startAnimation()
    } else {
      controls.stop()
    }

    return () => controls.stop()
  }, [width, isHovered, shouldEnableCarousel, x, controls])

  if (!postsData || !postsData.isVisible) return null

  const PostCard = ({ post }: { post: PostsSectionContent['posts'][0] }) => (
    <div className="h-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-soft border border-surface-variant group hover:shadow-ethereal transition-all duration-300 flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img
          src={post.imageUrl}
          alt="Post cover"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          draggable="false"
        />
        <div className="absolute top-4 right-4 bg-surface p-2 rounded-full shadow-soft">
          {post.platform === 'instagram' ? (
            <Instagram className="w-4 h-4 text-primary" />
          ) : (
            <Linkedin className="w-4 h-4 text-primary" />
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="font-body text-body-md text-on-surface-variant mb-6 flex-grow line-clamp-4">
          {post.description}
        </p>
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary font-label-md hover:text-primary-container transition-colors mt-auto"
        >
          Ver publicación <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )

  return (
    <section id="posts" className="py-16 md:py-24 lg:py-section-gap px-margin-mobile lg:px-margin-desktop relative overflow-hidden bg-surface-container-low">
      <div className="max-w-container-max mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-headline-lg-mobile md:text-headline-lg text-on-surface mb-3">
              {postsData.title}
            </h2>
            <p className="font-body text-body-lg text-on-surface-variant">
              {postsData.subtitle}
            </p>
          </motion.div>
        </div>

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
                    className="min-w-[280px] md:min-w-[340px]"
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <div className="text-center mt-4 text-sm text-on-surface-variant md:hidden font-body">
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
                transition={{ delay: index * 0.08 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
