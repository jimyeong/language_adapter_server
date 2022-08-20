const { OAuth2Client } = require("google-auth-library");
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_API_SERVICE_CLIENT_KEY
const GOOGLE_CLIENT_ID = process.env.GOOGLE_API_SERVICE_CLIENT_KEY;
// "1079878285444-g7ga6mkumcv5qmr6bil3tp8h3kqtnhf5.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleCredentialDecoder = async (token) => {
  try {
    let ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    const payload = ticket.getPayload();
    const userId = payload["sub"];
    return { statusCode: 1, status: "success", payload, userId };
  } catch (error) {
    return { statusCode: 0, status: "fail", payload: null, userId: null };
  }
};

module.exports = googleCredentialDecoder;
