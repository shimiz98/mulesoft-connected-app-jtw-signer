
import * as core from '@actions/core'
import * as jose from 'jose';

// 参考
// JavaScriptのCustom Actionの作り方
// https://docs.github.com/ja/actions/tutorials/creating-a-javascript-action
// joseによるJWTの作り方
// https://github.com/panva/jose/blob/main/docs/jwt/sign/classes/SignJWT.md
// JWT Bearer Token の Connected App の仕様
// https://docs.mulesoft.com/access-management/creating-connected-apps-dev#jwt-bearer
// https://anypoint.mulesoft.com/exchange/portals/anypoint-platform/f1e97bc6-315a-4490-82a7-23abe036327a.anypoint-platform/access-management-api/minor/1.0/pages/Connected%20App%20Examples/ 
// の「JWT Bearer Grant」
try {
    // https://github.com/actions/toolkit/tree/main/packages/core#logging
    core.info('=== begin mulesoft-connected-app-jtw-signer ===');
    const anypointConnAppClientId = core.getInput('anypoint_connapp_client_id', { required: true});
    const anypointIdProviderId = core.getInput('anypoint_identity_provider_id', { required: true});
    const anypointUserName = core.getInput('anypoint_user_name', { required: true});
    const anypointAudience = core.getInput('anypoint_token_endpoint_url', { required: true});
    const privateKeyPem = core.getInput('private_key_pem', { required: true});
    const expirationTime = core.getInput('expiration_time', { required: true});

    const alg = 'RS256'
    const privateKey = await jose.importPKCS8(privateKeyPem, alg)
    const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(anypointConnAppClientId)
        .setSubject("v2|" + anypointIdProviderId + "|" + anypointUserName)
        .setAudience(anypointAudience)
        .setExpirationTime(expirationTime)
        .sign(privateKey)
    core.setOutput('json_web_token', jwt);
    core.info(`JWTの文字数=${jwt.length} ※JWTは自動的に伏字になる https://docs.github.com/ja/actions/reference/secrets-reference#automatically-redacted-secrets`)
    core.info('=== end mulesoft-connected-app-jtw-signer ===');
} catch (error) {
    core.setFailed(error.message);
}
