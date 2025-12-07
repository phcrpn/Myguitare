import React from "react";
import { View, useWindowDimensions } from "react-native";
import Svg, { Circle, Line, Rect, Text } from "react-native-svg";
import { STANDARD_TUNING, buildScale, noteFrom } from "../lib/music";


type Props = {
  scaleRoot: string;  // ex : "A", "Bb" (on gérera ça)
  scaleType: string;  // ex : "pentatonique mineure"
  frets?: number;
};

export default function FretboardWithNotes({scaleRoot, scaleType, frets = 12}: Props)
{
  const { width } = useWindowDimensions();
  const boardWidth = width - 20;
  const boardHeight = 200;
  const nutWidth = 6;
  const fretSpacing = (boardWidth - nutWidth) / frets;
  const strings = 6;
  const stringSpacing = boardHeight / (strings + 1);
  
  // positions de repères (3,5,7,9 et 12 double)
  const markerFrets = new Set([3, 5, 7, 9, 12]);

  // construit la gamme
  const scale = buildScale(scaleRoot, scaleType);

  // transforme Bb en A# pour stabilité interne
  const normalize = (n: string) => n.replace("Bb", "A#").replace("Db", "C#").replace("Eb", "D#").replace("Gb", "F#").replace("Ab", "G#");

  const normalizedScale = scale.map(normalize);
  const normalizedRoot = normalize(scaleRoot);


  return (    
    <View style={{ alignItems: "center", padding: 1 }}>      
      <Svg width={boardWidth} height={boardHeight}>

        {/* Fond */}
        <Rect x={0} y={15} width={boardWidth} height={boardHeight-30} rx={10} fill="#5c4033" />

        {/* Sillet */}
        <Rect x={0} y={15} width={nutWidth} height={boardHeight-30} fill="#e6e6e6" />
        
        {/* Frets */}
        {Array.from({ length: frets + 1 }).map((_, f) => (
          <Line
            key={`fret-${f}`}
            x1={nutWidth + f * fretSpacing}
            y1={15}
            x2={nutWidth + f * fretSpacing}
            y2={boardHeight-15}
            stroke="#c9b59b"
            strokeWidth={2}
          />
        ))}  

         
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
                    fill="#030303ff"
                  />
                  <Circle
                    cx={xCenter}
                    cy={boardHeight * 0.68}
                    r={8}
                    fill="#030303ff"
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
                fill="#030303ff"
              />
            );
          }
          return null;
        })}


        {/* Cordes */}
        {Array.from({ length: strings }).map((_, s) => (
          <Line
            key={`string-${s}`}
            x1={0}
            y1={stringSpacing * (s + 1)}
            x2={boardWidth}
            y2={stringSpacing * (s + 1)}
            stroke="#d8c3a5"
            strokeWidth={1.5}
          />
        ))}
   
        {/* NOTES */}
        {STANDARD_TUNING.map((openString, s) => {
          const y = stringSpacing * (s + 1);
          let note = normalize(openString);

          return Array.from({ length: frets + 1 }).map((_, f) => {
            if (f > 0) note = noteFrom(openString, f); // note à la case f
            const normalizedNote = normalize(note);

            // si la note est dans la gamme -> l'afficher
            if (normalizedScale.includes(normalizedNote)) {
              const x = nutWidth + f * fretSpacing - fretSpacing / 2;

              const isRoot = normalizedNote === normalizedRoot;

              return (
                <React.Fragment key={`note-${s}-${f}`}>
                <Circle 
                    cx={x} 
                    cy={y} 
                    r={isRoot ? 14 : 10} 
                    fill={isRoot ? "#ffdd55" : "#ffffff"} 
                    stroke="#000" />  
                
                <Text
                    x={x}
                    y={y + 4}     // petit décalage vertical pour centrage
                    textAnchor="middle"
                    fontSize={14}
                    fontWeight={isRoot ? "bold" : "500"}
                    fill="#000"
                >
                {normalizedNote}
                </Text>
                </React.Fragment>
              );
            }
          });
        })}

      </Svg>
    </View>
  );
}
