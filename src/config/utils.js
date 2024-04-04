export const utils = {
  handleStarStatus: (status, cleanrate) => {
    const _cleanrate = parseFloat(cleanrate) * 100;
    if (!status) {
      return "1"
    } else if (_cleanrate >= 0 && _cleanrate < 50) {
      return '3'
    } else if (_cleanrate >= 50 || _cleanrate <= 100) {
      return "2"
    } else {
      return "2"
    }
  }
}