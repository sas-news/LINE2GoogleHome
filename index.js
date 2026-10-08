// インポート
import "dotenv/config";
import express from "express";
import { Client, middleware } from "@line/bot-sdk";
import GoogleHomePlayer from "google-home-player";
import isUrl from "is-url";

// 初期設定
const ip = "192.168.10.102"; // GoogleHomeのIPアドレス
const lang = "ja";
const googleHome = new GoogleHomePlayer(ip, lang);

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
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});
app.listen(PORT);

// オウム返し
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return;
  }
  let SendMessage = event.message.text;
  const isPlay = isUrl(SendMessage);
  (isPlay ? googleHome.play(SendMessage) : googleHome.say(SendMessage))
    .then(() => console.log(isPlay ? "Play" : "Say"))
    .catch((err) => console.error("GoogleHomeへの送信に失敗しました:", err));
  // return client.replyMessage(event.replyToken, {
  //   type: "text",
  //   text: "Say",
  // });
}
