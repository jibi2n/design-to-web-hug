import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

type Project = {
  tag: string;
  title: string;
  location: string;
  category: string;
  images: string[];
};

const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 1.01,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.99,
  }),
};

export function ProjectCard({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const directionRef = useRef(1);
  const imageCount = project.images.length;

  const cycleImage = (direction: number) => {
    directionRef.current = direction;
    setActiveIndex((current) => (current + direction + imageCount) % imageCount);
  };

  return (
    <motion.div
      className="card-surface overflow-hidden group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${project.title}-${activeIndex}`}
            src={project.images[activeIndex]}
            alt={project.title}
            loading="lazy"
            custom={directionRef.current}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full aspect-[4/3] object-cover"
          />
        </AnimatePresence>

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-brand text-primary-foreground">
          {project.tag}
        </span>

        {imageCount > 1 ? (
          <>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <motion.button
                type="button"
                onClick={() => cycleImage(-1)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-md bg-black/60 border border-white/10 text-white shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 hover:shadow-[0_0_28px_rgba(255,255,255,0.18)] hover:bg-slate-950/80 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <motion.button
                type="button"
                onClick={() => cycleImage(1)}
                className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-md bg-black/60 border border-white/10 text-white shadow-[0_0_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 hover:shadow-[0_0_28px_rgba(255,255,255,0.18)] hover:bg-slate-950/80 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </>
        ) : null}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" /> {project.location}
        </div>
      </div>
    </motion.div>
  );
}
