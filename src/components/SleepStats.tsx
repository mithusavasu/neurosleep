import type {
  SleepNight,
  SleepStats,
} from "../types/sleep";

interface SleepStatsProps {
  night: SleepNight;
}

function calculateStats(
  night: SleepNight
): SleepStats {
  let awakeMinutes = 0;
  let n1Minutes = 0;
  let n2Minutes = 0;
  let n3Minutes = 0;
  let remMinutes = 0;

  for (const segment of night.segments) {
    switch (segment.stage) {
      case "AWAKE":
        awakeMinutes +=
          segment.durationMinutes;
        break;

      case "N1":
        n1Minutes +=
          segment.durationMinutes;
        break;

      case "N2":
        n2Minutes +=
          segment.durationMinutes;
        break;

      case "N3":
        n3Minutes +=
          segment.durationMinutes;
        break;

      case "REM":
        remMinutes +=
          segment.durationMinutes;
        break;
    }
  }

  const totalSleepMinutes =
    n1Minutes +
    n2Minutes +
    n3Minutes +
    remMinutes;

  const sleepEfficiency =
    night.totalDurationMinutes > 0
      ? (totalSleepMinutes /
          night.totalDurationMinutes) *
        100
      : 0;

  const cycleCount =
    night.segments.filter(
      (segment) => segment.stage === "REM"
    ).length;

  return {
    totalSleepMinutes,
    sleepEfficiency,
    awakeMinutes,
    n1Minutes,
    n2Minutes,
    n3Minutes,
    remMinutes,
    cycleCount,
  };
}

function SleepStats({
  night,
}: SleepStatsProps) {
  const stats = calculateStats(night);

  const cards = [
    {
      label: "Total Sleep",
      value: `${Math.round(
        stats.totalSleepMinutes
      )} min`,
    },
    {
      label: "Sleep Efficiency",
      value: `${stats.sleepEfficiency.toFixed(
        1
      )}%`,
    },
    {
      label: "Deep Sleep",
      value: `${Math.round(
        stats.n3Minutes
      )} min`,
    },
    {
      label: "REM",
      value: `${Math.round(
        stats.remMinutes
      )} min`,
    },
    {
      label: "N2",
      value: `${Math.round(
        stats.n2Minutes
      )} min`,
    },
    {
      label: "Cycles",
      value: stats.cycleCount,
    },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <div
          className="stat-card"
          key={card.label}
        >
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </div>
      ))}
    </section>
  );
}

export default SleepStats;