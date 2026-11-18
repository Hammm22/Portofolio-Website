"use client";

import { useEffect, useRef } from "react";

export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const starCount = Math.min(
      Math.max(Math.floor((width * height) / 8500), 95),
      195
    );
    const palette = ["#F8FAFC", "#CBD5E1", "#38BDF8", "#94A3B8"];

    const stars = Array.from({ length: starCount }, (_, i) => {
      const layer = i % 5 === 0 ? 3 : i % 2 === 0 ? 2 : 1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: layer === 3 ? 2.25 : layer === 2 ? 1.45 : 0.9,
        layer,
        parallaxFactor: layer === 3 ? 0.52 : layer === 2 ? 0.26 : 0.1,
        baseAlpha: layer === 3 ? 0.95 : layer === 2 ? 0.72 : 0.45,
        twinkleSpeed: 0.018 + Math.random() * 0.032,
        twinklePhase: Math.random() * Math.PI * 2,
        driftX: (Math.random() - 0.5) * 0.14 * layer,
        nudgeX: 0,
        nudgeY: 0,
        vx: 0,
        vy: 0,
        color:
          layer === 3 && i % 10 === 0
            ? "#38BDF8"
            : palette[i % palette.length]
      };
    });

    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];
    let lastScrollY = window.scrollY || 0;
    let scrollVelocity = 0;
    let shootingStar = null;
    let nextMeteorAt = performance.now() + 2200;
    let nebulaAngle = 0;
    let rafId = null;

    // Pre-render diagonal Milky Way nebula band + radial glow once to avoid per-frame allocations
    const bandSprite = document.createElement("canvas");
    bandSprite.width = 512;
    bandSprite.height = 256;
    const bandCtx = bandSprite.getContext("2d");
    if (bandCtx) {
      const bandGrad = bandCtx.createRadialGradient(256, 128, 12, 256, 128, 240);
      bandGrad.addColorStop(0, "rgba(56, 189, 248, 0.09)");
      bandGrad.addColorStop(0.42, "rgba(37, 99, 235, 0.075)");
      bandGrad.addColorStop(1, "rgba(6, 11, 25, 0)");
      bandCtx.fillStyle = bandGrad;
      bandCtx.fillRect(0, 0, 512, 256);
    }

    const nebulaSprite = document.createElement("canvas");
    nebulaSprite.width = 256;
    nebulaSprite.height = 256;
    const nebulaCtx = nebulaSprite.getContext("2d");
    if (nebulaCtx) {
      const grad = nebulaCtx.createRadialGradient(128, 128, 6, 128, 128, 128);
      grad.addColorStop(0, "rgba(37, 99, 235, 0.16)");
      grad.addColorStop(0.45, "rgba(56, 189, 248, 0.06)");
      grad.addColorStop(1, "rgba(6, 11, 25, 0)");
      nebulaCtx.fillStyle = grad;
      nebulaCtx.fillRect(0, 0, 256, 256);
    }

    const spawnShootingStar = (now) => {
      shootingStar = {
        x: Math.random() * (width * 0.75) + width * 0.08,
        y: Math.random() * (height * 0.42) + 15,
        vx: 9.5 + Math.random() * 4.5,
        vy: 4.2 + Math.random() * 2.5,
        length: 115 + Math.random() * 55,
        life: 0,
        maxLife: 46
      };
      nextMeteorAt = now + 3800 + Math.random() * 4500;
    };

    const drawFrame = (now) => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY || 0;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      scrollVelocity = scrollVelocity * 0.85 + deltaY * 0.18;
      const warpStretch = Math.min(Math.abs(scrollVelocity) * 0.85, 36);

      // Tilted Milky Way Galactic Band + Moving Deep-Space Nebula Glow
      nebulaAngle += 0.003;
      const bandOffsetY = Math.sin(nebulaAngle * 0.6) * 24 - currentScrollY * 0.025;
      ctx.save();
      ctx.translate(width * 0.52, height * 0.44 + bandOffsetY);
      ctx.rotate(-0.38);
      ctx.drawImage(
        bandSprite,
        -width * 0.78,
        -height * 0.34,
        width * 1.56,
        height * 0.68
      );
      ctx.restore();

      const nebX = width * 0.5 + Math.cos(nebulaAngle) * (width * 0.18);
      const nebY = height * 0.38 + Math.sin(nebulaAngle * 0.8) * (height * 0.12);
      const nebRadius = Math.max(width, height) * 0.55;
      ctx.drawImage(
        nebulaSprite,
        nebX - nebRadius,
        nebY - nebRadius,
        nebRadius * 2,
        nebRadius * 2
      );

      const renderedPositions = [];

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        if (!prefersReducedMotion) {
          star.x = ((star.x + star.driftX) % width + width) % width;
          star.vx *= 0.88;
          star.vy *= 0.88;
          star.nudgeX = (star.nudgeX + star.vx) * 0.92;
          star.nudgeY = (star.nudgeY + star.vy) * 0.92;
        }

        const starX = star.x + star.nudgeX;
        const wrappedY =
          ((((star.y - currentScrollY * star.parallaxFactor) % height) +
            height) %
            height) +
          star.nudgeY;
        const alpha = Math.max(
          0.2,
          Math.min(1, star.baseAlpha + Math.sin(star.twinklePhase) * 0.28)
        );

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.strokeStyle = star.color;

        if (warpStretch > 1.2 && !prefersReducedMotion) {
          ctx.lineWidth = star.radius * 1.35;
          ctx.beginPath();
          ctx.moveTo(starX, wrappedY);
          ctx.lineTo(
            starX,
            wrappedY +
              (scrollVelocity >= 0 ? warpStretch : -warpStretch) *
                star.parallaxFactor *
                2.8
          );
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(starX, wrappedY, star.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cross-flare & halo on bright foreground stars
        if (star.layer === 3 && alpha > 0.72 && warpStretch <= 1.5) {
          ctx.strokeStyle = "#38BDF8";
          ctx.globalAlpha = alpha * 0.55;
          ctx.lineWidth = 0.95;
          ctx.beginPath();
          ctx.moveTo(starX - 6.5, wrappedY);
          ctx.lineTo(starX + 6.5, wrappedY);
          ctx.moveTo(starX, wrappedY - 6.5);
          ctx.lineTo(starX, wrappedY + 6.5);
          ctx.stroke();
        }

        if (pointer.active && star.layer >= 2) {
          const dx = starX - pointer.x;
          const dy = wrappedY - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 195) {
            renderedPositions.push({ x: starX, y: wrappedY, dist });
          }
        }
      }
      ctx.globalAlpha = 1;

      // Vivid Constellation Network around Cursor
      if (
        pointer.active &&
        renderedPositions.length > 0 &&
        !prefersReducedMotion
      ) {
        ctx.save();
        for (let i = 0; i < renderedPositions.length; i += 1) {
          const a = renderedPositions[i];
          const cursorAlpha = (1 - a.dist / 195) * 0.52;
          ctx.strokeStyle = `rgba(56, 189, 248, ${cursorAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(a.x, a.y);
          ctx.stroke();

          // Highlight connected star node
          ctx.fillStyle = `rgba(56, 189, 248, ${(cursorAlpha * 0.9).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(a.x, a.y, 2.8, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < renderedPositions.length; j += 1) {
            const b = renderedPositions[j];
            const pairDist = Math.hypot(a.x - b.x, a.y - b.y);
            if (pairDist < 135) {
              const pairAlpha = (1 - pairDist / 135) * 0.36;
              ctx.strokeStyle = `rgba(37, 99, 235, ${pairAlpha.toFixed(3)})`;
              ctx.lineWidth = 0.95;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }

      // Shooting Star
      if (!prefersReducedMotion) {
        if (!shootingStar && now >= nextMeteorAt) {
          spawnShootingStar(now);
        }

        if (shootingStar) {
          shootingStar.x += shootingStar.vx;
          shootingStar.y += shootingStar.vy;
          shootingStar.life += 1;

          const progress = shootingStar.life / shootingStar.maxLife;
          const meteorAlpha = Math.sin(progress * Math.PI) * 0.92;
          const tailX =
            shootingStar.x - shootingStar.vx * (shootingStar.length / 8);
          const tailY =
            shootingStar.y - shootingStar.vy * (shootingStar.length / 8);

          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            tailX,
            tailY
          );
          grad.addColorStop(0, `rgba(248, 250, 252, ${meteorAlpha.toFixed(3)})`);
          grad.addColorStop(
            0.35,
            `rgba(56, 189, 248, ${(meteorAlpha * 0.78).toFixed(3)})`
          );
          grad.addColorStop(1, "rgba(6, 11, 25, 0)");

          ctx.save();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.1;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.fillStyle = `rgba(248, 250, 252, ${meteorAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (
            shootingStar.life >= shootingStar.maxLife ||
            shootingStar.x > width + 120 ||
            shootingStar.y > height + 120
          ) {
            shootingStar = null;
          }
        }
      }

      // Cosmic Radar Ripples on Empty-Space Click
      if (!prefersReducedMotion && ripples.length > 0) {
        ctx.save();
        for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx -= 1) {
          const ripple = ripples[rIdx];
          ripple.radius += 5.4;
          const progress = ripple.radius / ripple.maxRadius;

          if (progress >= 1) {
            ripples.splice(rIdx, 1);
            continue;
          }

          const fade = (1 - progress) * ripple.alpha;

          ctx.strokeStyle = `rgba(56, 189, 248, ${fade.toFixed(3)})`;
          ctx.lineWidth = 1.3;
          ctx.setLineDash([6, 10]);
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = `rgba(37, 99, 235, ${(fade * 0.72).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.58, 0, Math.PI * 2);
          ctx.stroke();

          if (progress < 0.35) {
            const crossAlpha = ((0.35 - progress) / 0.35) * 0.65;
            ctx.strokeStyle = `rgba(248, 250, 252, ${crossAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(ripple.x - 8, ripple.y);
            ctx.lineTo(ripple.x + 8, ripple.y);
            ctx.moveTo(ripple.x, ripple.y - 8);
            ctx.lineTo(ripple.x, ripple.y + 8);
            ctx.stroke();
          }
        }
        ctx.restore();
      }
    };

    if (prefersReducedMotion) {
      drawFrame(performance.now());
      const handleReducedResize = () => {
        setCanvasSize();
        drawFrame(performance.now());
      };
      window.addEventListener("resize", handleReducedResize);
      return () => {
        window.removeEventListener("resize", handleReducedResize);
      };
    }

    const tick = (now) => {
      if (!document.hidden) {
        drawFrame(now);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    const handlePointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") {
        pointer.active = false;
        return;
      }
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    const handlePointerDown = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") {
        pointer.active = false;
      }
      if (e.button && e.button !== 0) return;
      if (
        e.target instanceof Element &&
        e.target.closest(
          'a, button, input, select, textarea, label, [role="button"], [role="dialog"], [role="application"]'
        )
      ) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY;
      if (ripples.length >= 4) {
        ripples.shift();
      }
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 10,
        maxRadius: 210,
        alpha: 0.72
      });

      const currentY = window.scrollY || 0;
      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        const starY =
          (((star.y - currentY * star.parallaxFactor) % height) + height) %
          height;
        const dx = star.x - clickX;
        const dy = starY - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist > 4 && dist < 185) {
          const strength = (1 - dist / 185) * 3.4;
          star.vx += (dx / dist) * strength;
          star.vy += (dy / dist) * strength;
        }
      }
    };

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
