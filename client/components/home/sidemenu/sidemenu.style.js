import { StyleSheet } from 'react-native'

import { COLORS, FONT, SIZES } from '../../../constants'

const styles = StyleSheet.create({
  container: (isContainerClosed) => ({
    display: isContainerClosed ? 'none' : 'flex',
    height: '100%',
    width: '65%',
    position: 'absolute',
    zIndex: 999,
  }),
  innerContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: SIZES.small,
    paddingTop: SIZES.xxLarge
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
  }),
  closeBtnContainer: {
    alignItems: 'flex-end',
    padding: 5,
  },
  closeBtn: {

  },
  closeBtnIcon: {

  }
})

export default styles