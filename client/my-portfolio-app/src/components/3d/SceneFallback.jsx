import "../../styles/scene-fallback.css";

/**
 * CSS/SVG stand-in for the 3D system object, used when WebGL is
 * unavailable, the device is low-powered, or reduced motion is
 * requested. Represents the same concept (a UI node connected to
 * React / API / Database) so the visual language stays consistent.
 */
function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <div className="fallback-glow" />

      <svg className="fallback-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="16" x2="19" y2="81" />
        <line x1="50" y1="16" x2="50" y2="88" />
        <line x1="50" y1="16" x2="81" y2="81" />
      </svg>

      <div className="fallback-node fallback-node-ui">UI</div>
      <div className="fallback-node fallback-node-react">React</div>
      <div className="fallback-node fallback-node-api">API</div>
      <div className="fallback-node fallback-node-db">Database</div>
    </div>
  );
}

export default SceneFallback;
