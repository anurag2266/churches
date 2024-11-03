import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CSS_STYLES,
  FONT_STYLES,
  LIGHT_THEME,
  THEME_COLOR,
  c,
} from '../commonconfig/constStyle';
import images from '../commonconfig/images';
import TouchableItems from './TouchableItems';
import OrientationFunction from '../commonconfig/OrientationFunction';

export const DetailCard = ({
  containerStyle,
  onPress,
  heading,
  headingStyle,
  headingContainer,
  image,
  imageStyle,
  value,
  valueStyle,
  image2,
  imageStyle2,
  line,
  lineStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={onPress ? false : true}
      style={[
        { ...CSS_STYLES.cf2, paddingVertical: 5, flex: 1 },
        containerStyle,
      ]}>
      <View style={[{ flexDirection: 'row', flex: 1 }, headingContainer]}>
        {image ? (
          <Image
            source={image}
            style={[
              { ...CSS_STYLES.i2, marginRight: 5, tintColor: LIGHT_THEME },
              imageStyle,
            ]}
          />
        ) : null}
        <Text style={[{ ...FONT_STYLES.h13 }, headingStyle]}>{heading}</Text>
      </View>
      {value ? (
        <View
          style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
          <Text
            style={[
              { ...FONT_STYLES.hb13, color: '#000', textAlign: 'right' },
              valueStyle,
            ]}>
            {value}
          </Text>
          {image2 ? (
            <Image
              source={image2}
              style={[{ ...CSS_STYLES.i2, marginLeft: 5 }, imageStyle2]}
            />
          ) : null}
        </View>
      ) : null}
      {line ? <View style={[CSS_STYLES.lineStyle, lineStyle]} /> : null}
    </TouchableOpacity>
  );
};

export const ListCard = ({
  onPress, containerStyle,
  image, imageStyle,
  textContainer,
  name, nameStyle,
  subHeading, subHeadingStyle,
  date, dateStyle,
  description, descriptionStyle,
  duration, durationStyle, noOfLine,
  play, playpress,
  children,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={onPress ? false : true}
      style={[
        CSS_STYLES.cf2,
        {
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          borderBottomColor: LIGHT_THEME,
          borderRadius: 15, paddingHorizontal: 10,
          paddingVertical: 10
        },
        containerStyle,
      ]}>
      {/* <View style={{ paddingVertical: 10 }}> */}
      <Image
        // source={image ? { uri: image } : images.alexavatar}
        source={image}
        style={[{ height: 100, width: 100, resizeMode: 'cover', borderRadius: 10 }, imageStyle]}
      />
      {/* </View> */}
      <View
        style={[{ flex: 1, marginLeft: 10 }, textContainer]}>
        <Text style={[FONT_STYLES.hb18, {}, nameStyle]}>{name}</Text>
        {subHeading ? <Text style={[FONT_STYLES.h13, { opacity: .7 }, subHeadingStyle]}>{subHeading}</Text> : null}
        {date ? (
          <Text style={[FONT_STYLES.h15, { opacity: 0.3 }, dateStyle]}>{date}</Text>
        ) : null}

        {duration ? <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Image source={images.equalizer} style={{ height: 20, width: 60, resizeMode: 'cover' }} />
          <Text style={[FONT_STYLES.h13, { opacity: .4, marginLeft: 5 }, durationStyle]}>{duration}</Text>
        </View> : description ? (
          <Text numberOfLines={noOfLine ? noOfLine : 1} style={[FONT_STYLES.h14, {}, descriptionStyle]}>{description}</Text>
        ) : null}


        {children}
      </View>
      {playpress ? <TouchableOpacity onPress={playpress}
        style={{ alignSelf: 'center' }}>
        {/* <Image source={play ? images?.pause : images.play} style={[CSS_STYLES.i35]} /> */}
      </TouchableOpacity> : null}
    </Pressable>
  );
};
export const ListCard2 = ({
  onPress, containerStyle,
  image, imageStyle,
  textContainer,
  name, nameStyle,

  date, dateStyle,
  description, descriptionStyle,
  noOfLine,
  children,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={onPress ? false : true}
      style={[

        {
          alignItems: 'flex-start',
          backgroundColor: '#fff',
          borderBottomColor: LIGHT_THEME,
          borderBottomWidth: 1,
          // borderRadius: 15, 
          paddingHorizontal: 10,
          paddingVertical: 10
        },
        containerStyle,
      ]}>
      <View style={{ ...CSS_STYLES.cf2 }}>
        <Image
          source={image}
          style={[{ height: 50, width: 50, resizeMode: 'contain', borderRadius: 10 }, imageStyle]}
        />
        <View
          style={[{ flex: 1, marginLeft: 10 }, textContainer]}>
          <Text style={[FONT_STYLES.hb18, {}, nameStyle]}>{name}</Text>
          {date ? (
            <Text style={[FONT_STYLES.h15, { opacity: 0.3 }, dateStyle]}>{date}</Text>
          ) : null}
        </View>
      </View>
      {description ? (
        <Text numberOfLines={noOfLine ? noOfLine : 1} style={[FONT_STYLES.h14, { marginTop: 10 }, descriptionStyle]}>{description}</Text>
      ) : null}
      {children}

    </Pressable>
  );
};

