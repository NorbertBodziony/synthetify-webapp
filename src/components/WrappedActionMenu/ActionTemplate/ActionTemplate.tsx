import React, { useEffect, useState } from 'react'
import { Divider, Grid } from '@material-ui/core'
import AmountInputWithLabel from '@components/Input/AmountInputWithLabel'
import MaxButton from '@components/MaxButton/MaxButton'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { capitalizeString, printBN, stringToMinDecimalBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import useStyles from './style'

export type ActionType = 'mint' | 'deposit' | 'withdraw' | 'burn'

export interface IProps {
  action: ActionType
  maxAvailable: BN
  maxDecimal: number
  onClick: (amount: BN, decimals: number) => () => void
  currency: string
  sending: boolean
  hasError: boolean
}

export const ActionTemplate: React.FC<IProps> = ({
  action,
  maxAvailable,
  maxDecimal,
  onClick,
  currency,
  sending,
  hasError
}) => {
  const classes = useStyles()
  const [amountBN, setAmountBN] = useState(new BN(0))
  const [decimal, setDecimal] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [actionAvailable, setActionAvailable] = useState(false)
  const [amountInputTouched, setTAmountInputTouched] = useState(false)
  const [showOperationProgressFinale, setShowOperationProgressFinale] = useState(false)

  useEffect(() => {
    setActionAvailable(checkActionIsAvailable())
  }, [amountBN, decimal, maxAvailable, maxDecimal])

  useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
  }, [sending])

  useEffect(() => {
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }
  }, [amountBN])

  const checkActionIsAvailable = () => {
    if (decimal > maxDecimal) {
      return false
    }
    const decimalDiff = maxDecimal - decimal
    const isLessThanMaxAmount = amountBN.mul(new BN(10).pow(new BN(decimalDiff))).lte(maxAvailable)
    return !amountBN.eqn(0) && isLessThanMaxAmount
  }

  const onMaxButtonClick = () => {
    setAmountBN(maxAvailable)
    setDecimal(maxDecimal)
    setInputValue(printBN(maxAvailable, maxDecimal))
  }

  const onAmountInputChange = (value: string) => {
    const { BN, decimal } = stringToMinDecimalBN(value)
    setAmountBN(BN)
    setDecimal(decimal)
    setInputValue(value)
    if (!amountInputTouched) {
      setTAmountInputTouched(true)
    }
  }

  const checkAmountInputError = () => {
    return !amountInputTouched || actionAvailable
  }

  const getProgressState = () => {
    if (sending) {
      return 'progress'
    }

    if (showOperationProgressFinale && hasError) {
      return 'failed'
    }

    if (showOperationProgressFinale && !hasError) {
      return 'success'
    }

    if (!checkAmountInputError()) {
      return 'failed'
    }

    return 'none'
  }

  const getProgressMessage = () => {
    const actionToNoun: { [key in ActionType]: string } = {
      mint: 'Minting',
      withdraw: 'Withdrawing',
      burn: 'Burning',
      deposit: 'Depositing'
    }

    if (sending) {
      return `${actionToNoun[action]} in progress`
    }

    if (showOperationProgressFinale && hasError) {
      return `${actionToNoun[action]} failed`
    }

    const actionToPastNoun: { [key in ActionType]: string } = {
      mint: 'minted',
      withdraw: 'withdrawn',
      burn: 'burned',
      deposit: 'deposited'
    }

    if (showOperationProgressFinale && !hasError) {
      return `Successfully ${actionToPastNoun[action]}`
    }

    if (!checkAmountInputError()) {
      return 'Incorrect value!'
    }

    return ''
  }

  return (
    <Grid
      container
      alignItems='flex-start'
      direction='column'
      className={classes.root}>
      <Grid container item className={classes.wrap}>
        <Grid item>
          <AmountInputWithLabel
            value={inputValue}
            setValue={onAmountInputChange}
            className={classes.amountInput}
            placeholder={'0.0'}
            currency={currency}
          />
        </Grid>
        <Grid
          item
          container
          direction='row'
          alignItems='flex-end'
          wrap='nowrap'
          className={classes.secondHalf}>
          <Grid className={classes.xsItemCenter} item>
            <MaxButton onClick={onMaxButtonClick} />
          </Grid>
          <Grid item>
            <Divider orientation='vertical' className={classes.divider} />
          </Grid>
          <Grid item className={classes.available}>
            <KeyValue
              keyName={`Available to ${action}`}
              keyClassName={classes.xsTextAlignCenter}
              valueClassName={classes.xsTextAlignCenter}
              value={maxAvailable}
              decimal={maxDecimal}
              unit={currency}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container alignItems='center' wrap='nowrap' direction='row' justifyContent='flex-start'>
        <Grid item style={{ marginRight: 18 }}>
          <OutlinedButton
            name={capitalizeString(action)}
            disabled={!actionAvailable}
            color='secondary'
            className={classes.actionButton}
            onClick={onClick(amountBN, decimal)}
          />
        </Grid>
        <Grid className={classes.progress} item>
          <Progress state={getProgressState()} message={getProgressMessage()} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ActionTemplate
