import API from "./api.js";
import registerSettings from "./settings.js";
import Socket from "./socket.js";
import SettingsShim from "./applications/settings/settings-app.js";

Hooks.once("init", async () => {
  registerSettings();
  game.itempiles = API;
  window.ItemPiles = {
    API
  };
});

Hooks.once("ready", () => {
  Socket.initialize();
  new SettingsShim().render(true);
})

Hooks.on("reset-item-pile-settings", async () => {
  for (let setting of game.settings.storage.get("world").filter(setting => setting.data.key.includes('item-piles'))) {
    await setting.delete();
  }
})