// communication channel  p-55
export const ChatCard2 = ({
  onPress,
  containerStyle,
  image,
  activedot,
  activedotStyle,
  textContainer,
  textSubContainer,
  Heading,
  HeadingStyle,
  time,
  timeStyle,
  message,
  messageStyle,

  children,
}) => {
  return (
    <TouchableItems
      onPress={onPress}
      style={[CSS_STYLES.cardContainer, { flexDirection: 'row' }]}>
      <Image
        source={image ? image : images.chat}
        style={[{ ...CSS_STYLES.i4, marginRight: 5 }, containerStyle]}
      />
      <View style={[{ flex: 1 }, textContainer]}>
        <Text style={[{ ...FONT_STYLES.hb13 }, HeadingStyle]}>{Heading}thisasfks</Text>
        <View style={[CSS_STYLES.cf2, textSubContainer]}>
          <View style={[{ flexDirection: 'row' }]}>
            <Text style={[{ ...FONT_STYLES.h13 }, messageStyle]}>{message}</Text>
            {activedot ? (
              <View
                style={[
                  {
                    height: 8,
                    width: 8,
                    borderRadius: 10,
                    backgroundColor: 'red',
                  },
                  activedotStyle,
                ]}
              />
            ) : null}
          </View>
          <Text style={[{ ...FONT_STYLES.h13 }, timeStyle]}> {time}</Text>
        </View>
        {children}
      </View>
    </TouchableItems>
  );
};

// group card p-37
export const ParticipantsCard = ({
  onPress,
  containerStyle,
  image,
  imageStyle,
  name,
  subname,
  subname2,
  nameStyle,
  name2,
  nameStyle2,
  rendernameRight,
  designation,
  department,
  Quantity,
  designationStyle,
  renderdesignationRight,
  renderquantityRight,
  showCheck,
  isChecked,
  checkPress,
  checkStyle,
  children,
  leaderboard,
  like,
  likeStyle,
  dislike,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[CSS_STYLES.cardContainer, containerStyle]}>
      <View style={[CSS_STYLES.cf2, {}]}>
        <Image source={image} style={[{ ...CSS_STYLES.i6 }, imageStyle]} />
        <View style={[{ flex: 1, marginLeft: 10 }]}>
          {subname ? <View
            style={[{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }]}>
            <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, nameStyle]}>
              {subname}
            </Text>
            <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, nameStyle2]}>
              {subname2}
            </Text>
          </View> : null}
          <View
            style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={[FONT_STYLES.hb15, { marginRight: 5 }, nameStyle]}>
              {name}
            </Text>
            <Text style={[FONT_STYLES.hb15, { marginRight: 5 }, nameStyle2]}>
              {name2}
            </Text>
            {leaderboard ? (
              <View style={[{ flexDirection: 'row' }]}>
                <TouchableItems
                  image={images.uparrow}
                  imageStyle={{ ...CSS_STYLES.i15, marginRight: 5 }}
                  text={like}
                  textStyle={likeStyle}
                  containerStyle={{ marginRight: 10 }}
                />
                <TouchableItems
                  image={images.downarrow}
                  imageStyle={{ ...CSS_STYLES.i15, marginRight: 5 }}
                  text={like}
                  textStyle={likeStyle}
                />
              </View>
            ) : null}

            {rendernameRight ? rendernameRight() : null}
          </View>
          <View
            style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            {designation ? (
              <Text
                style={[FONT_STYLES.hsb14, { opacity: 0.5, }, designationStyle]}>
                {designation} | {department}
              </Text>

            ) : null}
            {renderdesignationRight ? renderdesignationRight() : null}
          </View>
          <View
            style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            {Quantity ? (
              <Text
                style={[FONT_STYLES.hsb14, { opacity: 0.5, }, designationStyle]}>
                {Quantity}
              </Text>
            ) : null}
            {renderquantityRight ? renderquantityRight() : null}
          </View>
        </View>
        {checkPress ? (
          <TouchableItems
            image={isChecked ? images.check : images.unchecked}
            imageStyle={[
              { ...CSS_STYLES.i2, tintColor: LIGHT_THEME },
              checkStyle,
            ]}
            onPress={checkPress}
          />
        ) : null}
      </View>
      {children}
    </Pressable>
  );
};

