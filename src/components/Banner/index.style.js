import { colors, size, width } from '../../theme';

export default {
  container: {
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.5)',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  pagination: {
    bottom: 5,
    left: null,
    right: 10,
  },
  banner: {
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    title: {
      bottom: 30,
      color: '#fff',
    },
    image: {
      width,
      flex: 1,
    },
  },
};
