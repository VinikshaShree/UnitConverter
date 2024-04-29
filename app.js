import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';

const Converter = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('km');
  const [convertedValue, setConvertedValue] = useState('');
  const [unitType, setUnitType] = useState('distance');

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setConvertedValue('Invalid input');
      return;
    }
    let result;
    if (unitType === 'distance') {
      if (selectedUnit === 'km') {
        // Convert kilometers to miles
        const conversionRate = 0.621371; // 1 km = 0.621371 miles
        result = value * conversionRate;
      } else if (selectedUnit === 'mi') {
        // Convert miles to kilometers
        const conversionRate = 1.60934; // 1 mi = 1.60934 km
        result = value * conversionRate;
      }
    } else if (unitType === 'weight') {
      if (selectedUnit === 'kg') {
        // Convert kilograms to pounds
        const conversionRate = 2.20462; // 1 kg = 2.20462 pounds
        result = value * conversionRate;
      } else if (selectedUnit === 'lbs') {
        // Convert pounds to kilograms
        const conversionRate = 0.453592; // 1 lb = 0.453592 kg
        result = value * conversionRate;
      }
    }
    setConvertedValue(result.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Unit Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Picker
        selectedValue={unitType}
        onValueChange={(value) => setUnitType(value)}
        style={styles.pickerInput}
      >
        <Picker.Item label="Distance" value="distance" />
        <Picker.Item label="Weight" value="weight" />
      </Picker>
      <Picker
        selectedValue={selectedUnit}
        onValueChange={(value) => setSelectedUnit(value)}
        style={styles.pickerInput}
      >
        {unitType === 'distance' ? (
          <>
            <Picker.Item label="Kilometers (km)" value="km" />
            <Picker.Item label="Miles (mi)" value="mi" />
          </>
        ) : (
          <>
            <Picker.Item label="Kilograms (kg)" value="kg" />
            <Picker.Item label="Pounds (lbs)" value="lbs" />
          </>
        )}
      </Picker>
      <TouchableOpacity style={styles.convertButton} onPress={convertUnits}>
        <Text style={styles.convertButtonText}>Convert</Text>
      </TouchableOpacity>
      <Text style={styles.result}>Converted Value: {convertedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginBottom: 20,
    padding: 10,
  },
  pickerInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    marginBottom: 20,
  },
  convertButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
  },
  convertButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  result: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
});

export default Converter;
