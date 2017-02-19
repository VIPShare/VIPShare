import { colors, size } from '../../theme';

export default {
    tabs: {
        title: {
            fontSize: size.md,
            fontWeight: 'bold',
            color: colors.normal,
        },
        selected: {
            color: colors.highlight,
        },
        icon: {
            container: {
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12,
            },
            color: '#5e6977',
            size: 33,
        }
    }
}
