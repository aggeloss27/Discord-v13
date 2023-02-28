module.exports = async (Discord, client, member) => {
  console.log("[CLIENT] Bot is online!");
  client.user.setStatus("online");
  client.user.setActivity(`τον Σωκράτη 👀`, { type: "WATCHING" });

  //
  //setInterval(() => {
  //  const generalChannel = client.channels.cache.find(
  //    (channel) => channel.name === "general"
  //  );
  //  if (generalChannel) {
  //    generalChannel.send("");
  //  }
  //}, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds
};
