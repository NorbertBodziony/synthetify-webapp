import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  font: {
    fontSize: 22,
    fontWeight: 400,
    color: colors.navy.lightGrey,
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      fontSize: 13
    }
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 18,

    [theme.breakpoints.down('sm')]: {
      width: 18,
      height: 18,
      marginRight: 8
    }
  },
  row: {
    height: 66,
    paddingInline: 16,

    '&:nth-of-type(2n+1)': {
      backgroundColor: colors.navy.dark
    },

    '&:nth-of-type(2n)': {
      backgroundColor: `${colors.navy.component}80`
    },

    [theme.breakpoints.down('sm')]: {
      height: 39,
      paddingInline: 14
    }
  }
}))

export default useStyles
