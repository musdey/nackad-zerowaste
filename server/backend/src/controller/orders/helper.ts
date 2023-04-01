import { IDepositItem } from '../../models/DepositItem'

type RexDepositType = {
  depositType: string
  amount: number
  pricePerItem: number
}

const rexEatDepositCalculator = (
  quantityString: string,
  smallGlasses: number,
  bigGlasses: number,
  postalCode: string
): RexDepositType[] => {
  const quantity = Number.parseInt(quantityString) // 13
  const total = smallGlasses + bigGlasses

  // No glasses set or other product
  if (smallGlasses < 0 || bigGlasses < 0 || total === 0) {
    return []
  }

  // One product
  if (quantity == 1 && total === 1) {
    if (smallGlasses === 1) {
      return [{ depositType: 'Rexglas Klein', amount: 1, pricePerItem: 100 }]
    } else {
      return [{ depositType: 'Rexglas Gross', amount: 1, pricePerItem: 200 }]
    }
  }

  // Whole box of products
  const totalOccupiedSpace = (bigGlasses + smallGlasses * 0.3) * quantity
  const totalOccupiedKartonSpace = (bigGlasses + smallGlasses * 0.5) * quantity

  let box

  if (totalOccupiedKartonSpace === 6) {
    if (postalCode === '1040' || postalCode === '1010') {
      box = { depositType: 'Holzkiste Klein', amount: 1, pricePerItem: 2500 }
    } else {
      box = { depositType: 'Karton', amount: 1, pricePerItem: 0 }
    }
  }
  if (totalOccupiedSpace >= 11 && totalOccupiedSpace <= 12) {
    box = { depositType: 'Holzkiste Gross', amount: quantity, pricePerItem: 2500 }
  }

  const result = [
    { depositType: 'Rexglas Gross', amount: bigGlasses * quantity, pricePerItem: 200 },
    { depositType: 'Rexglas Klein', amount: smallGlasses * quantity, pricePerItem: 100 }
  ]
  if (box) {
    result.unshift(box)
  }

  return result.filter((item) => item.amount !== 0)

  // if (totalOccupiedSpace <= 6) {
  //   if (postalCode === '1040' || postalCode === '1010') {
  //     result = [
  //       { depositType: 'Holzkiste Klein', amount: 1, pricePerItem: 2500 },
  //       { depositType: 'Rexglas Gross', amount: bigGlasses * quantity, pricePerItem: 200 },
  //       { depositType: 'Rexglas Klein', amount: smallGlasses * quantity, pricePerItem: 100 }
  //     ]
  //   } else {
  //     result = [
  //       { depositType: 'Karton', amount: 1, pricePerItem: 0 },
  //       { depositType: 'Rexglas Gross', amount: bigGlasses * quantity, pricePerItem: 200 },
  //       { depositType: 'Rexglas Klein', amount: smallGlasses * quantity, pricePerItem: 100 }
  //     ]
  //   }
  // } else if (totalOccupiedSpace > 6 && totalOccupiedSpace <= 12) {
  //   result = [
  //     { depositType: 'Holzkiste Gross', amount: 1, pricePerItem: 2500 },
  //     { depositType: 'Rexglas Gross', amount: bigGlasses * quantity, pricePerItem: 200 },
  //     { depositType: 'Rexglas Klein', amount: smallGlasses * quantity, pricePerItem: 100 }
  //   ]
  // } else {
  //   let numberOfBigBoxes = Math.floor(totalOccupiedSpace / 12)
  //   const numberOfRestBoxes = totalOccupiedSpace % 12
  //   if (numberOfRestBoxes > 6) {
  //     numberOfBigBoxes += 1
  //     result = [
  //       { depositType: 'Holzkiste Gross', amount: numberOfBigBoxes, pricePerItem: 2500 },
  //       { depositType: 'Rexglas Klein', amount: smallGlasses * quantity, pricePerItem: 100 },
  //       { depositType: 'Rexglas Gross', amount: bigGlasses * quantity, pricePerItem: 200 }
  //     ]
  //   } else {
  //     result = [
  //       { depositType: 'Holzkiste Gross', amount: numberOfBigBoxes, pricePerItem: 2500 },
  //       { depositType: 'Karton', amount: 1, pricePerItem: 2500 },
  //       { depositType: 'Rexglas Klein', amount: smallGlasses * quantity, pricePerItem: 100 },
  //       { depositType: 'Rexglas Gross', amount: bigGlasses * quantity, pricePerItem: 200 }
  //     ]
  //   }
  // }
  return result.filter((item) => item.amount !== 0)
}

const rexEatMissingBoxCalculator = (rexEatDeposit: IDepositItem[], postalCode: string) => {
  let bigGlasses = 0
  let smallGlasses = 0
  let smallBox = 0
  let bigBox = 0
  let karton = 0
  rexEatDeposit.forEach((item) => {
    if (item.type === 'Rexglas Gross') {
      bigGlasses += item.amount
    }
    if (item.type === 'Rexglas Klein') {
      smallGlasses += 0.5 * item.amount //0.5 in kartons and 0.3 in small boxes
    }
    if (item.type === 'Holzkiste Gross') {
      bigBox += item.amount
    }
    if (item.type === 'Holzkiste Klein') {
      smallBox += item.amount
    }
    if (item.type === 'Karton') {
      karton += item.amount
    }
  })

  const totalGlasses = smallGlasses + bigGlasses
  const restGlasses = totalGlasses - 12 * bigBox - 6 * smallBox - 6 * karton

  if (restGlasses <= 0) {
    return []
  }
  if (restGlasses <= 6) {
    // if not bigBox or not karton return karton
    if (postalCode === '1040' || postalCode === '1010') {
      return [{ depositType: 'Holzkiste Klein', amount: 1, pricePerItem: 2500 }]
    } else {
      return [{ depositType: 'Karton', amount: 1, pricePerItem: 0 }]
    }
  } else if (restGlasses > 6 && restGlasses <= 12) {
    return [{ depositType: 'Holzkiste Gross', amount: 1, pricePerItem: 2500 }]
  } else {
    let numberOfBigBoxes = Math.floor(restGlasses / 12)
    const numberOfRestBoxes = restGlasses % 12
    if (numberOfRestBoxes > 6) {
      numberOfBigBoxes += 1
      return [{ depositType: 'Holzkiste Gross', amount: numberOfBigBoxes, pricePerItem: 2500 }]
    } else {
      return [
        { depositType: 'Holzkiste Gross', amount: numberOfBigBoxes, pricePerItem: 2500 },
        { depositType: 'Karton', amount: 1, pricePerItem: 2500 }
      ]
    }
  }
}

export { rexEatDepositCalculator, rexEatMissingBoxCalculator }
