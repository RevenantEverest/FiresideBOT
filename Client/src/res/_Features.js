import _Images from "../assets/images/_Images";

const _Features = [
    {
        title: "Twitch and YouTube Trackers",
        iconName: "crosshairs",
        description: `
            The Tracker system allows users to specify a Twitch Streamer or YouTube 
            channel and will post an embed when they go live! Users can also specify 
            a specific channel for the embeds to be posted in as well as a role to 
            tag and custom flavor text!
        `,
        images: [_Images.features.trackersPost]
    },
    {
        title: "Economy",
        iconName: "coins",
        description: `
            The Currency and Economy system allows server members to gain currency 
            for server activeness. The name and rate at which members get currency 
            is customizeable through commands as well. \n\n
            There are a couple casino type games to use the currency on like Black Jack 
            and standard gambling.
        `,
        images: [_Images.features.economyTwo]
    },
    {
        title: "Ranks",
        iconName: "award",
        description: `
            Ranks allow server members to level up in their server based on their activity, 
            similar to the Economy system. Server admins have control over creating new 
            ranks and determining the amount of EXP a member gets per message as well as 
            how hard it is for members to rank up.\n\n
            See how you compare against your friends!
        `,
        images: [_Images.features.ranksTwo]
    },
    {
        title: "Auto Role",
        iconName: "robot",
        description: `
            Auto Role is the simpilest feature to explain! It allows server admins to assign 
            a role to be given to new server members.
        `,
        images: [_Images.features.autoRole]
    },
    {
        title: "Custom Commands",
        iconName: "magic",
        description: `
            Custom Commands allow server members to create fun new server specific commands. 
            The custom command system uses "variables" which allow command creators the ability 
            to add functionality to a command. Below are a list of the current variables, 
            what they do and an example of how to use them. Variables will always be contained 
            within the syntax \${} for example having the touser variable look like \${touser}.
        `,
        images: [_Images.features.customCommands]
    },
    {
        title: "Role Reactions",
        iconName: "user-tag",
        description: `
            Role Reactions allow server admins to set a role to be posted to an embed by Fireside and 
            tracked for reactions. When reacted to, the server members gains that role and if they 
            unreact that role is removed.\n\n
            Useful to big servers that want new members to acknowledge a #rules channel before gaining 
            access to the rest of the server.\n\n
            Or for MMO communities that want to know what role is preferred by each member (Tank, DPS, Healer).
        `,
        images: [_Images.features.roleReactionsPost]
    },
    {
        title: "Welcome Message",
        iconName: "hand-sparkles",
        description: `
            The Welcome Message feature allows you to send a DM to a new server member. Use this feature if you 
            want to thank new members for joining and/or help them navigate the server!
        `,
        images: [_Images.features.welcomeMessage]
    },
    {
        title: "Music",
        iconName: "music",
        description: `
            The music functionality of Fireside is by far the most extensive. Taking what's already offered by a 
            multitude of Discord Bots and expanding on it.\n\n
            Fireside offer playlists that are user specific and server specific. Users can use their playlist in 
            any server that uses Fireside and server admins can define playlists available for use by members 
            in their server.\n\n
            Like a song that's currently playing and want to quickly save it for later? Click on the heart reaction 
            on the current song embed and save the song to your default "Liked Songs" playlist!
        `,
        images: [_Images.features.music]
    },
];

export default _Features;