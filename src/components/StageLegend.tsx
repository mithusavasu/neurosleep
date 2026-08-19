function StageLegend() {
  const stages = [
    ["AWAKE", "awake"],
    ["N1", "n1"],
    ["N2", "n2"],
    ["N3", "n3"],
    ["REM", "rem"],
  ];

  return (
    <div className="legend">
      {stages.map(([name, className]) => (
        <div
          className="legend-item"
          key={name}
        >
          <span
            className={`legend-dot ${className}`}
          />
          {name}
        </div>
      ))}
    </div>
  );
}

export default StageLegend;