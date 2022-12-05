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

async function getRucksackTotal(path) {
  const rl = await getFileReader(path)
  let total = 0

  for await (const line of rl) {
    const middle = line.length / 2

    const first = line.slice(0, middle)
    const second = line.slice(middle, line.length)

    const commonChar = getCommonChar(first, second)

    total += priorityMap[commonChar]
  }

  console.log(`total: ${total}`)
  return total
}

function getCommonChar(first, second) {
  for (char of first) {
    if (second.includes(char)) {
      return char
    }
  }
}

const priorityMap = {
  'a': 1,
  'b': 2,
  'c': 3,
  'd': 4,
  'e': 5,
  'f': 6,
  'g': 7,
  'h': 8,
  'i': 9,
  'j': 10,
  'k': 11,
  'l': 12,
  'm': 13,
  'n': 14,
  'o': 15,
  'p': 16,
  'q': 17,
  'r': 18,
  's': 19,
  't': 20,
  'u': 21,
  'v': 22,
  'w': 23,
  'x': 24,
  'y': 25,
  'z': 26,
  'A': 27,
  'B': 28,
  'C': 29,
  'D': 30,
  'E': 31,
  'F': 32,
  'G': 33,
  'H': 34,
  'I': 35,
  'J': 36,
  'K': 37,
  'L': 38,
  'M': 39,
  'N': 40,
  'O': 41,
  'P': 42,
  'Q': 43,
  'R': 44,
  'S': 45,
  'T': 46,
  'U': 47,
  'V': 48,
  'W': 49,
  'X': 50,
  'Y': 51,
  'Z': 52,
}

// getRucksackTotal('03-input.txt')

async function getBadgeTotal(path) {
  const rl = await getFileReader(path)
  let total = 0

  // Break into groups of three
  const groupList = []
  let counter = 0
  let i = 0

  // For the first item, create a new list and append it
  // For the seocnd item, append it
  // For the third item, append it and increment i

  for await (const line of rl) {
    if (counter % 3 == 0) {
      groupList[i] = [ line ]
    } else {
      groupList[i].push(line)
      if (counter % 3 == 2) i++
    }
    counter++
  }

  // Find the common character between all three
  for (group of groupList) {
    const commonChar = getMultiCommonChar(group[0], group[1], group[2])
    total += priorityMap[commonChar]
  }

  console.log(`total: ${total}`)
  return total
}

function getMultiCommonChar(first, second, third) {
  for (char of first) {
    if (second.includes(char) && third.includes(char)) {
      return char
    }
  }
}

// getBadgeTotal('03-test-input.txt')
getBadgeTotal('03-input.txt')
