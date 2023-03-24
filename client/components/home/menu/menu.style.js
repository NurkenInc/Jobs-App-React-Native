import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '65%',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#FFF',
    borderRadius: SIZES.small,
  },
  optionContainer: (selectedOption, option) => ({
    flex: 1,
    padding: SIZES.large,
    borderRadius: SIZES.small,
    backgroundColor: selectedOption === option ? COLORS.primary : '#FFF'
  }),
  optionText: (selectedOption, option) => ({
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: selectedOption === option ? COLORS.white : COLORS.primary
  })
})

export default styles