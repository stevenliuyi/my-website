import ifEmoji from 'if-emoji'

const data = {
  1: {
    1: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear()}!`],
    2: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear()}!`],
    3: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear()}!`],
    17: ['\ud83c\udf82', 'Tomorrow is my birthday!'],
    18: ['\ud83c\udf82', 'Today is my birthday!']
  },
  2: {
    2: ['\ud83d\udc3f', 'Happy Groundhog Day!'],
    14: ['\ud83c\udf39', 'Happy Valentine’s Day!'],
    15: ['\ud83c\udf39', 'Happy Valentine’s Day!'],
    16: ['\ud83c\udf39', 'Happy Valentine’s Day!']
  },
  3: {
    8: ['\ud83d\udc69', "Happy International Women's Day!"],
    14: ['\ud83e\udd67', 'Happy Pi Day!'],
    16: ['\u2618', "Happy St. Patrick's Day!"],
    17: ['\u2618', "Happy St. Patrick's Day!"],
    18: ['\u2618', "Happy St. Patrick's Day!"],
    22: ['\ud83d\udca7', 'Happy World Water Day!']
  },
  4: {
    22: ['\ud83c\udf0d', 'Happy Earth Day!']
  },
  6: {
    1: ['\ud83e\udd5b', 'Happy World Milk Day!'],
    8: ['\ud83c\udf0a', 'Happy World Oceans Day!'],
    18: ['\ud83c\udf63', 'Happy International Sushi Day!'],
    20: ['\ud83c\udfd6', 'Happy Summer Solistice!'],
    21: ['\ud83c\udfd6', 'Happy Summer Solistice!'],
    22: ['\ud83c\udfd6', 'Happy Summer Solistice!']
  },
  7: {
    7: ['\ud83c\udf6b', 'Happy World Chocolate Day!']
  },
  9: {
    21: ['\ud83d\udd4a', 'Happy International Day of Peace!']
  },
  10: {
    16: ['\ud83c\udf5a', 'Happy World Food Day!'],
    25: ['\ud83c\udf5d', 'Happy World Pasta Day!'],
    30: ['\ud83c\udf83', 'Happy Halloween!'],
    31: ['\ud83c\udf83', 'Happy Halloween!']
  },
  11: {
    1: ['\ud83c\udf83', 'Happy Halloween!']
  },
  12: {
    20: ['\u2603', 'Happy Winter Solstice!'],
    21: ['\u2603', 'Happy Winter Solstice!'],
    22: ['\u2603', 'Happy Winter Solstice!'],
    23: ['\ud83c\udf84', 'Merry Christmas!'],
    24: ['\ud83c\udf84', 'Merry Christmas!'],
    25: ['\ud83c\udf84', 'Merry Christmas!'],
    26: ['\ud83c\udf84', 'Merry Christmas!'],
    27: ['\ud83c\udf84', 'Merry Christmas!'],
    30: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear() + 1}!`],
    31: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear() + 1}!`]
  }
}

export const holidayEmoji = () => {
  let day = new Date()
  day.setDate(day.getDate() - 2)

  let emoji = ['', '']
  if (data[day.getMonth() + 1]) emoji = data[day.getMonth() + 1][day.getDate()]
  return emoji != null && ifEmoji(emoji[0]) ? emoji : ['', '']
}
