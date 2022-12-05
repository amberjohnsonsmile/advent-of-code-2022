const fs = require('fs')
const readline = require('readline')

async function findMostCalories(path) {
  const rl = await getFileReader(path)
  let current = 0
  let mostCalories = 0

  for await (const line of rl) {
    if (line === '') {
      if (current > mostCalories) {
        mostCalories = current     
      }
      current = 0
    } else {
      current += Number(line)
    }
  }

  console.log(`Found mostCalories: ${mostCalories}`)
  return mostCalories
}

async function getFileReader(path) {
  const fileStream = fs.createReadStream(path)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  return rl
}

// findMostCalories('01-input.txt')

async function findTopThree(path) {
  const rl = await getFileReader(path)
  const caloriesList = []
  let i = 0

  for await (const line of rl) {
    if (line === '') {
      i++
    } else if (caloriesList[i] === undefined) {
      caloriesList[i] = Number(line)
    } else {
      caloriesList[i] += Number(line)
    }
  }

  const sortedList = caloriesList.sort((a, b) => b - a);
  console.log(`top three: ${sortedList.slice(0,3)}`)

  const calories = sortedList[0] + sortedList[1] + sortedList[2]
  console.log(`calories: ${calories}`)
}

findTopThree('01-input.txt')
