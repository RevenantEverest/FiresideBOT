import axios from 'axios';
const services = {};

services.getDefaultCommands = (data) => {
 return axios.get('/commands/default')
};

services.getCustomCommands = (data) => {
  return axios.get(`/commands/custom/user/${data}`);
};

services.addCommand = (data) => {
  return axios({
    method: 'POST',
    url: '/commands/custom',
    data: {
      user_id: data.user_id,
      command: data.command,
      output: data.output
    }
  })
}
export default services;
