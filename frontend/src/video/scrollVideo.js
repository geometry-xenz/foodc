// GSAP ScrollTrigger Scroll-Driven Video Scrub Controller for foodoscope.mp4
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollVideo(videoElement, containerElement) {
  if (!videoElement || !containerElement) return null;

  // Set necessary video playback attributes
  videoElement.muted = true;
  videoElement.playsInline = true;
  videoElement.setAttribute('muted', '');
  videoElement.setAttribute('playsinline', '');
  videoElement.preload = 'auto';

  let duration = 10; // Default fallback duration
  let isReady = false;
  let targetTime = 0;
  let animFrameId = null;

  const onLoadedMetadata = () => {
    if (videoElement.duration && !isNaN(videoElement.duration)) {
      duration = videoElement.duration;
    }
    isReady = true;
    setupScrollTrigger();
  };

  if (videoElement.readyState >= 1) {
    onLoadedMetadata();
  } else {
    videoElement.addEventListener('loadedmetadata', onLoadedMetadata);
  }

  // Smooth lerp loop for jitter-free scrubbing across all browsers
  const smoothRender = () => {
    if (isReady && !isNaN(targetTime)) {
      // Gentle smoothing factor
      const diff = targetTime - videoElement.currentTime;
      if (Math.abs(diff) > 0.03) {
        videoElement.currentTime += diff * 0.18;
      }
    }
    animFrameId = requestAnimationFrame(smoothRender);
  };
  animFrameId = requestAnimationFrame(smoothRender);

  function setupScrollTrigger() {
    // Respect user's reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      videoElement.currentTime = 1.0;
      return;
    }

    ScrollTrigger.create({
      trigger: containerElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.0,
      onUpdate: (self) => {
        // Map scroll progress (0 to 1) directly to video duration
        targetTime = self.progress * duration;
      }
    });
  }

  // Fallback if video stalls or encounters error
  videoElement.addEventListener('error', (e) => {
    console.warn('Video playback notice, displaying atmospheric fallback.', e);
  });

  return {
    destroy: () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  };
}
