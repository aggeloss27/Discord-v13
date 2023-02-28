const profileModel = require("../models/profileSchema");
const { MessageEmbed, MessageActionRow } = require("discord.js");
const inventory = require("../models/inventory");
module.exports = {
  name: "beg",
  permissions: [],
  aliases: [],
  cooldown: 25,
  category: "economy",
  description: {
    usage: ".beg",
    content: "Beg for money",
    examples: [".beg"],
  },
  async execute(client, message, args, Discord, profileData) {
    let CHANCE = Math.random();
    const FamousList = [
      "Tony Stark",
      "Gragramel",
      "Antman",
      "Wonder woman",
      "Reverse flash",
      "Deathstroke",
      "Hulk",
      "C. America",
      "Light",
      "Snik",
      "Toquel",
      "Rack",
      "FY",
      "NWA",
      "Loki",
      "Katerina Stikoudi",
      "Kyriakos Mhtsotakhs",
      "Kang",
      "Flash",
      "He who remains",
      "Oliver Queen",
      "Jenna Ortega",
      "Miley Cyrus",
      "Kim Kardashian",
      "Kayne West",
      "Margaret Thatcher",
      "Niko Euaggelato",
      "aggeloss27",
      "Trannos",
      "Akuros kinezos sto tik tok",
      "Scarlet Witch",
      "Vision",
      "Peter Parker",
      "Harry Poter",
      "Voldemort",
      "Anatoli",
      "MPAMPHS",
      "Kapoios akuros",
      "Someone",
      "Yuri gagarin",
      "Trump",
      "Chungus",
      "Dionysh (kontos)",
      "Stelio kontos",
      "Billie Eilish",
      "Masha",
      "Magia h 🐝",
      "Cardi B",
      "George Washington",
      "Ghandi",
      "Nelson Mandela",
      "Christopher Columbus",
      "Justin Beiber",
      "Lady Gaga",
      "Katy Perry",
      "Justin Timberlake",
      "Jay Leno",
      "David Letterman",
      "Elle McPherson",
      "Jennifer Aniston",
      "Donald Duck",
      "Pluto",
      "Goofy",
      "Johnny Depp",
      "Brittney Spears",
      "Paris Hilton",
      "Hugh Jackman",
      "Vladimir Putin",
      "Daniel Radcliffe",
      "David Beckham",
      "Madonna",
      "Eminem",
      "Harley Quinn",
      "Matt Damon",
      "Jack Nicholson",
      "Kevin Spacey",
      "Kylie Minogue",
      "Roger Federer",
      "Andrew Murray",
      "Serena Williams",
      "Brad Pitt",
      "Mickey Mouse",
      "Simon Cowell",
      "Ludwig Beethoven",
      "Warren Buffett",
      "Lewis Carroll",
      "Queen Elizabeth II",
      "Charles Darwin",
      "Albert Einstein",
      "Henry Ford",
      "Bill Gates",
      "Steve Jobs",
      "Vincent van Gogh",
      "Adolph Hitler",
      "Thomas Jefferson",
      "Stanley Kubrik",
      "Charles Lindbergh",
      "Courtney Love",
      "Kurt Cobain",
      "Michelangelo",
      "Amadeus Mozart",
      "Sir Isaac Newton",
      "George Orwell",
      "Andy Warhol",
      "Orson Welles",
      "Leonardo Da Vinci",
      "Walt Disney",
      "Abraham Lincoln",
      "William Shakespeare",
      "Martin Luther King",
      "John F Kennedy",
      "Princess Diana",
      "Mother Teresa",
      "Thomas Edison",
      "Benjamin Franklin",
      "Neil Armstrong",
      "Napoleon",
      "Elvis Presley",
      "Mohammad Ali",
      "Marilyn Monroe",
      "Pablo Picasso",
      "Charles Dickens",
      "Cleopatra",
      "John Lennon",
      "Michael Jordan",
      "Mark Twain",
      "Nicole Kidman",
      "Barack Obama",
      "Robert Pattison",
      "Hugh Heffner",
      "KJ Rowling",
      "Bill Clinton",
      "Elizabeth Taylor",
      "Tom Cruise",
      "Clint Eastwood",
      "Alfred Hitchcock",
      "Stephen Hawking",
      "Tom Hanks",
      "Oprah Winfrey",
      "Beyonce",
      "Hilary Clinton",
      "Dr Suess",
      "Ray Charles",
      "Sean Connery",
      "Julia Roberts",
      "Pele",
      "Meryl Streep",
      "Helen Keller",
      "Robin Williams",
      "Steve Martin",
      "Fred Astaire",
      "Whoopi Goldberg",
      "Jane Austen",
      "Bob Hope",
      "Jessica Simpson",
      "Frank Lloyd Wright",
      "Pamela Anderson",
      "Susan Boyle",
      "Mae West",
      "Snoopy",
      "Jim Carrey",
      "Michael J Fox",
      "Drake",
      "Phineas and Ferb",
      "Rihanna",
      "Eminem",
      "Dr. Phill",
      "Sia",
      "Default Jonsey",
      "Logic",
      "Dr. Dre",
      "NF",
      "Giwrgos Kotelos (Easter Egg)",
      "Eddie Brock",
    ];

    const random = FamousList[Math.floor(Math.random() * FamousList.length)];
    if (CHANCE >= 0.14) {
      let r = Math.floor(Math.random() * 500) + 1;
      let luckynameschance = Math.random()
      let luckyorangechance = Math.random()
      let em = new MessageEmbed().setColor("#5DC21E").setTitle("Beg Command");
      if (luckynameschance >= 0.7 && luckyorangechance <=0.79) {
        r = 500000;
        em.setDescription(
          `**💚 𝓖𝓻𝓮𝓮𝓷** gave **${message.author.username}** ${r} $`
        );
      } else if (luckyorangechance >= 0.8 && luckynameschance <= 0.69){
        r = 350000
        em.setDescription(`**🧡 𝕌𝕟𝕜𝕟𝕠𝕨𝕟 𝔻𝕒𝕣𝕜 𝕆𝕣𝕒𝕟𝕘𝕖** gave **${message.author.username}** ${r} $`)
      } else {
                em.setDescription(
          `**${random}** gave **${message.author.username}** ${r} $`
        );
      }
      const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: r,
          },
        }
      );
      //console.log(CHANCE)
        message.reply({ embeds: [em] });
        
        let itemChance = Math.random();
        if (itemChance >= 0.8) {
          inventory.findOne(
            { userID: message.author.id },
            async (err, data) => {
              if (data) {
                let itemList = ["Bread", "Water Bottle"];
                let randomItem =
                  itemList[
                    Math.floor(Math.random() * itemList.length)
                  ].toLowerCase();
                let specialitemchance = Math.random()
                if((r + 150000) == 500000 && specialitemchance >= 0.90) {
                  randomItem = 'dark venom'
                }
                const hasItem = Object.keys(data.Inventory).includes(
                  String(randomItem)
                );
                if (!hasItem) {
                  data.Inventory[randomItem] = 1;
                } else {
                  data.Inventory[randomItem]++;
                }
                await inventory.findOneAndUpdate(
                  { userID: message.author.id },
                  data
                );
                message.channel.send(`You also got some **${randomItem}**`);
              }
            }
          );
        }
        
      } else {
      //console.log(CHANCE)
      return message.reply({
        content: `**${message.author.username}** begged but nothing happened`,
      });
    } // 
  },
};
