export const EMAIL_VERIFICATION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PizzaPass Verification</title>
  <style>
    body {
      background: #000000;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
    .wrapper {
      max-width: 600px;
      margin: 50px auto;
      background: #1a1a1a;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      text-align: center;
    }
    .header {
      background: #ff5e00;
      color: white;
      padding: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      letter-spacing: 1px;
    }
    .emoji-banner {
      font-size: 50px;
      margin-top: 10px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      font-size: 24px;
      color: #ffb380;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      color: #cccccc;
      margin-bottom: 25px;
    }
    .verification-code {
      font-size: 40px;
      font-weight: 700;
      letter-spacing: 18px;
      color: #ff5e00;
      background: #331a00;
      border-radius: 12px;
      padding: 20px;
      display: inline-block;
    }
    .footer {
      font-size: 13px;
      color: #777777;
      margin: 40px 20px 20px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🍕 Pizzario</h1>
      <div class="emoji-banner">🧀🍅🍄🥓🌶️</div>
    </div>
    <div class="content">
      <h2>You're One Slice Away!</h2>
      <p>To complete your sign-up, enter this code in the app:</p>
      <div class="verification-code">{VERIFICATION CODE}</div>
      <p style="margin-top: 30px; color: #999;">Didn't request this? Just ignore this cheesy message.</p>
    </div>
    <div class="footer">
      &copy; 2025 Pizzario. All Rights Reserved. Made with ❤️ and mozzarella.
    </div>
  </div>
</body>
</html>`

export const WELCOME_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PizzaPass</title>
  <style>
    body {
      background: #000000;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
    .wrapper {
      max-width: 600px;
      margin: 50px auto;
      background: #1a1a1a;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      text-align: center;
    }
    .header {
      background: #ff5e00;
      color: white;
      padding: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      letter-spacing: 1px;
    }
    .emoji-banner {
      font-size: 50px;
      margin-top: 10px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      font-size: 24px;
      color: #ffb380;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      color: #cccccc;
      margin-bottom: 25px;
    }
    .highlight-name {
      font-size: 28px;
      font-weight: bold;
      color: #ff5e00;
      background: #331a00;
      padding: 12px 20px;
      border-radius: 12px;
      display: inline-block;
      margin: 30px auto;
    }
    .decorated-name {
      font-size: 40px;
      margin: 30px 0;
    }
    .footer {
      font-size: 13px;
      color: #777777;
      margin: 40px 20px 20px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🍕 Welcome to Pizzario!</h1>
      <div class="emoji-banner">🎉🧀🍕🚴‍♂️🔥</div>
    </div>
    <div class="content">
      <h2>Your Taste Adventure Begins!</h2>
      <p>We're thrilled to have you join the Pizzario family. From sizzling slices to blazing-fast deliveries, we're here to satisfy your cravings.</p>

      <div class="decorated-name">🍕✨ <span class="highlight-name">{name}</span> ✨🍕</div>

      <p style="margin-top: 30px; color: #999;">Questions? Our team is just a slice away 🍕</p>
    </div>
    <div class="footer">
      &copy; 2025 Pizzario. All Rights Reserved. Made with ❤️ and mozzarella.
    </div>
  </div>
</body>
</html>`

export const FORGOT_PASSWORD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Pizzario</title>
  <style>
    body {
      background: #000000;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
    .wrapper {
      max-width: 600px;
      margin: 50px auto;
      background: #1a1a1a;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      text-align: center;
    }
    .header {
      background: #ff5e00;
      color: white;
      padding: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      letter-spacing: 1px;
    }
    .emoji-banner {
      font-size: 50px;
      margin-top: 10px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      font-size: 24px;
      color: #ffb380;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      color: #cccccc;
      margin-bottom: 25px;
    }
    .reset-button {
      background-color: #ff5e00;
      color: white;
      text-decoration: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s ease;
      display: inline-block;
      margin-top: 20px;
    }
    .reset-button:hover {
      background-color: #e84e00;
    }
    .footer {
      font-size: 13px;
      color: #777777;
      margin: 40px 20px 20px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🔒 Reset Your Password</h1>
      <div class="emoji-banner">🧀🍕🔐🍕🧄</div>
    </div>
    <div class="content">
      <h2>Forgot Your Password?</h2>
      <p>No worries — it happens to the best of us. Click the button below to set a new password and get back to ordering your favorite slices.</p>
      <a href={FRONTEND_URL} class="reset-button">Reset Password</a>
      <p style="margin-top: 30px; color: #999;">Didn’t request a password reset? Just ignore this message 🍕</p>
    </div>
    <div class="footer">
      &copy; 2025 Pizzario. All Rights Reserved. Made with ❤️ and mozzarella.
    </div>
  </div>
</body>
</html>`

export const RESET_PASSWORD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - Pizzario</title>
  <style>
    body {
      background: #1c1c1c;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
    .wrapper {
      max-width: 600px;
      margin: 50px auto;
      background: #2c2c2c;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      text-align: center;
    }
    .header {
      background: #ff5e00;
      color: white;
      padding: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      letter-spacing: 1px;
    }
    .emoji-banner {
      font-size: 50px;
      margin-top: 10px;
    }
    .content {
      padding: 40px 30px;
      color: #eee;
    }
    .content h2 {
      font-size: 24px;
      color: #ffb380;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      color: #ccc;
      margin-bottom: 25px;
    }
    .footer {
      font-size: 13px;
      color: #777;
      margin: 40px 20px 20px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✅ Password Reset Successful</h1>
      <div class="emoji-banner">🍕🔓🧀🎉</div>
    </div>
    <div class="content">
      <h2>You're All Set!</h2>
      <p>Your password has been updated successfully. You're now ready to get back to those delicious pizza deliveries!</p>
      <p>Craving something tasty? Open the app and start your next order. 🍕🔥</p>
    </div>
    <div class="footer">
      &copy; 2025 Pizzario. All Rights Reserved. Made with ❤️ and mozzarella.
    </div>
  </div>
</body>
</html>`

export const STOCK_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pizzario Stock Alert</title>
  <style>
    body {
      background: #000000;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }
    .wrapper {
      max-width: 600px;
      margin: 50px auto;
      background: #1a1a1a;
      border-radius: 15px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      text-align: center;
    }
    .header {
      background: #dc2626;
      color: white;
      padding: 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 32px;
      letter-spacing: 1px;
    }
    .emoji-banner {
      font-size: 50px;
      margin-top: 10px;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      font-size: 24px;
      color: #f87171;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 16px;
      color: #cccccc;
      margin-bottom: 25px;
    }
    .low-stock-list {
      font-size: 18px;
      color: #ff5e00;
      font-weight: 600;
      background: #331a00;
      border-radius: 12px;
      padding: 15px;
      display: inline-block;
    }
    .footer {
      font-size: 13px;
      color: #777777;
      margin: 40px 20px 20px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🍕 Stock Alert</h1>
      <div class="emoji-banner">⚠️📦🧀🥫</div>
    </div>
    <div class="content">
      <h2>Ingredients Running Low</h2>
      <p>The following ingredients are below the safe stock limit (less than 20):</p>
      <div class="low-stock-list"><ul>{LOW_STOCK_ITEMS}</ul></div>
      <p style="margin-top: 30px; color: #999;">Please restock to avoid disappointing pizza lovers! 🍕</p>
    </div>
    <div class="footer">
      &copy; 2025 Pizzario. All Rights Reserved. Stay saucy 🍅.
    </div>
  </div>
</body>
</html>`;