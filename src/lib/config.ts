let platform = process.platform

let config: any = {
  browsers: [
    // Chrome
    {
      name: 'chrome',
      standardName: platform === 'win32' ? 'chrome' : (platform === 'darwin' ? 'google chrome' : 'google-chrome')
    },
    // Firefox
    {
      name: 'firefox',
      standardName: 'firefox'
    },
    // Opera
    {
      name: 'opera',
      standardName: 'opera'
    }
  ]
}

if (platform === 'win32') {
  config.browsers.push({
    // IE
    name: 'ie',
    standardName: 'iexplore'
  })
} else if (platform === 'darwin') {
  config.browsers.push({
    name: 'safari',
    standardName: 'safari'
  })
}

export default config
