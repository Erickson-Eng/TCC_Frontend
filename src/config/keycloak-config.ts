import Keycloak from 'keycloak-js';


const keycloakConfig = {
  url: 'https://localhost:8080',
  realm: 'quattys',
  clientId: 'sportive',
};

const keycloak = Keycloak(keycloakConfig);

export default keycloak;
