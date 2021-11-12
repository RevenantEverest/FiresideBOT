import { MDBIcon } from 'mdbreact';
import { FirBtn } from '../../Common';
const services = {};

services.generateTableData = (theme) => {
    const icons = {
        check: <MDBIcon icon="check" style={{ color: "lime" }} />,
        times: <MDBIcon icon="times" style={{ color: theme.colors.text }} />
    };
    
    const purchaseButton = (
        <FirBtn className="font-weight-bold" rounded size="sm">
            Purcahse
        </FirBtn>
    );

    const columns = [
        { label: "Feature", field: "feature", sort: "" },
        { label: "User", field: "user", sort: "" },
        { label: "Server", field: "server", sort: "" },
        { label: "User & Server", field: "user_server", sort: "" },
    ];
    
    const rows = [
        {
            feature: "Unlimited Song Request Length",
            user: icons.check,
            server: icons.times,
            user_server: icons.check
        },
        {
            feature: "Unlimited Playlists",
            user: icons.check,
            server: icons.times,
            user_server: icons.check
        },
        {
            feature: "Unlimited Song Length for Playlists",
            user: icons.check,
            server: icons.times,
            user_server: icons.check
        },
        {
            feature: "Double Embers in each Daily command",
            user: icons.check,
            server: icons.times,
            user_server: icons.check
        },
        {
            feature: "Spotify Imports / Requests",
            user: icons.check,
            server: icons.times,
            user_server: icons.check
        },
        {
            feature: "Unlimited Server Playlists",
            user: icons.times,
            server: icons.check,
            user_server: icons.check
        },
        {
            feature: "Unlimited Song Length for Server Playlists",
            user: icons.times,
            server: icons.check,
            user_server: icons.check
        },
        {
            feature: "Unlimited Server Ranks",
            user: icons.times,
            server: icons.check,
            user_server: icons.check
        },
        {
            feature: "Unlimited Custom Commands",
            user: icons.times,
            server: icons.check,
            user_server: icons.check
        },
        {
            feature: "",
            user: purchaseButton,
            server: purchaseButton,
            user_server: purchaseButton
        },
    ];

    return { rows, columns };
}; 

export default services;