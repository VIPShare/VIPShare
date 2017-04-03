import { colors, size } from '../../theme/common.style';

export default {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  info: {
    container: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    username: {
      container: {
        paddingTop: 10,
        paddingBottom: 10,
      },
      text: {
        color: colors.normal,
        fontSize: size.xlg,
        paddingBottom: 10,
      },
      sign: {
        fontSize: size.sm,
        color: colors.secFonts,
      }
    }
  }
}
