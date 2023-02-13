module.exports = async (Discord, client, member) => {
    console.log("[CLIENT] Bot is online!")
    client.user.setStatus("dnd")
}