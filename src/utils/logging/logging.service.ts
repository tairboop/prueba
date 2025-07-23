import { Logger } from '@nestjs/common'

export const logLogo = (logger: Logger, port: number, host: string) => {
  const projectName = process.env.PROJECT_NAME || 'Backend'
  const logo: string = `
           _          __________                              _,
       _.-(_)._     ."          ".      .--""--.          _.-{__}-._
     .'________'.   | .--------. |    .'        '.      .:-'\`____\`'-:.         
    [____________] /\` |________| \`\\  /   .'\`\`'.    \    /_.-"\`_  _\`"-._\\
    /  / .\\/. \\  \\|  / / .\\/. \\ \\  ||  .'/.\\/.\\'.  |  /\`   / .\\/. \\   \`\\
    |  \\__/\\__/  |\\_/  \\__/\\__/  \\_/|  : |_/\\_| ;  |  |    \\__/\\__/    |
    \\            /  \\            /   \\ '.\\    /.' / .-\\                /-.
    /'._  --  _.'\\  /'._  --  _.'\\   /'. \`'--'\` .'\\/   '._-.__--__.-_.'   \\
   /_   \`""""\`   _\\/_   \`""""\`   _\\ /_  \`-./\\.-'  _\\'.    \`""""""""\`    .'\`\\
  (__/    '|    \\ _)_|           |_)_/            \\__)|        '       |   |
    |_____'|_____|   \\__________/   |              | \`_________'________\`;-'
     '----------'    '----------'   '--------------'\`--------------------\
  `

  logger.debug(logo)
  logger.debug(`Project: ${projectName}`)
  logger.debug(`🚀 App is running on http://${host}:${port}`)
  logger.debug(`📄 Swagger Api is running on http://${host}:${port}/api`)
  logger.debug(`⚙️ Swagger Json Api http://${host}:${port}/api-json`)
}
