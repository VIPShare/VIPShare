import { colors, size } from './common.style';

const buttonText = {
  fontSize: size.ml,
}

export default {
  leftWrapper: {
    marginLeft: 10,
  },
  rightWrapper: {
    marginRight: 10,
  },
  activeButton: {
    color: colors.active,
    ...buttonText,
  },
  unactiveButton: {
    color: colors.unactive,
    ...buttonText,
  },
}
