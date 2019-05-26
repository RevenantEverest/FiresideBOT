import axios from 'axios';
import apiConfig from '../apiConfig';
const services = {};

services.getDefaultCommands = (data) => {
 return axios.get(`${apiConfig}/commands/default`)
};

services.getCustomCommands = (data) => {
  return axios.get(`${apiConfig}/commands/custom/user/${data}`);
};

services.addCommand = (data) => {
  return axios({
    method: 'POST',
    url: `${apiConfig}/commands/custom`,
    data: {
      user_id: data.user_id,
      command: data.command,
      output: data.output
    }
  })
}
export default services;
