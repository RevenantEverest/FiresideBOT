import axios from 'axios';
import env from '../env';
const services = {};

/*

    Remember to update this for once new API is sent to PROD

*/

// services.getCommandLogs = () => {
//     return axios({
//         method: "GET",
//         url: `${env.TEST_API}/admin/logs/command`,
//         headers: { "Authorization": `Bearer ${window.localStorage.token}` }
//     });
// };

services.getCommandLogs = () => {
    return axios({
        method: "GET",
        url: `${env.TEST_API}/admin/commands/logs`,
        headers: { "Authorization": `Bearer ${window.localStorage.token}` }
    });
};



export default services;