export const OrderManage = ({
  onPress,
  containerStyle,
  subname, nameStyle,
  subname2, nameStyle2,
  // date, dateStyle,
  title, titleStyle,
  product, productStyle,
  productname, productnameStyle2,
  deliver, deliverStyle,
  deliverlocation, deliverlocationStyle2,
  Quantity, QuantityStyle,
  payment, paymentStyle,
  paymentstatus, paymentstatusStyle,
  declineReason, declineResStyle
}) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: '#fff',
      borderRadius: 15,
      marginBottom: 15,
      paddingBottom: 20,
    }}
      onPress={onPress}
    >
      <View style={[CSS_STYLES.cardContainer, containerStyle]}>
        <View
          style={[{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }]}>
          <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, nameStyle]}>
            {subname}
          </Text>
          <Text style={[FONT_STYLES.hbs5, { marginRight: 5, fontWeight: 'bold', opacity: .5 }, nameStyle2]}>
            {subname2}
            {/* <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, dateStyle]}>{date}</Text> */}
          </Text>
        </View>
        <View style={CSS_STYLES.lineStyle} />
        <Text style={[FONT_STYLES.hb15, { marginRight: 5 }, titleStyle]}>
          {title}
        </Text>
        <View
          style={[{ flexDirection: 'row', marginBottom: 5 }]}>
          <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, productStyle]}>
            {product}
          </Text>
          <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, productnameStyle2]}>
            {productname}
          </Text>
        </View>
        <View
          style={[{ flexDirection: 'row', marginBottom: 5 }]}>
          <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, deliverStyle]}>
            {deliver}
          </Text>
          <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, deliverlocationStyle2]}>
            {deliverlocation}
          </Text>
        </View>
      </View>
      <View
        style={[{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "#FDF5F5", paddingVertical: 15, paddingHorizontal: 10 }]}>
        <Text style={[FONT_STYLES.hb10, { marginRight: 5 }, QuantityStyle]}>
          {Quantity}
        </Text>
        <View style={{ flexDirection: "row", flex: 1, justifyContent: 'flex-end' }}>
          <Text style={[FONT_STYLES.hbs4, { fontWeight: 'bold', marginRight: 5, opacity: .5 }, paymentStyle]}>
            {payment}
          </Text>
          <Text style={[FONT_STYLES.hbs4, { marginRight: 5, }, paymentstatusStyle]}>
            {paymentstatus}
          </Text>
        </View>
      </View>
      {declineReason ? <View style={{ paddingHorizontal: 10, marginTop: 10, }}>
        <Text style={[FONT_STYLES.hb6, { marginRight: 5, color: THEME_COLOR }, paymentStyle]}>
          Reason Declined
        </Text>
        <Text style={[FONT_STYLES.hbs5, { marginRight: 5 }, declineResStyle]}>
          {declineReason}
        </Text>
      </View> : null}

    </TouchableOpacity>
  )
}

export const ItemsPrice = ({
  containerStyle,
  text1, text1style,
  text2, text2style,
  renderRight
}) => {
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }, containerStyle]}>
      <Text style={[
        { ...FONT_STYLES.hbs4, color: '#666', lineHeight: 24 },
        text1style,
      ]}>
        {text1}
      </Text>
      <Text style={[{ ...FONT_STYLES.hbs4, color: '#666' }, text2style]}>
        {text2}
      </Text>
      {renderRight ? renderRight() : null}
    </View>
  );
};

