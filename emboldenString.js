function embolden_substrings(s, arr) {
  let indexIntervals = []

  for (let i = 0; i < arr.length; i++) {
      let substr = arr[i]
      let substrIndex = 0;
      let startInterval

      for (let j = 0; j < s.length; j++) {
          if (s[j] === substr[substrIndex] && j - startInterval === substr.length - 1){
              indexIntervals.push([startInterval, j])
              substrIndex = 0;
          } else if (s[j] === substr[substrIndex]) {
              if (substrIndex === 0) {
                  startInterval = j
              }
              substrIndex++
          } else {
              substrIndex = 0;
          }
      }
  }


  let mergedIntervals = []
  while (true) {
      let length = (indexIntervals % 2 === 0) ? indexIntervals.length : indexIntervals.length - 1
      let foundNonUniqueInterval = false

      for (let i = 0; i < length; i += 2) {
          if (indexIntervals[i][1] >= indexIntervals[i+1][0]) {
              mergedIntervals.push([indexIntervals[i][0], indexIntervals[i+1][1]])
              foundNonUniqueInterval = true
          } else {
              mergedIntervals.push(indexIntervals[i], indexIntervals[i+1])
          }
      }

      if (indexIntervals.length % 2 !== 0) {
          mergedIntervals.push(indexIntervals[indexIntervals.length - 1])
      }


      if (!foundNonUniqueInterval) {
          break;
      }

      indexIntervals = mergedIntervals
      mergedIntervals = []
  }

  let output = s.split('')
  for (let i = 0, offset = 0; i < indexIntervals.length; i++, offset += 2) {
      let start = indexIntervals[i][0]
      let end = indexIntervals[i][1]

      output.splice(start + offset, 0, '<b>')
      output.splice(end + offset + 2, 0, '</b>')
  }

  return output.join('')

}

console.assert(embolden_substrings('abcxyz123', ['abc', 'bcxy', '23']) === '<b>abcxy</b>z1<b>23</b>')
console.assert(embolden_substrings('abcxyz123', ['abc', 'bcxyz1', '123']) === '<b>abcxyz123</b>')
console.assert(embolden_substrings('abcxyz123', ['abc', 'bcx', '123']) === '<b>abcx</b>yz<b>123</b>')