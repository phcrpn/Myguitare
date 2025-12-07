import FretboardWithNotes from "@/components/FretboardWithNotes";
import { NOTES, SCALES } from "@/lib/music";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";

export default function Index() {
  const [tonic, setTonic] = useState("A");        // tonique par défaut
  const [scaleType, setScaleType] = useState("majeure"); // gamme par défaut

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>      
      <View
        style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        marginVertical: 0
        }}
      >  
        {/* Sélecteur tonique */}
        <Picker
          selectedValue={tonic}
          onValueChange={(itemValue) => setTonic(itemValue)}
          style={{ marginVertical: 0 }}
        >
        {NOTES.map(note => (<Picker.Item key={note} label={note} value={note} />))}
        </Picker>

        {/* Sélecteur gamme */}
        <Picker
          selectedValue={scaleType}
          onValueChange={(itemValue) => setScaleType(itemValue)}
          style={{ marginVertical: 0 }}
        >
        {Object.keys(SCALES).map((scale) => (<Picker.Item key={scale} label={scale} value={scale}/>))}
        </Picker>
      </View>
      
      {/* Affichage du manche */}
      <FretboardWithNotes
        scaleRoot={tonic}
        scaleType={scaleType}
      />
    </SafeAreaView>
  );
}
