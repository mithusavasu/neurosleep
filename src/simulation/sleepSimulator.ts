import type {
  SleepNight,
  SleepSegment,
  SleepStage,
} from "../types/sleep";

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.round(randomBetween(min, max));
}

function createSegment(
  stage: SleepStage,
  startMinute: number,
  durationMinutes: number
): SleepSegment {
  return {
    stage,
    startMinute,
    durationMinutes,
  };
}

export function generateSleepNight(): SleepNight {
  const segments: SleepSegment[] = [];

  let currentMinute = 0;

  // Sleep onset
  const initialAwake = randomInt(5, 20);

  segments.push(
    createSegment("AWAKE", currentMinute, initialAwake)
  );

  currentMinute += initialAwake;

  /*
   * Early sleep cycles contain more deep sleep.
   * Later cycles contain progressively more REM.
   */
  const cycleCount = randomInt(4, 5);

  for (let cycle = 0; cycle < cycleCount; cycle++) {
    const n1Duration = randomInt(3, 8);

    const n2Duration = randomInt(
      20,
      40 + cycle * 5
    );

    const n3Base = Math.max(
      5,
      35 - cycle * 9
    );

    const n3Duration =
      cycle === cycleCount - 1
        ? randomInt(0, 8)
        : randomInt(
            Math.max(5, n3Base - 5),
            n3Base + 5
          );

    const remDuration = randomInt(
      8 + cycle * 4,
      15 + cycle * 6
    );

    segments.push(
      createSegment(
        "N1",
        currentMinute,
        n1Duration
      )
    );

    currentMinute += n1Duration;

    segments.push(
      createSegment(
        "N2",
        currentMinute,
        n2Duration
      )
    );

    currentMinute += n2Duration;

    if (n3Duration > 0) {
      segments.push(
        createSegment(
          "N3",
          currentMinute,
          n3Duration
        )
      );

      currentMinute += n3Duration;
    }

    segments.push(
      createSegment(
        "REM",
        currentMinute,
        remDuration
      )
    );

    currentMinute += remDuration;

    /*
     * Occasional brief awakening between cycles.
     */
    if (
      cycle < cycleCount - 1 &&
      Math.random() < 0.35
    ) {
      const awakening = randomInt(1, 4);

      segments.push(
        createSegment(
          "AWAKE",
          currentMinute,
          awakening
        )
      );

      currentMinute += awakening;
    }
  }

  return {
    totalDurationMinutes: currentMinute,
    segments,
  };
}