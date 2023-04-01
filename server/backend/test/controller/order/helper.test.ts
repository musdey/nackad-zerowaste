import { describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals'

import { rexEatDepositCalculator, rexEatMissingBoxCalculator } from '../../../src/controller/orders/helper'

// TODO: test rexEatMissingBoxCalculator

describe('Test rexeatDepositCalculator', () => {
  it('tests multiple orders of 13 times same produkt', async () => {
    const deposit = rexEatDepositCalculator('13', 0, 1, '')
    expect(deposit).toMatchSnapshot()
  })
  it('tests one bigGlass', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 1, '1020')
    expect(deposit).toMatchSnapshot()
  })
  it('tests two bigGlass', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 2, '1020')
    expect(deposit).toMatchSnapshot()
  })
  it('tests six bigGlass', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 6, '1020')
    expect(deposit).toMatchSnapshot()
  })
  it('tests seven bigGlass', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 7, '1020')
    expect(deposit).toMatchSnapshot()
  })
  it('tests 12 bigGlass', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 12, '1020')
    expect(deposit).toMatchSnapshot()
  })

  it('tests 13 bigGlass', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 13, '1020')
    expect(deposit).toMatchSnapshot()
  })

  it('tests negative values ', async () => {
    const deposit = rexEatDepositCalculator('1', -1, -2, '')
    expect(deposit).toMatchSnapshot()
  })
  it('tests six bigGlass in holzkiste', async () => {
    const deposit = rexEatDepositCalculator('1', 0, 6, '1010')
    expect(deposit).toMatchSnapshot()
  })

  it('test whole box product', async () => {
    const deposit = rexEatDepositCalculator('2', 2, 5, '1010')
    expect(deposit).toMatchSnapshot()
  })

  it('tests multiple orders of same produkt', async () => {
    const deposit = rexEatDepositCalculator('6', 0, 1, '1010')
    expect(deposit).toMatchSnapshot()
  })
})
