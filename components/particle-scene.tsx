'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLoopingMotion } from './marquees';

/** Optional decorative enhancement. The hero remains complete without WebGL. */
export function ParticleScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { paused } = useLoopingMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced !== false || paused) return;
    let disposed = false;
    let disposeScene: (() => void) | undefined;

    async function setup() {
      const THREE = await import('three');
      if (disposed || !host) return;
      // A missing WebGL context is an expected fallback, not an application error.
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
      if (!context) return;
      const cleanups: Array<() => void> = [];
      const dispose = () => { while (cleanups.length) cleanups.pop()?.(); };
      try {
        const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: false, powerPreference: 'low-power' });
        cleanups.push(() => { renderer.dispose(); canvas.remove(); });
        renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
        host.appendChild(canvas);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 10);
        camera.position.z = 2;
        const geometry = new THREE.BufferGeometry();
        cleanups.push(() => geometry.dispose());
        const positions = new Float32Array(48 * 3);
        for (let i = 0; i < 48; i++) {
          positions[i * 3] = ((i * .61803398875) % 1) * 2 - 1;
          positions[i * 3 + 1] = ((i * .754877666) % 1) * 2 - 1;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: 0x5c4ade, size: 3, sizeAttenuation: false, transparent: true, opacity: .45 });
        cleanups.push(() => material.dispose());
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        let frame = 0, visible = true, running = false, contextLost = false;
        const canRun = () => visible && !document.hidden && !contextLost;
        const draw = (time: number) => {
          if (!canRun()) { running = false; return; }
          particles.rotation.z = Math.sin(time * .00012) * .035;
          renderer.render(scene, camera);
          frame = requestAnimationFrame(draw);
        };
        const refresh = () => {
          if (canRun() && !running) { running = true; frame = requestAnimationFrame(draw); }
          else if (!canRun() && running) { cancelAnimationFrame(frame); running = false; }
        };
        const onContextLost = (event: Event) => { event.preventDefault(); contextLost = true; refresh(); };
        const onContextRestored = () => { contextLost = false; refresh(); };
        canvas.addEventListener('webglcontextlost', onContextLost);
        canvas.addEventListener('webglcontextrestored', onContextRestored);
        document.addEventListener('visibilitychange', refresh);
        cleanups.push(() => { cancelAnimationFrame(frame); canvas.removeEventListener('webglcontextlost', onContextLost); canvas.removeEventListener('webglcontextrestored', onContextRestored); document.removeEventListener('visibilitychange', refresh); });
        const resize = () => renderer.setSize(host.clientWidth, host.clientHeight, false);
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host); cleanups.push(() => resizeObserver.disconnect());
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); });
        observer.observe(host); cleanups.push(() => observer.disconnect());
        resize(); refresh();
        disposeScene = dispose;
      } catch (error) {
        dispose();
        if (process.env.NODE_ENV !== 'production') console.error('Could not initialize decorative particle scene:', error);
      }
    }
    setup().catch(error => { if (process.env.NODE_ENV !== 'production') console.error('Could not load decorative particle scene:', error); });
    return () => { disposed = true; disposeScene?.(); };
  }, [reduced, paused]);

  return <motion.div ref={hostRef} className="three-motion-layer" aria-hidden="true" initial={false} animate={{ opacity: reduced ? 0 : 1 }} />;
}
