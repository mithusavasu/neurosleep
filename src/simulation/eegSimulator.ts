import type {
  EEGSignal,
  SleepSegment,
  SleepStage,
} from "../types/sleep";

function randomGaussian(): number {
  let u = 0;
  let v = 0;

  while (u === 0) {
    u = Math.random();
  }

  while (v === 0) {
    v = Math.random();
  }

  return Math.sqrt(-2 * Math.log(u)) *
    Math.cos(2 * Math.PI * v);
}

function getStageCharacteristics(stage: SleepStage) {
  switch (stage) {
    case "AWAKE":
      return {
        frequency: 12,
        amplitude: 0.4,
        noise: 0.25,
      };

    case "N1":
      return {
        frequency: 6,
        amplitude: 0.7,
        noise: 0.2,
      };

    case "N2":
      return {
        frequency: 4,
        amplitude: 1.0,
        noise: 0.18,
      };

    case "N3":
      return {
        frequency: 1.5,
        amplitude: 2.0,
        noise: 0.12,
      };

    case "REM":
      return {
        frequency: 8,
        amplitude: 0.55,
        noise: 0.3,
      };
  }
}

export function generateEEG(
  segment: SleepSegment,
  sampleCount = 500
): EEGSignal {
  const characteristics =
    getStageCharacteristics(segment.stage);

  const points = [];

  for (let i = 0; i < sampleCount; i++) {
    const progress =
      i / (sampleCount - 1);

    const time =
      segment.startMinute +
      progress * segment.durationMinutes;

    const signal =
      Math.sin(
        2 *
          Math.PI *
          characteristics.frequency *
          progress *
          4
      ) *
      characteristics.amplitude;

    const noise =
      randomGaussian() *
      characteristics.noise;

    points.push({
      time,
      amplitude: signal + noise,
    });
  }

  return {
    stage: segment.stage,
    points,
  };
}