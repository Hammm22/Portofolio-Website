"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroObservatory3D({ heroRef }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
    camera.position.set(0, 0, 8.2);

    // Lighting tailored to Deep Observatory (#060B19 / #2563EB / #38BDF8)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    keyLight.position.set(4, 5, 5);
    const fillLight = new THREE.PointLight(0x2563eb, 5.2, 16);
    fillLight.position.set(-4.5, -2.5, 4);
    const rimLight = new THREE.PointLight(0xf8fafc, 1.5, 14);
    rimLight.position.set(0, 3.5, 4.5);
    scene.add(ambientLight, keyLight, fillLight, rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Core faceted dark crystal polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(1.06, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.45,
      metalness: 0.78,
      roughness: 0.22,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Inner counter-rotating cyan wireframe octahedron
    const innerGeo = new THREE.OctahedronGeometry(0.68, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // Outer geometric cage edges
    const cageSourceGeo = new THREE.IcosahedronGeometry(1.44, 1);
    const cageGeo = new THREE.EdgesGeometry(cageSourceGeo);
    cageSourceGeo.dispose();
    const cageMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65
    });
    const cageLines = new THREE.LineSegments(cageGeo, cageMat);
    rootGroup.add(cageLines);

    // Three tilted gyroscope rings + mounted orbital node spheres
    const ring1Group = new THREE.Group();
    ring1Group.rotation.set(0.45, 0.2, 0.1);
    const ring1Geo = new THREE.TorusGeometry(1.94, 0.015, 12, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.75,
      metalness: 0.4,
      roughness: 0.25
    });
    ring1Group.add(new THREE.Mesh(ring1Geo, ring1Mat));

    const nodeGeo = new THREE.SphereGeometry(0.058, 16, 16);
    const cyanNodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const whiteNodeMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

    const r1NodeA = new THREE.Mesh(nodeGeo, whiteNodeMat);
    r1NodeA.position.set(1.94, 0, 0);
    const r1NodeB = new THREE.Mesh(nodeGeo, cyanNodeMat);
    r1NodeB.position.set(-1.94, 0, 0);
    ring1Group.add(r1NodeA, r1NodeB);
    rootGroup.add(ring1Group);

    const ring2Group = new THREE.Group();
    ring2Group.rotation.set(-0.92, 0.52, -0.3);
    const ring2Geo = new THREE.TorusGeometry(2.3, 0.013, 12, 110);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 0.65,
      metalness: 0.5,
      roughness: 0.3
    });
    ring2Group.add(new THREE.Mesh(ring2Geo, ring2Mat));

    const r2NodeA = new THREE.Mesh(nodeGeo, cyanNodeMat);
    r2NodeA.position.set(0, 2.3, 0);
    const r2NodeB = new THREE.Mesh(nodeGeo, cyanNodeMat);
    r2NodeB.position.set(0, -2.3, 0);
    ring2Group.add(r2NodeA, r2NodeB);
    rootGroup.add(ring2Group);

    const ring3Group = new THREE.Group();
    ring3Group.rotation.set(0.28, -0.65, 0.85);
    const ring3Geo = new THREE.TorusGeometry(2.66, 0.009, 10, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.45
    });
    ring3Group.add(new THREE.Mesh(ring3Geo, ring3Mat));
    rootGroup.add(ring3Group);

    // Orbital starlight dust particles around the gyroscope
    const particleCount = 88;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.042,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    const syncSize = () => {
      const width = container.clientWidth || 460;
      const height = container.clientHeight || 460;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);

    // Interactive state: hover tilt + click-drag orbit + GSAP ScrollTrigger scrub
    let hoverX = 0;
    let hoverY = 0;
    let dragRotX = 0;
    let dragRotY = 0;
    let velX = 0;
    let velY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    let scrollTarget = 0;
    let scrollDamped = 0;
    let isVisible = true;
    let rafId = null;

    const scrollTrigger = heroRef?.current
      ? ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            scrollTarget = self.progress;
          }
        })
      : null;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const handlePointerDown = (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        hoverX = (e.clientX - rect.left) / rect.width - 0.5;
        hoverY = (e.clientY - rect.top) / rect.height - 0.5;
      }
      if (!isDragging) return;
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velY = dx * 0.0085;
      velX = dy * 0.0085;
      dragRotY += velY;
      dragRotX = Math.max(-0.95, Math.min(0.95, dragRotX + velX));
    };

    const handlePointerUp = (e) => {
      isDragging = false;
      if (canvas.hasPointerCapture?.(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    };

    const handlePointerLeave = () => {
      hoverX = 0;
      hoverY = 0;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    gsap.fromTo(
      canvas,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform" }
    );

    const startTime = performance.now();

    const renderFrame = (now) => {
      rafId = window.requestAnimationFrame(renderFrame);
      if (document.hidden || !isVisible) return;

      const t = (now - startTime) * 0.001;
      scrollDamped += (scrollTarget - scrollDamped) * 0.08;

      if (!isDragging) {
        dragRotY += velY;
        dragRotX = Math.max(-0.95, Math.min(0.95, dragRotX + velX));
        velX *= 0.93;
        velY *= 0.93;
      }

      // Smooth ambient + hover + drag + scroll motion
      const targetGroupX = dragRotX + hoverY * 0.35 + scrollDamped * 0.45;
      const targetGroupY = dragRotY + hoverX * 0.45 + t * 0.22 + scrollDamped * 1.1;

      rootGroup.rotation.x += (targetGroupX - rootGroup.rotation.x) * 0.08;
      rootGroup.rotation.y += (targetGroupY - rootGroup.rotation.y) * 0.08;
      rootGroup.position.y = Math.sin(t * 1.3) * 0.1 + scrollDamped * 0.5;

      coreMesh.rotation.y = t * 0.35;
      coreMesh.rotation.z = t * 0.18;
      innerMesh.rotation.y = -t * 0.65;
      innerMesh.rotation.x = t * 0.42;
      cageLines.rotation.y = -t * 0.14;

      ring1Group.rotation.z = 0.1 + t * 0.38;
      ring1Group.scale.setScalar(1 + scrollDamped * 0.15);

      ring2Group.rotation.y = 0.52 - t * 0.28;
      ring2Group.scale.setScalar(1 + scrollDamped * 0.22);

      ring3Group.rotation.x = 0.28 + t * 0.2;
      ring3Group.scale.setScalar(1 + scrollDamped * 0.28);

      particles.rotation.y = -t * 0.09;

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      scrollTrigger?.kill();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [heroRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative flex h-[440px] w-full items-center justify-center select-none xl:h-[500px]"
    >
      {/* Subtle geometric anchor ring under WebGL canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[310px] w-[310px] rounded-full border border-[#1E293B]/80 xl:h-[360px] xl:w-[360px]"
      />

      <canvas
        ref={canvasRef}
        className="relative z-10 h-full w-full cursor-grab opacity-0 active:cursor-grabbing"
      />

      <p className="pointer-events-none absolute right-2 bottom-2 z-20 rounded-full border border-[#1E293B] bg-[#0F172A]/85 px-3 py-1 font-mono text-[11px] text-[#94A3B8] backdrop-blur-sm">
        3D Observatorium · Tarik untuk memutar
      </p>
    </div>
  );
}
