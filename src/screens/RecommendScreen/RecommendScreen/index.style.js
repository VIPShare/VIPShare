import { width, size, colors } from '../../../theme';

export default {
  banner: {
    container: {
      flexDirection: 'row',
    },
    image: {
      width,
      height: 220,
      resizeMode: 'contain',
    },
  },
  content: {
    container: {
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
      fontSize: size.xlg,
      color: colors.normal,
      paddingBottom: 20,
    },
    info: {
      fontSize: size.md,
      color: colors.secFonts,
    },
  },
}
