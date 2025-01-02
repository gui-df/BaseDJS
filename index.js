// Bibliotecas
const { Client } = require("discord.js")
const fs = require("fs")

// Carrega o .env
require("dotenv").config()

// Comandos
const commands = []
// Carrega os comandos
fs.readdirSync("./commands").forEach(n=>{
  let b = require("./commands/"+n)
  if("run" in b && "data" in b){
    commands.push(b)
  }
})
// Carrega o bot
const bot = new Client({ intents: 0 }) // na intents deixe 131071 se ativou todas as intents no https://discord.dev

bot.login(process.env.TOKEN) // Se conecta ao bot

// Evento de comandos
bot.on("interactionCreate", async i=>{
  if(i.isCommand() && commands.find(t=>t.data.name === i.commandName)){
    // Carrega o comando
    commands.find(t=>t.data.name === i.commandName).run(bot, i)
  }
})

// Evento de conexão
bot.on("ready", async() => {
  // Carrega os comandos
  await bot.application.commands.set(commands.map(t=>t.data))
  console.log("Se conectou em", bot.user.tag)
})