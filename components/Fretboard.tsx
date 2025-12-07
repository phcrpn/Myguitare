// components/Fretboard.tsx
import React from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Line, Rect } from "react-native-svg";

type Props = {
  strings?: number;   // nombre de cordes (6)
  frets?: number;     // nombre de cases (12)
  widthPadding?: number; // padding horizontal en px
};

export default function Fretboard({
  strings = 6,
  frets = 12,
  widthPadding = 10,
}: Props) {
  const { width } = useWindowDimensions();

  // dimensions calculées
  const boardWidth = Math.max(300, width - widthPadding * 2);
  const boardHeight = 220; // fixe pour confort ; on peut adapter
  const nutWidth = 4;
  const fretSpacing = (boardWidth - nutWidth) / frets;
  const stringSpacing = boardHeight / (strings + 1);

  // positions de repères (3,5,7,9 et 12 double)
  const markerFrets = new Set([3, 5, 7, 9, 12]);

  return (
    <View style={{ alignItems: "center", padding: 1 }}>
      <Svg width={boardWidth} height={boardHeight}>
        {/* fond du manche */}
        <Rect
          x={0}
          y={0}
          width={boardWidth}
          height={boardHeight}
          rx={0}
          fill="#5c4033"
        />

        {/* sillet (nut) */}
        <Rect
          x={0}
          y={0}
          width={nutWidth}
          height={boardHeight}
          fill="#e6e6e6"
        />

        {/* frettes */}
        {Array.from({ length: frets + 1 }).map((_, i) => {
          const x = nutWidth + i * fretSpacing;
          return (
            <Line
              key={`fret-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={boardHeight}
              stroke={i === 0 ? "#e6e6e6" : "#c9b59b"}
              strokeWidth={i === 0 ? 4 : 2}
            />
          );
        })}

        {/* cordes */}
        {Array.from({ length: strings }).map((_, s) => {
          const y = stringSpacing * (s + 1);
          // largeur de corde dépend de l'épaisseur fictive : basse plus grosse
          const strokeWidth = 1.6 - (s / (strings - 1)) * 1.0; // ajustable
          return (
            <Line
              key={`string-${s}`}
              x1={0}
              y1={y}
              x2={boardWidth}
              y2={y}
              stroke="#d8c3a5"
              strokeWidth={strokeWidth}
            />
          );
        })}

        {/* repères de touche (dots) */}
        {Array.from({ length: frets }).map((_, f) => {
          const fretNumber = f + 1;
          const xCenter = nutWidth + (f + 0.5) * fretSpacing;
          if (markerFrets.has(fretNumber)) {
            if (fretNumber === 12) {
              // double dot
              return (
                <React.Fragment key={`marker-${fretNumber}`}>
                  <Circle
                    cx={xCenter}
                    cy={boardHeight * 0.32}
                    r={8}
                    fill="#e6e6e6"
                  />
                  <Circle
                    cx={xCenter}
                    cy={boardHeight * 0.68}
                    r={8}
                    fill="#e6e6e6"
                  />
                </React.Fragment>
              );
            }
            return (
              <Circle
                key={`marker-${fretNumber}`}
                cx={xCenter}
                cy={boardHeight * 0.5}
                r={8}
                fill="#e6e6e6"
              />
            );
          }
          return null;
        })}
      </Svg>
    </View>
  );
}
