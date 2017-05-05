import React, { PropTypes } from 'react';
import {
  ListView,
  View,
  Text,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

import styles from './index.style';

const renderBanner = (banner, index) => {
  return (
    <View key={index} style={styles.banner.container} title={<Text numberOfLines={1} style={styles.banner.title}>{banner.title}</Text>}>
      <Image resizeMode='stretch' style={styles.banner.image} source={banner.image} />
    </View>
  )
};

const Banner = ({ banners, height = 200 }) => {
  return (
    <Swiper
      autoplay
      loop
      height={height}
      dot={<View style={styles.dot} />}
      activeDot={<View style={styles.activeDot} />}
      paginationStyle={styles.pagination}
    >
      {
        banners.map((banner, index) => renderBanner(banner, index))
      }
    </Swiper>
  );
};

Banner.propTypes = {
  banners: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
  }).isRequired).isRequired,
}

export default Banner;
