module.exports = {
  data: {
    name: "ping",
    description: "Mostra o ping do bot"
  },
  run: async(bot, i)=> {
    i.reply(`Pong! Ping: ${bot.ws.ping}ms`)
  }
}