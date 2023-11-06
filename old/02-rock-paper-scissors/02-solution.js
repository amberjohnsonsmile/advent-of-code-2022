const fs = require('fs')
const readline = require('readline')

async function getFileReader(path) {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  return rl
}

async function getTotalScore(path, scoreMap) {
  let totalScore = 0

  const rl = await getFileReader(path)
  for await (const line of rl) {
    totalScore += scoreMap[line]
  }

  console.log(`total score: ${totalScore}`)
  return totalScore
}

const scoreMapByMove = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
}

const scoreMapByOutcome = {
  'A X': 3,
  'A Y': 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7,
}

getTotalScore('02-input.txt', scoreMapByMove)
getTotalScore('02-input.txt', scoreMapByOutcome)
