import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import images from '../commonconfig/images'
import moment, { ISO_8601 } from 'moment'
import { CSS_STYLES, FONT_STYLES, THEME_COLOR } from '../commonconfig/constStyle'

export default function CustomCalander() {

  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState();
  const [Today, setToady] = useState(0);
  const today = moment(); // Get the current date and time
  const dates = [];
  const days = [];

  for (let i = 0; i < 15; i++) {
    const date = today.clone().add(i, 'days'); // Add i days to today's date
    dates.push(date.format('DD-MM')); // Format the date as DD-MM-YYYY and add to the array
    days.push(date.day());
  }
  // console.log(dates);
  return (
    <ScrollView horizontal={true} style={{}}>
      {dates.map((item, index) => {
        // { if (index > 0) { moment(new Date(date.setDate(date.getDate() + 1))).date() } }
        // console.log(days[index], '=====', moment(item).format, '=====', moment(item).day());

        return (
          <View style={{ alignItems: 'center', marginRight: 10, marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => { setSelected(item) }}
              style={[styles.container, { borderWidth: selected == item ? 1 : 0, backgroundColor: selected == item ? 'transparent' : '#F5F3EF' }]}>
              <Text style={{ ...FONT_STYLES.hn24, opacity: selected == item ? 1 : 0.1 }}>{item.split("-")[0]}</Text>
              <Text style={{ ...FONT_STYLES.hsb16, fontWeight: 'bold', opacity: selected == item ? 1 : 0.1 }}>{month[moment(item).month()]}</Text>
              {selected == item ? <Image source={images.rightTick} style={{ ...CSS_STYLES.i2, position: 'absolute', right: -5, top: -2 }} /> : null}
            </TouchableOpacity>
            <Text style={{ opacity: selected == item ? 1 : 0.3 }}>{day[days[index]]}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...CSS_STYLES.c1,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderColor: THEME_COLOR,
    borderRadius: 15,
    backgroundColor: '#F5F3EF'
  },
})