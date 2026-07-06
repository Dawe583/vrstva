import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * 3D tilt + spotlight sledující kurzor. Fyzika běží přes motion values
 * (mimo React render) => plynulé i na mobilu. Na dotyku se tilt neaktivuje,
 * ale reveal/hover-lift zůstává.
 */
export default function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });

  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(340px circle at ${x * 100}% ${y * 100}%, rgb(232 86 42 / 0.16), transparent 70%)`
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group/tilt relative [transform-style:preserve-3d] ${className ?? ""}`}
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
      />
      {children}
    </motion.div>
  );
}
