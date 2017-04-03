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
      borderBottomWidth: 1,
      borderBottomColor: '#cbd2d9',
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
      },
    },
  },
  list: {
    container: {
      marginTop: 15,
      paddingLeft: 15,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderBottomColor: '#cbd2d9',
    },
    item: {
      container: {
        borderBottomWidth: 0,
      },
      leftIcon: {
        color: colors.normal,
      },
      title: {
        marginLeft: 5,
      }
    },
  },
}
