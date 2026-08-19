import { useMemo, useState } from "react";

import "./App.css";

import EEGChart from "./components/EEGChart";
import SleepStats from "./components/SleepStats";
import SleepTimeline from "./components/SleepTimeline";
import StageLegend from "./components/StageLegend";

import { generateEEG } from "./simulation/eegSimulator";
import { generateSleepNight } from "./simulation/sleepSimulator";

function App() {
  const [experiment, setExperiment] =
    useState(0);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const night = useMemo(
    () => generateSleepNight(),
    [experiment]
  );

  const selectedSegment =
    night.segments[selectedIndex];

  const eeg = useMemo(
    () =>
      generateEEG(
        selectedSegment,
        600
      ),
    [selectedSegment]
  );

  function runExperiment() {
    setSelectedIndex(0);

    setExperiment(
      (value) => value + 1
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <div className="brand">
            <span className="brain-icon">
              ◉
            </span>

            <span>NEUROSLEEP</span>
          </div>

          <h1>
            Explore the architecture
            <br />
            of human sleep.
          </h1>

          <p className="hero-description">
            An interactive computational model
            exploring sleep stages, sleep
            architecture, and synthetic EEG
            activity.
          </p>
        </div>

        <button
          className="experiment-button"
          onClick={runExperiment}
        >
          ▶ Run Experiment
        </button>
      </header>

      <main>
        <section className="intro">
          <div>
            <span className="eyebrow">
              EXPERIMENT #{experiment + 1}
            </span>

            <h2>
              Sleep Architecture
            </h2>

            <p>
              Generate a simulated night and
              explore how neural activity changes
              across sleep stages.
            </p>
          </div>

          <StageLegend />
        </section>

        <SleepStats night={night} />

        <SleepTimeline
          night={night}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />

        <EEGChart signal={eeg} />

        <section className="science-grid">
          <article className="science-card">
            <span className="science-number">
              01
            </span>

            <h3>
              Sleep Architecture
            </h3>

            <p>
              The simulation models transitions
              between wakefulness, N1, N2, N3,
              and REM sleep across multiple
              cycles.
            </p>
          </article>

          <article className="science-card">
            <span className="science-number">
              02
            </span>

            <h3>
              Neural Oscillations
            </h3>

            <p>
              Each sleep stage is represented
              using different synthetic signal
              characteristics inspired by
              stage-dependent EEG activity.
            </p>
          </article>

          <article className="science-card">
            <span className="science-number">
              03
            </span>

            <h3>
              Computational Model
            </h3>

            <p>
              The architecture separates the
              simulation engine from the React
              interface, allowing the model to
              evolve independently.
            </p>
          </article>
        </section>

        <section className="disclaimer">
          <strong>
            Research & simulation project
          </strong>

          <p>
            NeuroSleep uses synthetic data and
            simplified computational models for
            educational and visualization
            purposes. It is not a medical device
            and does not provide medical
            diagnoses.
          </p>
        </section>
      </main>

      <footer>
        <span>NEUROSLEEP</span>

        <span>
          Computational Neuroscience ×
          Software Engineering
        </span>
      </footer>
    </div>
  );
}

export default App;