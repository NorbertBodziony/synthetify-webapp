import React from 'react'
import { Grid, makeStyles, Tab, Tabs, withStyles } from '@material-ui/core'
import { createStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

interface IProps {
  items: string[]
  onChange: (newValue: number) => void
}

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const StyledTabs = withStyles({
  indicator: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: colors.black.controls
  },
  scrollButtons: {
    color: 'white'
  }
})((props: StyledTabsProps) => (
  <Tabs
    variant='scrollable'
    scrollButtons='auto'
    TabIndicatorProps={{ children: <span /> }}
    {...props}
  />
))

interface StyledTabProps {
  label: string
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
      textTransform: 'none',
      fontWeight: 400,
      fontSize: 22,
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
      },
      color: colors.gray.manatee
    },
    selected: {
      fontWeight: 600,
      color: colors.gray.C4
    }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 1,
    borderBlockStyle: 'solid',
    borderColor: colors.gray.manatee,
    borderRadius: 10,
    backgroundColor: colors.blue.bastille
  }
}))

export const SwitchMenu: React.FC<IProps> = ({ items, onChange }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const tabs = items.map((item, index) => <StyledTab key={index} label={item} />)

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <Grid className={classes.root}>
      <StyledTabs value={value} onChange={handleChange}>
        {tabs}
      </StyledTabs>
    </Grid>
  )
}

export default SwitchMenu
