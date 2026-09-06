module.exports = async (req, res) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const host = process.env.OAUTH_GITHUB_HOST || 'https://github.com';
  const { code } = req.query;

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET.');
    return;
  }
  if (!code) {
    res.status(400).send('Missing code from GitHub.');
    return;
  }

  const tokenRes = await fetch(host + '/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code: code }),
  });
  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    res.status(400).send('GitHub OAuth error: ' + (tokenData.error_description || tokenData.error));
    return;
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });
  const message = 'authorization:github:success:' + payload;

  const html =
    '<script>' +
    '(function() {' +
    '  function receiveMessage() {' +
    '    window.opener.postMessage(' + JSON.stringify(message) + ', "*");' +
    '    window.removeEventListener("message", receiveMessage, false);' +
    '  }' +
    '  window.addEventListener("message", receiveMessage, false);' +
    '  window.opener.postMessage("authorizing:github", "*");' +
    '})();' +
    '</script>';

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
};
