function timeWord(timeStr) {
  const hourNumber = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
  ];
  const minuteWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  const tensWords = ["twenty", "thirty", "forty", "fifty"];

  const [hourStr, minuteStr] = timeStr.split(":");

  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  if (hours === 0 && minutes === 0) {
    return `Midnight`;
  } else if (hours === 12 && minutes === 0) {
    return `Noon`;
  }
  let timePeriod = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12;
  let hoursInWords = hourNumber[hours - 1];

  let minutesInWords = "";

  if (minutes === 0) {
    minutesInWords = "o'clock";
  } else if (minutes < 10) {
    minutesInWords += `oh ${minuteWords[minutes - 1]}`;
  } else if (minutes >= 10 && minutes < 20) {
    minutesInWords = minuteWords[minutes - 1];
  } else {
    let tens = Math.floor(minutes / 10) - 2;
    let ones = minutes % 10;

    minutesInWords = tensWords[tens];

    if (ones > 0) {
      minutesInWords += ` ${minuteWords[ones - 1]}`;
    }
  }

  return `${hoursInWords} ${minutesInWords} ${timePeriod}`;
}

// console.log(timeWord("12:02"));

module.exports = { timeWord };
