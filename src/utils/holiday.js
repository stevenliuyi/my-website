import ifEmoji from 'if-emoji'
import { solarToLunar } from 'lunar-calendar'

const data = {
  1: {
    1: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear()}!`],
    2: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear()}!`],
    3: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear()}!`],
    4: [
      '\ud83c\udf4e',
      "Today is Issac Newton's Birthday! (or Dec 25 under the Julian calendar)"
    ],
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
    22: ['\ud83c\udf0d', 'Happy Earth Day!'],
    25: ['\ud83e\uddec', 'Happy DNA Day!']
  },
  6: {
    1: ['\ud83e\udd5b', 'Happy World Milk Day!'],
    8: ['\ud83c\udf0a', 'Happy World Oceans Day!'],
    18: ['\ud83c\udf63', 'Happy International Sushi Day!'],
    20: [
      '\ud83c\udfd6',
      'Happy Summer Solstice! (or Winter Solstice for those who live in the Southern Hemisphere)'
    ],
    21: [
      '\ud83c\udfd6',
      'Happy Summer Solstice! (or Winter Solstice for those who live in the Southern Hemisphere)'
    ],
    22: [
      '\ud83c\udfd6',
      'Happy Summer Solstice! (or Winter Solstice for those who live in the Southern Hemisphere)'
    ]
  },
  7: {
    7: ['\ud83c\udf6b', 'Happy World Chocolate Day!']
  },
  9: {
    12: ['\ud83d\udcbb', "Happy International Programmers' Day!"],
    13: ['\ud83d\udcbb', "Happy International Programmers' Day!"],
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
    20: [
      '\u26c4',
      'Happy Winter Solstice! (or Summer Solstice for those who live in the Southern Hemisphere)'
    ],
    21: [
      '\u26c4',
      'Happy Winter Solstice! (or Summer Solstice for those who live in the Southern Hemisphere)'
    ],
    22: [
      '\u26c4',
      'Happy Winter Solstice! (or Summer Solstice for those who live in the Southern Hemisphere)'
    ],
    23: ['\ud83c\udf84', 'Merry Christmas!'],
    24: ['\ud83c\udf84', 'Merry Christmas!'],
    25: ['\ud83c\udf84', 'Merry Christmas!'],
    26: ['\ud83c\udf84', 'Merry Christmas!'],
    27: ['\ud83c\udf84', 'Merry Christmas!'],
    30: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear() + 1}!`],
    31: ['\ud83c\udf8a', `Happy New Year ${new Date().getFullYear() + 1}!`]
  }
}

const lunarData = {
  正月: {
    14: ['\ud83c\udfee', 'Happy Latern Festival!'],
    15: ['\ud83c\udfee', 'Happy Latern Festival!'],
    16: ['\ud83c\udfee', 'Happy Latern Festival!']
  },
  五月: {
    4: ['\ud83d\udc32', 'Happy Dragon Boat Festival!'],
    5: ['\ud83d\udc32', 'Happy Dragon Boat Festival!'],
    6: ['\ud83d\udc32', 'Happy Dragon Boat Festival!']
  },
  八月: {
    14: ['\ud83e\udd6e', 'Happy Mid-Autumn Festival!'],
    15: ['\ud83e\udd6e', 'Happy Mid-Autumn Festival!'],
    16: ['\ud83e\udd6e', 'Happy Mid-Autumn Festival!']
  },
  十二月: {
    10: ['\ud83c\udf82', 'Tomorrow is my lunar birthday!'],
    11: ['\ud83c\udf82', 'Today is my lunar birthday!']
  }
}

const zodiacEmoji = {
  鼠: ['\ud83d\udc00', 'Rat'],
  牛: ['\ud83d\udc02', 'Ox'],
  虎: ['\ud83d\udc05', 'Tigger'],
  兔: ['\ud83d\udc07', 'Rabbit'],
  龙: ['\ud83d\udc09', 'Dragon'],
  蛇: ['\ud83d\udc0d', 'Snake'],
  马: ['\ud83d\udc0e', 'Horse'],
  羊: ['\ud83d\udc11', 'Goat'],
  猴: ['\ud83d\udc12', 'Monkey'],
  鸡: ['\ud83d\udc13', 'Rooster'],
  狗: ['\ud83d\udc15', 'Dog'],
  猪: ['\ud83d\udc16', 'Pig']
}

export const holidayEmoji = () => {
  let day = new Date()
  day.setDate(day.getDate())

  let emoji = null
  if (data[day.getMonth() + 1]) emoji = data[day.getMonth() + 1][day.getDate()]
  if (emoji != null) return ifEmoji(emoji[0]) ? emoji : null

  // lunar calendar
  if (day.getFullYear() > 2100) return null
  let { lunarMonthName, lunarDay, zodiac } = solarToLunar(
    day.getFullYear(),
    day.getMonth() + 1,
    day.getDate()
  )
  if (lunarData[lunarMonthName])
    emoji = lunarData[lunarMonthName][Math.round(lunarDay).toString()]
  if (emoji != null) return ifEmoji(emoji[0]) ? emoji : null

  // lunar New Year
  if (lunarMonthName === '十二月' && [29, 30].includes(lunarDay)) {
    const newLunar = solarToLunar(
      day.getFullYear(),
      day.getMonth() + 1,
      day.getDate() + 2
    )
    lunarMonthName = newLunar.lunarMonthName
    lunarDay = newLunar.lunarDay
    zodiac = newLunar.zodiac
  }
  if (lunarMonthName === '正月' && [1, 2, 3, 4, 5, 6, 7].includes(lunarDay))
    emoji = [
      zodiacEmoji[zodiac][0],
      `Happy Lunar New Year of the ${zodiacEmoji[zodiac][1]}!`
    ]
  if (emoji != null) return ifEmoji(emoji[0]) ? emoji : null

  return null
}
