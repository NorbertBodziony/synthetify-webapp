import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#1D1D49',
    width: 855,
    height: 333,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      width: 855,
      height: 327
    },
    [theme.breakpoints.down('xs')]: {
      width: 413,
      height: 500
    }
  },

  statsWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      // alignItems:'center',
      width: '100%',
      height: 'calc(100% - 50px)',
      justifyContent: 'center'
    }
  },
  headerWrapper: {
    alignSelf: 'flex-start',
    position: 'relative',
    left: 24,
    top: 12,
    height: 80,
    width: 'calc(100% - 14px)'
  },
  title: {
    fontSize: '22px',
    lineHeight: '40px',
    fontWeight: 600,
    color: colors.navy.veryLightGrey,
    position: 'relative'
  },
  subTitle: {
    fontSize: '16px',
    lineHeight: '40px',
    fontWeight: 400,
    color: colors.navy.info,
    position: 'relative',
    width: 'calc(100% - 16px)',
    top: -8,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      lineHeight: '20px'
    }
  },

  chartWrapper: {
    width: 'calc(100% - 13.8px)',
    height: 85,
    backgroundColor: '#0C0D2C',
    borderRadius: 10,
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      width: 95,
      height: 'calc(100% - 10px)'
    },

    '& text': {
      fontWeight: 700,
      fontSize: 15
    }
  },

  border: {
    width: 'calc(100% - 48px)',
    height: 103,
    backgroundColor: colors.navy.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    top: 17,
    [theme.breakpoints.down('xs')]: {
      height: 404,
      width: 103,
      position: 'relative',
      top: 0,
      left: '15%',
      bottom: 0
    }
  },

  legendWrapper: {
    height: 120,
    margin: 0,
    top: 20,
    fontSize: 18,
    position: 'relative',
    width: 'calc(100% - 20px)',
    alignItems: 'center',
    display: 'flex',

    [theme.breakpoints.down('xs')]: {
      top: 0,
      margin: 0
    },

    '& ul': {
      margin: 0,
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        left: '13%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }
    },

    '& li': {
      marginRight: 25,
      fontSize: 18,
      lineHeight: '40px',
      fontFamily: 'Inter',
      [theme.breakpoints.down('xs')]: {
        margin: '0 0px -3px 25px',
        fontSize: 15
      }
    }
  }
}))

export default useStyles
