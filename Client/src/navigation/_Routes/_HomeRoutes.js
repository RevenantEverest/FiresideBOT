import { MDBIcon } from "mdbreact";

const _HomeRoutes = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Getting Started",
        path: "/getting_started"
    },
    {
        title: "Features",
        path: "/features"
    },
    {
        title: "Commands",
        path: "/commands"
    },
    {
        title: "Premium",
        icon: (props) => <MDBIcon icon="crown" {...props} />,
        path: "/premium"
    },
];

export default _HomeRoutes;