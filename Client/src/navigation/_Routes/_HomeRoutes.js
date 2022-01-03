import { MDBIcon } from "mdbreact";
import {
    ChangelogsContainer,
    CommandsContainer,
    FeaturesContainer,
    GettingStartedContainer,
    HomeContainer,
    LoginContainer,
    PremiumContainer
} from '../../containers';

const _HomeRoutes = [
    {
        title: "Home",
        path: "/",
        component: HomeContainer,
        displayNav: true
    },
    {
        title: "Getting Started",
        path: "/getting_started",
        component: GettingStartedContainer,
        displayNav: true
    },
    {
        title: "Features",
        path: "/features",
        component: FeaturesContainer,
        displayNav: true
    },
    {
        title: "Commands",
        path: "/commands",
        component: CommandsContainer,
        displayNav: true
    },
    {
        title: "Premium",
        icon: (props) => <MDBIcon icon="crown" {...props} />,
        path: "/premium",
        component: PremiumContainer,
        displayNav: true
    },
    {
        title: "Login",
        path: "/login",
        component: LoginContainer
    },
    {
        title: "Changelogs",
        path: "/changelogs",
        component: ChangelogsContainer
    },
];

export default _HomeRoutes;