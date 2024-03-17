import express from "express";
import { Client, middleware } from "@line/bot-sdk";
import HomePlayer from "google-home-player";

// 初期設定
const ip = "192.168.10.107"; // GoogleHomeのIPアドレス
const lang = "ja";
const Home = new HomePlayer(ip, lang);

// トークン
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken:
    process.env.CHANNEL_ACCESS_TOKEN,
};
const client = new Client(config);

// Webhook
const PORT = process.env.PORT || 3000;
const app = express();
app.post("/", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});
app.listen(PORT);

// 読み上げ
function handleEvent(event) {
  if (event.message.type === "audio") {
    // 音声メッセージを処理するコードをここに記述
    const audioUrl = event.message.id;
    console.log(audioUrl);
    // audioMessageを適切に処理することができます
  } else {
    const imageUrl = event.message.contentProvider.originalContentUrl;
    console.log(imageUrl);
  }
}