export const UploadCard = ({
  containerStyle,
  onPress,
  image, imageStyle,
  text, textStyle,
  text2, text2Style
}) => {
  return (
    <TouchableOpacity
      style={[styles.uploadContainer, containerStyle]}
      onPress={onPress}>
      <Image source={image ? image : images.uploadlogo} style={[CSS_STYLES.i3, { resizeMode: 'contain' }, imageStyle]} />
      <Text
        style={[
          {
            ...FONT_STYLES.hb13,
            color: '#000',
            textAlign: 'center',
            marginVertical: 5,
          },
          textStyle]}>
        {text}
      </Text>
      {text2 ? (
        <Text
          style={[
            {
              ...FONT_STYLES.h13,
              color: 'rgba(0,0,0,.4)',
              textAlign: 'center',
            },
            text2Style]}>
          {text2}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};


export const ProductCard = ({
  containerStyle,
  onPress, //card press
  id,
  image, imageStyle, imageStyle2, //image
  heartPress, heartStyle, heartContainer,

  toprating, //app rating over the image
  brandname,
  brandnameStyle, //brand name (blue color)
  itemname, itemnameStyle, //item name

  mrp, mrpStyle, //main mrp
  mrp2, //cut mrp (linethrough)
  discount, discountStyle,

}) => {
  const Orientation = OrientationFunction()
  return (
    <TouchableOpacity onPress={onPress}
      style={[{ width: Orientation.width * .5 - 30, marginVertical: 10, backgroundColor: "#fff", borderRadius: 10, paddingBottom: 15, paddingTop: 10, elevation: 1 }, containerStyle]}>

      <ImageBackground source={image}
        style={[{
          height: Orientation.width * .4 - 30, width: Orientation.width * .5 - 30,

          alignSelf: 'center', marginBottom: 5,
        }, imageStyle]}
        imageStyle={[{ resizeMode: 'contain', borderTopLeftRadius: 10, borderTopRightRadius: 10 }, imageStyle2]}
      >

        {heartPress ? <TouchableItems image={images.Emptyheart}
          onPress={heartPress}
          // source={wishlist[item.id] ? images.fillheart : images.Emptyheart}
          imageStyle={[CSS_STYLES.i2, heartStyle]}
          containerStyle={[{ justifyContent: 'flex-end', top: 8, right: 5 }, heartContainer]}
        /> : null}
      </ImageBackground>

      <View style={{ marginLeft: 10, marginTop: 20 }}>
        <Text style={[{ ...FONT_STYLES.hb8, color: "#000" }, itemnameStyle]}>{itemname}</Text>
        <View style={{ ...FONT_STYLES.hb8, flexDirection: "row", marginTop: 5 }}>
          <Text style={[{ ...FONT_STYLES.hb8, color: "#000" }, mrpStyle]}>{mrp}</Text>
          {mrp2 ? <Text style={{ ...FONT_STYLES.h2, marginLeft: 3, textDecorationLine: 'line-through' }}>{mrp2}</Text> : null}
        </View>
        {discount ? <Text style={[{ ...FONT_STYLES.h2, marginTop: 5 }, discountStyle]}>MDQ : {discount}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}




export const ProductCard2 = ({
  containerStyle,
  onPress, //card press
  id,
  image,
  imageStyle, //image
  percent, //discount percentage over the image
  toprating, //app rating over the image
  brandname,
  brandnameStyle, //brand name (blue color)
  itemname,
  itemnameStyle, //item name
  rating, //star rating
  mrp,

  mrpStyle, //main mrp
  mrp2, //cut mrp (linethrough)
  all_tax, //to display (include all taxes ) text
  greenCoin, //green coin count
  addPress, //+add button onpress
  stockout,  //disable add btn     and  show stockoutText
}) => {
  // const navigation = useNavigation();
  var percent = ((mrp2 - mrp) / mrp2) * 100;
  percent = Math.round(percent);
  // var name = '';
  // if (itemname.length > 30) {
  //     name = itemname.substring(0, 30).concat('' + '...');
  // } else {
  //     name = itemname
  // }
  let defaultsourceimage = ''
  const Orientation = OrientationFunction();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: '#fff',
          ...CSS_STYLES.shadow,
          padding: 8,
          borderRadius: 20,
          paddingBottom: 10,
          width: '48%',
        },
        containerStyle,
      ]}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
          height: 37,
          orderWidth: 0
          // padding: 8,
        }}>
        {percent > 0 ? (
          <View
            style={{
              ...CSS_STYLES.c1,
              ...CSS_STYLES.shadow,
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 7,
              backgroundColor: percent > 0 ? '#fff' : 'transparent',
              height: 35,
              orderWidth: 0
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#6C9D2F',
                fontSize: 10,
                fontWeight: '700',
              }}>
              {percent}% OFF
            </Text>
          </View>
        ) : (
          <View />
        )}
        {toprating > 0 ? (
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('OneGreenIndex');
            }}
            style={{
              ...CSS_STYLES.cf1,
              ...CSS_STYLES.shadow,
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 7,
              backgroundColor: '#fff',
              borderWidth: 0
            }}>
            <Image
              source={images.curaterimg1}
              resizeMode={'contain'}
              style={[{ width: 25, height: 25, marginRight: 5 }]}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontSize: 10,
                fontWeight: '700',
              }}>
              {toprating}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <ImageBackground
        defaultSource={{
          uri: defaultsourceimage,
        }}
        // source={(image !== null && image !== undefined) ? { uri: image } : { uri: defaultsourceimage }}
        source={image}
        resizeMode={'cover'}
        imageStyle={[
          { borderRadius: 20, height: Orientation.width * 0.48 - 40 },
          imageStyle,
        ]}
        style={[
          { borderRadius: 20, height: Orientation.width * 0.48 - 40, borderWidth: 0 },
          imageStyle,
        ]}>

      </ImageBackground>
      <View style={{ marginLeft: 8, paddingVertical: 10 }}>
        {brandname?.length > 0 ? <Text
          // onPress={() => navigation.navigate("Brand", { id: id })}
          style={[
            {
              color: THEME_COLOR,
              fontSize: 11,
              letterSpacing: 0.8,
              fontWeight: '900',
            },
            brandnameStyle,
          ]}>
          {brandname?.length < 15 ? brandname : `${brandname.slice(0, 15)}...`}

        </Text> : <Text style={[{ fontSize: 11, }]} />}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[
              {
                flex: 1,
                color: '#000',
                fontSize: 10,
                fontFamily: 'Quicksand-Bold',
              },
              itemnameStyle,
            ]}>
            {itemname?.length < 15 ? itemname : `${itemname?.substring(0, 15)}...`}
          </Text>
          {rating > 0 ? (
            <View style={{ ...CSS_STYLES.cf1 }}>
              <Image
                source={images.star}
                resizeMode={'contain'}
                style={{ width: 10, height: 10 }}
              />
              <Text style={{ color: '#000', fontSize: 10, fontWeight: '700' }}>
                {rating}
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // marginTop: 8,
            alignItems: 'center',
            height: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#111111',
              fontSize: 11,
              fontFamily: 'Quicksand-Bold',
              opacity: 0.2,
            }}>
            MRP
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: THEME_COLOR,
              fontSize: 14,
              fontFamily: 'Quicksand-Bold',
              marginLeft: 7,
              ...mrpStyle,
            }}>
            ₹{mrp}
          </Text>
          {mrp == mrp2 ? null : (
            <Text
              style={{
                textAlign: 'center',
                color: '#111111',
                fontSize: 11,
                fontWeight: '700',
                opacity: 0.5,
                marginLeft: 5,
                textDecorationLine: 'line-through',
                textDecorationStyle: 'solid',
              }}>
              {mrp2 ? `₹${mrp2}` : null}
            </Text>
          )}
        </View>
        {all_tax ? (
          <Text
            style={{ color: THEME_COLOR, fontSize: 11, fontWeight: '700' }}>
            ( Inclusive of all taxes )
          </Text>
        ) : null}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            {greenCoin && greenCoin > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // flex:1,
                  // backgroundColor:'red',
                  marginRight: 3,
                }}>
                <Image
                  source={images.curator2}
                  resizeMode={'contain'}
                  style={{ width: 15, height: 15, }}
                />
                <Text
                  style={{
                    flex: 1,
                    color: '#000000',
                    fontSize: 11,
                    opacity: 0.8,
                    fontFamily: 'Quicksand-Medium',
                    marginLeft: 4,
                  }}>
                  {greenCoin} Green Coins</Text>
              </View>
            ) : null}
          </View>
          {stockout ?
            <Text
              style={{
                // flex: 1,
                color: '#000000',
                fontSize: 11,
                opacity: 0.8,
                fontFamily: 'Quicksand-Medium',
                marginLeft: 2,
                paddingVertical: 6,
              }}>
              Stock Out
            </Text>
            : <TouchableOpacity
              onPress={addPress}
              disabled={stockout}
              style={{
                backgroundColor: THEME_COLOR,
                borderRadius: 15,
                paddingHorizontal: 12,
                paddingVertical: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 10,
                  marginBottom: 1,
                  fontFamily: 'Quicksand-Bold',
                }}>
                + Add
              </Text>
            </TouchableOpacity>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  onlinedot: {
    height: 12,
    width: 12,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 6,
    right: 6,
    borderRadius: 10,
  },
  uploadContainer: {
    ...CSS_STYLES.c1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'dashed',
    paddingVertical: 15,
    //   width: '48%',
    height: 120,
    marginVertical: 5
  },
});
