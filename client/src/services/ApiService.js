const BASE_URL = 'http://api.open-notify.org/iss-now.json';

const ApiClient ={};

ApiClient.getPosition = () => {
  return fetch(BASE_URL)
    .then(res => res.json())
}

export default ApiClient;