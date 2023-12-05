import { calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice, calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice, convertSubunitsToUnits, convertUnitsToSubunits} from '../src/girl-math.js'
import { expect } from 'chai'

describe('math-helpers', () => {
  it('calculate-amount-usd-to-btc-with-payout-currency-spot-price', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice('USD', 'BTC', 100_00, '0.0000325291')
    expect(targetMoney).to.equal(325291n)
  })

  it('calculate-amount-btc-to-usd-payout-currency-spot-price', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice('BTC', 'USD', 325291, '30,741.70')
    expect(targetMoney).to.equal(99_99n)
  })

  it('calculate-amount-btc-to-kes-payout-currency-spot-price', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice('BTC', 'KES', 2500, '4560829.07955')
    expect(targetMoney).to.equal(11402n)
  })

  it('calculate-amount-usd-to-btc-with-payin-currency-spot-price', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice('USD', 'BTC', 100_00, '30,741.70')
    expect(targetMoney).to.equal(325291n)
    targetMoney = calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice('USD', 'BTC', 100_00, '30,741.70')
    expect(targetMoney).to.equal(325291n)
  })

  it('calculate-amount-btc-to-usd-with-payin-currency-spot-price', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice('BTC', 'USD', 325291, '0.0000325291')
    expect(targetMoney).to.equal(100_00n)
    targetMoney = calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice('BTC', 'USD', 325291, '0.0000325291')
    expect(targetMoney).to.equal(100_00n)
  })

  it('calculate-amount-btc-to-kes-with-payin-currency-spot-price', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice('BTC', 'KES', 2500, '0.000000219258381')
    expect(targetMoney).to.equal(11402n)
    targetMoney = calculatePayoutAmountSubunitsWithPayinCurrencySpotPrice('BTC', 'KES', 2500, '0.000000219258381')
    expect(targetMoney).to.equal(11402n)
  })

  it('calculate-amount-btc-no-comma', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice('USD', 'BTC', 100_00, '0.00134825401')
    expect(targetMoney).to.equal(13482540n)
  })

  it('calculate-amount-btc-no-decimals-no-commas', async () => {
    let targetMoney = calculatePayoutAmountSubunitsWithPayoutCurrencySpotPrice('USD', 'BTC', 100_00, '0.00003252984')
    expect(targetMoney).to.equal(325298n)
  })

  it('convert-us-cents-to-whole-dollars', async () => {
    const wholeDollars = convertSubunitsToUnits(200_00, 'USD')
    expect(wholeDollars).to.equal('200.00')
  })

  it('convert-us-cents-to-dollars', async () => {
    const wholeDollars = convertSubunitsToUnits(123_11, 'USD')
    expect(wholeDollars).to.equal('123.11')
  })

  it('convert-btc-satoshis-to-whole-btc', async () => {
    const wholeDollars = convertSubunitsToUnits(100000000, 'BTC')
    expect(wholeDollars).to.equal('1.00000000')
  })

  it('convert-btc-satoshis-to-btc', async () => {
    const wholeDollars = convertSubunitsToUnits(123456789, 'BTC')
    expect(wholeDollars).to.equal('1.23456789')
  })

  it('convert-btc-satoshis-to-btc-under-1', async () => {
    const wholeDollars = convertSubunitsToUnits(506379, 'BTC')
    expect(wholeDollars).to.equal('0.00506379')
  })

  it('convert-dollars-to-cents', async () => {
    const cents = convertUnitsToSubunits('1.23', 'USD')
    expect(cents).to.equal('123')
  })

  it('convert-dollars-to-cents-missing-decimals', async () => {
    const cents = convertUnitsToSubunits('1.2', 'USD')
    expect(cents).to.equal('120')
  })

  it('convert-dollars-to-cents-no-decimal', async () => {
    const cents = convertUnitsToSubunits('1', 'USD')
    expect(cents).to.equal('100')
  })

  it('convert-btc-dollars-to-cents', async () => {
    const cents = convertUnitsToSubunits('1.23456789', 'BTC')
    expect(cents).to.equal('123456789')
  })

  it('convert-btc-dollars-to-cents-missing-decimals', async () => {
    const cents = convertUnitsToSubunits('1.234', 'BTC')
    expect(cents).to.equal('123400000')
  })

  it('convert-btc-dollars-to-cents-no-decimal', async () => {
    const cents = convertUnitsToSubunits('1', 'BTC')
    expect(cents).to.equal('100000000')
  })

  it('convert-btc-dollars-to-cents-leading-zeroes', async () => {
    const cents = convertUnitsToSubunits('0.00506379', 'BTC')
    expect(cents).to.equal('506379')
  })

  it('convert-btc-dollars-to-cents-leading-lakaljfsli', async () => {
    const cents = convertUnitsToSubunits('10.00506379', 'BTC')
    expect(cents).to.equal('1000506379')
  })

  it('convert-btc-dollars-to-cents-leading-zeroes-trailing-zeroes', async () => {
    const cents = convertUnitsToSubunits('0.0050637', 'BTC')
    expect(cents).to.equal('506370')
  })

  it('convert-btc-dollars-to-cents-leading-zeroes-trailing-zeroes-no-major', async () => {
    const cents = convertUnitsToSubunits('.0050637', 'BTC')
    expect(cents).to.equal('506370')
  })

  it('test-usdc-cents-to-dollars', async () => {
    const cents = convertUnitsToSubunits('0.25', 'USDC')
    expect(cents).to.equal('250000')
  })
})