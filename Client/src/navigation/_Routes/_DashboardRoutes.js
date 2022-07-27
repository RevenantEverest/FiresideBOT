import { MDBIcon } from "mdbreact";
import {
    DashboardContainer,
    CustomCommandsContainer,
    AnalyticsContainer,
    RanksContainer,
    AutoDJContainer,
    PlaylistsContainer,
    EconomyContainer,
    ModerationContainer,
    TrackersContainer,
    ServerSettingsContainer
} from '../../containers';

const _DashboardRoutes = [
    {
        title: "Dashboard",
        icon: (props) => <MDBIcon icon="tachometer-alt" {...props} />,
        path: "/dashboard",
        component: DashboardContainer,
        displayNav: true
    },
    {
        title: "Custom Commands",
        icon: (props) => <MDBIcon icon="magic" {...props} />,
        path: "/custom_commands",
        component: CustomCommandsContainer,
        displayNav: true
    },
    {
        title: "Analytics",
        icon: (props) => <MDBIcon icon="chart-line" {...props} />,
        path: "/analytics",
        component: AnalyticsContainer,
        displayNav: true
    },
    {
        title: "Ranks",
        icon: (props) => <MDBIcon icon="award" {...props} />,
        path: "/ranks",
        component: RanksContainer,
        displayNav: true
    },
    {
        title: "Music",
        icon: "music",
        subRoutes: [
            { 
                title: "Auto DJ", 
                path: "/autodj",
                component: AutoDJContainer
            },
            { 
                title: "Playlists", 
                path: "/playlists",
                component: PlaylistsContainer
            }
        ],
        displayNav: true
    },
    {
        title: "Economy",
        icon: (props) => <MDBIcon icon="coins" {...props} />,
        path: "/economy",
        component: EconomyContainer,
        displayNav: true
    },
    {
        title: "Moderation",
        icon: (props) => <MDBIcon icon="bolt" {...props} />,
        path: "/moderation",
        component: ModerationContainer,
        displayNav: true
    },
    {
        title: "Trackers",
        icon: (props) => <MDBIcon icon="crosshairs" {...props} />,
        path: "/trackers",
        component: TrackersContainer,
        displayNav: true
    },
    {
        title: "Server Settings",
        icon: (props) => <MDBIcon icon="cogs" {...props} />,
        path: "/server/settings",
        component: ServerSettingsContainer,
        displayNav: true
    },
];

export default _DashboardRoutes;