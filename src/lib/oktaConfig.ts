// export const oktaConfig = {
//     clientId: '0oa881eexkd2yU4Jx5d7',
//     issuer: 'https://dev-19018177.okta.com/oauth2/default',
//     redirectUri: `http://localhost:3000/login/callback`,
//     scopes: ['openid', 'profile', 'email']
//     // USE_INTERACTION_CODE: true
//     // pkce: true,
//     // disableHttpsCheck: true
// }

export const oktaConfig = {
    oidc: {
    clientId: '0oa881eexkd2yU4Jx5d7',
    issuer: 'https://dev-19018177.okta.com/oauth2/default',
    redirectUri: `http://localhost:3000/login/callback`,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
    },
    widget: {
        issuer: 'https://dev-19018177.okta.com/oauth2/default',
        clientId: '0oa881eexkd2yU4Jx5d7',
        redirectUri: `http://localhost:3000/login/callback`,
        scopes: ['openid', 'profile', 'email']    
    }

}