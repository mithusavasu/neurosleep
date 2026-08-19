import type { EEGSignal } from "../types/sleep";

interface EEGChartProps {
  signal: EEGSignal;
}

function EEGChart({
  signal,
}: EEGChartProps) {
  const width = 900;
  const height = 260;

  const amplitudes =
    signal.points.map(
      (point) => point.amplitude
    );

  const maxAmplitude =
    Math.max(
      ...amplitudes.map(Math.abs),
      1
    );

  const points = signal.points
    .map((point, index) => {
      const x =
        (index /
          (signal.points.length - 1)) *
        width;

      const y =
        height / 2 -
        (point.amplitude /
          maxAmplitude) *
          (height * 0.4);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <h2>Simulated EEG</h2>

          <p>
            Synthetic neural signal for{" "}
            <strong>
              {signal.stage}
            </strong>{" "}
            sleep.
          </p>
        </div>

        <span className="signal-badge">
          Synthetic Signal
        </span>
      </div>

      <div className="eeg-container">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1={height / 2}
            x2={width}
            y2={height / 2}
            className="eeg-baseline"
          />

          <polyline
            points={points}
            className="eeg-line"
          />
        </svg>
      </div>

      <div className="eeg-labels">
        <span>
          {signal.stage} activity
        </span>

        <span>
          Relative amplitude
        </span>
      </div>
    </section>
  );
}

export default EEGChart;