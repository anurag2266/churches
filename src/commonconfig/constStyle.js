
import { StyleSheet } from 'react-native';

// '#2855eb', '#3d1dcc'

export const THEME_COLOR = '#f6f5f7';
export const LIGHT_THEME = '#ebebf6';
export const BLUE = '#3450cf';
export const colorArr = ['#757ed1', '#a6d175', '#d17e75', '#d19b75', '#b975d1', '#75d18f', '#d1bf75', '#75bad1', '#d17584', '#8f75d1']


export const c = {
  background: '#E8EBEE',
  backgroundlight: 'rgba(232, 235, 238,.7)',
  border: '#C5CDD5',
  shadow: 'rgba(123, 90, 167,.15)',
  yellow: '#E6A82D',
  green: '#14AB14',
  red: '#C21616',
}

export const FONT_STYLES = {

  hb30: { fontFamily: 'Poppins-Regular', fontSize: 30, color: '#000', fontWeight: 'bold', },
  hb22: { fontFamily: 'Poppins-Regular', fontSize: 22, color: '#000000', fontWeight: 'bold', },
  hb20: { fontFamily: 'Poppins-Regular', fontSize: 20, color: '#000000', fontWeight: 'bold', },
  hb18: { fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000000', fontWeight: 'bold', },
  hb16: { fontFamily: 'Poppins-Regular', fontSize: 16, color: '#000000', fontWeight: 'bold', },
  hb14: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000000', fontWeight: 'bold', },
  hb13: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#000000', fontWeight: 'bold', },
  hb11: { fontFamily: 'Poppins-Medium', fontSize: 11, color: '#000000', fontWeight: 'bold', },

  hsb20: { fontFamily: 'Poppins-Regular', fontSize: 20, color: '#000000', fontWeight: '500', },
  hsb16: { fontFamily: 'Poppins-Regular', fontSize: 16, color: '#000000', fontWeight: '500', },
  hbs14: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#fff', fontWeight: '500' },
  hbs13: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#000000', fontWeight: '500', },
  hbs12: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000000', fontWeight: '500', },
  hbs11: { fontFamily: 'Poppins-Regular', fontSize: 11, color: '#333131', },

  h30: { fontFamily: 'Poppins-Regular', fontSize: 30, color: '#000000' },
  h20: { fontFamily: 'Poppins-Regular', fontSize: 20, color: '#000' },
  h18: { fontFamily: 'Poppins-Regular', fontSize: 18, color: '#000', },
  h17: { fontFamily: 'Poppins-Regular', fontSize: 17, color: '#000000' },
  h15: { fontFamily: 'Poppins-Medium', fontSize: 15, color: '#000000', },
  h14: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000', },
  h13: { fontFamily: 'Poppins-Regular', fontSize: 13, color: '#000000' },
  h12: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000000' },
  h10: { fontFamily: 'Poppins-Regular', fontSize: 10, color: '#000000' },
}
export const CSS_STYLES = StyleSheet.create({
  c1: { alignItems: 'center', justifyContent: 'center', },
  c2: { alignItems: 'center', justifyContent: 'space-between', },

  cf1: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  cf2: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },

  i10: { height: 100, width: 100, resizeMode: 'contain' },
  i9: { height: 90, width: 90, resizeMode: 'contain' },
  i95: { height: 95, width: 95, resizeMode: 'contain' },
  i8: { height: 80, width: 80, resizeMode: 'contain', borderRadius: 50 },
  i85: { height: 85, width: 85, resizeMode: 'contain', borderRadius: 50 },
  i7: { height: 70, width: 70, resizeMode: 'contain', borderRadius: 50 },
  i6: { height: 60, width: 60, resizeMode: 'contain', borderRadius: 50 },
  i5: { height: 50, width: 50, resizeMode: 'contain', borderRadius: 50 },
  i55: { height: 55, width: 55, resizeMode: 'contain' },
  i4: { height: 40, width: 40, resizeMode: 'contain' },
  i45: { height: 45, width: 45, resizeMode: 'contain' },
  i3: { height: 30, width: 30, resizeMode: 'contain' },
  i35: { height: 35, width: 35, resizeMode: 'contain' },
  i2: { height: 20, width: 20, resizeMode: 'contain' },
  i25: { height: 25, width: 25, resizeMode: 'contain' },
  i15: { height: 15, width: 15, resizeMode: 'contain' },

  lineStyle: {
    borderBottomWidth: 1,
    marginVertical: 5,
    borderColor: '#DEDEDE',
  },
  shadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    // shadowRadius: 1,
    elevation: 8,
  },

  cardContainer: {
    backgroundColor: '#EEF1F4',
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
  },
  // dropdown: {
  //   marginVertical: 5,
  //   borderWidth: 1,
  //   borderRadius: 30,
  //   paddingVertical: 8,
  //   paddingHorizontal: 20,
  //   borderColor: '#C5CDD5',

  // },
  dropdown: {
    // height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderColor: 'rgba(0,0,0,.2)',
    borderWidth: 1,

  },
  heading: {
    ...FONT_STYLES.hb5,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '900',
  },
});

