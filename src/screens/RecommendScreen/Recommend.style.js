import { colors, weight, size, width } from '../../theme';

const itemWidth = (width - 12) / 2;
export default {
  recommend: {
    container: {
      marginLeft: 6,
      marginRight: 6,
      marginTop: 4,
      marginBottom: 4,
      padding: 0,
    },
    wrapper: {
      height: 150,
    },
    content: {
      container: {
        padding: 10,
        width: itemWidth,
      },
      title: {
        text: {
          marginTop: 5,
          fontWeight: weight.bold,
          fontSize: size.md + 2,
        },
      },
      bar: {
        container: {
          flexDirection: 'row',
          position: 'absolute',
          bottom: 5,
          left: 5,
        },
        badge: {
          container: {
            borderRadius: 0,
            paddingLeft: 5,
            paddingRight: 5,
            marginRight: 10,
            backgroundColor: colors.secFonts
          },
          text: {
            fontSize: size.xs,
          }
        },
        time: {
          text: {
            fontSize: size.sm,
            color: colors.secFonts,
          },
        },
      },
    },
    preview: {
      container: {
        width: itemWidth,
      },
      image: {
        width: '100%',
        height: '100%',
      },
    },
  }
};
