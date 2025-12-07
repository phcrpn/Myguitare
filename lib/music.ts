// lib/music.ts

// Notes chromatiques (en notation anglo-saxonne + équivalents #/b)
export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Accordage standard guitare corde 6 → 1)
export const STANDARD_TUNING = ["E", "B", "G", "D", "A", "E"];

// Intervalles des gammes (en demi-tons)
export const SCALES: Record<string, number[]> = {
  "Tonique" : [],
  "Accord majeure": [4, 3],
  "Accord mineure": [3, 4], 
  "Accord majeure 7": [4, 3, 4],
  "Accord mineure 7": [3, 4, 4],
  "pentatonique majeure": [2,2, 3,2],
  "pentatonique mineure": [3,2,2,3]
};

// --------------------
// Fonctions musicales
// --------------------
export function noteIndex(note: string) {
  return NOTES.indexOf(note);
}

export function noteFrom(start: string, semitones: number) {
  const idx = (noteIndex(start) + semitones) % NOTES.length;
  return NOTES[idx];
}

export function buildScale(root: string, type: string) {
  const intervals = SCALES[type];
  if (!intervals) return [];

  const scale = [root];
  let current = root;

  intervals.forEach(step => {
    current = noteFrom(current, step);
    scale.push(current);
  });

  return scale;
}
