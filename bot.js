import { Configuration, OpenAIApi } from "openai"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const TelegramBot = require("node-telegram-bot-api")
const dotenv = require("dotenv")

dotenv.config()
const token = "6775484303:AAEs5rUo0f-hJHv8MimDno-t2KzN_aaEjYw"
const configuration = new Configuration({
  apiKey: "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",
})
const openai = new OpenAIApi(configuration)
const bot = new TelegramBot(token, { polling: true })

async function generateImage(prompt) {
  return await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  })
}

// Matches "/echo [whatever]"
bot.onText(/\/image (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, "Your image is being generated. Please wait.")
  const response = await generateImage(match[1])
  bot.sendPhoto(chatId, response.data.data[0].url, { caption: match[1] })
})
