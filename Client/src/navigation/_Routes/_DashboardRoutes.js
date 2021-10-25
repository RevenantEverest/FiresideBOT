import { MDBIcon } from "mdbreact";

const _DashboardRoutes = [
    {
        title: "Dashboard",
        icon: (props) => <MDBIcon icon="tachometer-alt" {...props} />,
        path: "/dashboard"
    },
    {
        title: "Custom Commands",
        icon: (props) => <MDBIcon icon="magic" {...props} />,
        path: "/custom_commands"
    },
    {
        title: "Analytics",
        icon: (props) => <MDBIcon icon="chart-line" {...props} />,
        path: "/analytics"
    },
    {
        title: "Ranks",
        icon: (props) => <MDBIcon icon="award" {...props} />,
        path: "/ranks"
    },
    {
        title: "Music",
        icon: "music",
        subRoutes: [
            { title: "Auto DJ", path: "/autodj" },
            { title: "Playlists", path: "/playlists" }
        ]
    },
    {
        title: "Economy",
        icon: (props) => <MDBIcon icon="coins" {...props} />,
        path: "/economy"
    },
    {
        title: "Moderation",
        icon: (props) => <MDBIcon icon="bolt" {...props} />,
        path: "/moderation"
    },
    {
        title: "Trackers",
        icon: (props) => <MDBIcon icon="crosshairs" {...props} />,
        path: "/trackers"
    },
    {
        title: "Server Settings",
        icon: (props) => <MDBIcon icon="cogs" {...props} />,
        path: "/server/settings"
    },
];

export default _DashboardRoutes;