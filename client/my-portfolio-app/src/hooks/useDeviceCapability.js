import { useEffect, useState } from "react";

function detectWebglSupport() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Returns "full" | "reduced" | "off" so the hero scene can scale
 * detail/interaction to what the device can actually handle.
 */
export function useDeviceCapability(prefersReducedMotion) {
  const [capability, setCapability] = useState("full");

  useEffect(() => {
    function evaluate() {
      if (prefersReducedMotion || !detectWebglSupport()) {
        setCapability("off");
        return;
      }

      const width = window.innerWidth;
      const lowCores =
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 2;

      if (width < 640 || lowCores) {
        setCapability("off");
      } else if (width < 1024) {
        setCapability("reduced");
      } else {
        setCapability("full");
      }
    }

    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, [prefersReducedMotion]);

  return capability;
}
