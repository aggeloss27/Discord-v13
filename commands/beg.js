const profileModel = require("../models/profileSchema");
const {MessageEmbed, MessageActionRow} = require('discord.js')
module.exports = {
    name: "beg",
    permissions: [],
    aliases: [],
    cooldown: 25,
    category: 'economy',
    description: {
        usage: '.beg',
        content: "Beg for money",
        examples: '.beg'
    },
    async execute(client, message, args, Discord, profileData) {
        
        let CHANCE = Math.random()
        const FamousList = [
            "Miley Cyrus",
            "Kim Kardashian",
            "Kayne West",
            "Margaret Thatcher",
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
            "Eddie Brock"
        ]

        const random = FamousList[Math.floor(Math.random() * FamousList.length)];
        if (CHANCE >= 0.20) {
            const r = Math.floor(Math.random() * 500) + 1;
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    coins: r,
                },
            });
            //console.log(CHANCE)
            let em = new MessageEmbed()
            .setTitle("Beg Command")
            .setDescription(`**${random}** gave **${message.author.username}** ${r} $`)
            .setColor('#3262da')
            .setFooter("If you find the easter egg dm the owner")
            return message.reply({embeds: [em]});
        } else {
            //console.log(CHANCE)
            return message.reply({content:`**${message.author.username}** begged but nothing happened`});
        }

    },
};