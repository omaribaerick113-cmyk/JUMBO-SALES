module.exports = (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const host = process.env.OAUTH_GITHUB_HOST || 'https://github.com';
  if (!clientId) {
    res.status(500).send('Missing OAUTH_GITHUB_CLIENT_ID environment variable.');
    return;
  }
  const redirectUri = `https://${req.headers.host}/api/callback`;
  const authorizeUrl = `${host}/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
  res.writeHead(302, { Location: authorizeUrl });
  res.end();
};
