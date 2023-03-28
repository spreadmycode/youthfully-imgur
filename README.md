## Getting Started

1. Copy `.env.example` to `.env.local`.

2. Get Imgur API client id and paste it on env file.

3. Open the terminal and run the following commands.

```
$ npm install

$ npm run dev
```

## Issue you might face on

Imgur API blocks localhost as origina.

`$ npm run dev` then browsing `localhost:3000` will not work.

In this case, please browse with your local IP address.

For example `http://192.168.100.100:3000`.

Let's enjoy!
