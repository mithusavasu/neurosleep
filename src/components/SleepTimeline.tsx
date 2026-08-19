import type { SleepNight } from "../types/sleep";

interface SleepTimelineProps {
  night: SleepNight;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

function SleepTimeline({
  night,
  selectedIndex,
  onSelect,
}: SleepTimelineProps) {
  return (
    <section className="panel">
      <div className="section-header">
        <div>
          <h2>Sleep Architecture</h2>
          <p>
            Select a sleep stage to inspect its
            simulated EEG signal.
          </p>
        </div>
      </div>

      <div className="timeline">
        {night.segments.map(
          (segment, index) => (
            <button
              key={index}
              className={`sleep-segment ${segment.stage.toLowerCase()} ${
                selectedIndex === index
                  ? "selected"
                  : ""
              }`}
              style={{
                width: `${Math.max(
                  30,
                  segment.durationMinutes * 2
                )}px`,
              }}
              onClick={() => onSelect(index)}
              title={`${segment.stage} — ${segment.durationMinutes} minutes`}
            >
              <span>
                {segment.stage}
              </span>
            </button>
          )
        )}
      </div>

      <div className="time-axis">
        <span>0 min</span>
        <span>
          {night.totalDurationMinutes} min
        </span>
      </div>
    </section>
  );
}

export default SleepTimeline;