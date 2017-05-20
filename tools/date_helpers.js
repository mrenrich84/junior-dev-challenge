function getNextMonday (date) {
  const wantedWeekDay = 1 // Monday
  const wantedHourBST = 9

  const clonedDate = new Date (date.getFullYear(), date.getMonth(), date.getDate(), wantedHourBST)
  const daysTillWanted = (wantedWeekDay + 7 - clonedDate.getDay()) % 7
  const nextMonday = new Date(clonedDate.getTime() + daysTillWanted * 24*60*60*1000)

  return parseInt(nextMonday.getTime() / 1000)
}

module.exports = { getNextMonday }
