export type SleepStage =
  | "AWAKE"
  | "N1"
  | "N2"
  | "N3"
  | "REM";

export interface SleepSegment {
  stage: SleepStage;
  startMinute: number;
  durationMinutes: number;
}

export interface SleepNight {
  totalDurationMinutes: number;
  segments: SleepSegment[];
}

export interface SleepStats {
  totalSleepMinutes: number;
  sleepEfficiency: number;
  awakeMinutes: number;
  n1Minutes: number;
  n2Minutes: number;
  n3Minutes: number;
  remMinutes: number;
  cycleCount: number;
}

export interface EEGPoint {
  time: number;
  amplitude: number;
}

export interface EEGSignal {
  stage: SleepStage;
  points: EEGPoint[];
}