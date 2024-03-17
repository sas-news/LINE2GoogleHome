// インポート
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
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});
app.listen(PORT);

// オウム返し
function handleEvent(event) {
  let SendMessage = event.message.text;
  if (isUrl(SendMessage)) {
    googleHome.play(SendMessage);
    console.log("Play");
  } else {
    googleHome.say(SendMessage);
    console.log("Say");
  }
  // return client.replyMessage(event.replyToken, {
  //   type: "text",
  //   text: "Say",
  // });
}
