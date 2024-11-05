import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../utils/Colors';
import PieChart from 'react-native-pie-chart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CircularChart({ categoryList }) {

    const widthAndHeight = 150;
    const [values, setValues] = useState([]);
    const [sliceColor, setSliceColor] = useState([]);
    const [totalCalculatedEstimate, setTotalCalculatedEstimates] = useState(0);

    useEffect(() => {
      categoryList && updateCircularChart();
    }, [categoryList]);

    const updateCircularChart = () => {
      let totalEstimates = 0;
      let otherCost = 0;

      const updatedSliceColor = [];
      const updatedValues = [];
      
      categoryList?.forEach((item, index) => {
        let itemTotalCost = 0;

        if (index < 4) {
          item.CategoryItems?.forEach((item_) => {
            itemTotalCost += item_.cost;
            totalEstimates += item_.cost;
          });
          updatedSliceColor.push(Colors.COLOR_LIST[index]);
          updatedValues.push(itemTotalCost);
        } else {
          item.CategoryItems?.forEach((item_) => {
            otherCost += item_.cost;
            totalEstimates += item_.cost;
          });
        }
      });

      updatedSliceColor.push(Colors.COLOR_LIST[4]);
      updatedValues.push(otherCost);

      setSliceColor(updatedSliceColor);
      setValues(updatedValues);
      setTotalCalculatedEstimates(totalEstimates);
    };

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit'
      }}>Total Estimate : <Text style={{ fontFamily: 'outfit-bold' }}>${totalCalculatedEstimate}</Text></Text>
      <View style={styles.subContainer}>
        {values.reduce((a, b) => a + b, 0) > 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.65}
            coverFill={'#FFF'}
          />
        ) : (
          <Text>No data available</Text> // Thông báo khi không có dữ liệu
        )}
        
        {categoryList?.length === 0 ? (
          <View style={styles.chartNameContainer}>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={24} color={Colors.GRAY} />
            <Text>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList?.map((category, index) => {
              if (index <= 4) {
                return (
                  <View key={index} style={styles.chartNameContainer}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={24} color={Colors.COLOR_LIST[index]} />
                    <Text>{index < 4 ? category.name : 'Other'}</Text>
                  </View>
                );
              }
              return null;
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    elevation: 1
  },
  subContainer: {
    marginTop: 10, 
    display:'flex',
    flexDirection: 'row',
    gap: 40
  },
  chartNameContainer: {
    display:'flex', 
    flexDirection: 'row', 
    gap: 5, 
    alignItems:'center'
  }
});
