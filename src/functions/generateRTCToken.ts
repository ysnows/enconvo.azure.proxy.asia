import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { RtcRole, RtcTokenBuilder } from "agora-token";

export async function generateRTCToken(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    const body: any = await request.json();
    context.log(`body:${JSON.stringify(process.env)}`);

    // Rtc Examples
    const appID = process.env.RTC_APPID;
    const appCertificate = process.env.RTC_APP_CERTIFICATE;
    const channelName = body.channelName;
    const uid = body.uid

    const account = "2882341273";
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + tokenA);

    const data = { token: tokenA }

    return { jsonBody: { data: data } };
};

app.http('generateRTCToken', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: generateRTCToken
});
