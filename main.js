const GoogleHomePlayer = require("google-home-player");

const ip = "192.168.10.102"; // Google Home / Google NestのIPアドレスを入力
const lang = "ja";

const googleHome = new GoogleHomePlayer(ip, lang);

(async () => {
  await googleHome.say("すみません。よくわかりました。");
  //   await googleHome.say("jigokuniotiro", "en"); // 第二引数で言語を指定
  //   await googleHome.say("final text", "en", true); // 第三引数でslowの有効/無効を指定
})();
