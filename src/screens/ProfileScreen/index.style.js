import { size, colors } from '../../theme';

const headerItem = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: size.lg,
    color: '#fff',
  },
}
export default {
  header: {
    container: {
      height: 80,
    },
    title: {
      ...headerItem,
    },
    left: {
      container: {
        ...headerItem.container,
        alignItems: 'flex-start',
        paddingLeft: 20,
      },
      text: {
        ...headerItem.text,
        fontSize: size.ml,
      },
    },
    right: {
      container: {
        ...headerItem.container,
        alignItems: 'flex-end',
        paddingRight: 20,
      },
      text: {
        ...headerItem.text,
        fontSize: size.ml,
      },
    },
  },
  avatar: {
    container: {
      bottom: 0,
      justifyContent: 'center',
    },
    avatar: {
      bottom: -40,
      left: -64,
    },
  },
  items: {
    container: {
      marginTop: 60,
    },
  },
}
