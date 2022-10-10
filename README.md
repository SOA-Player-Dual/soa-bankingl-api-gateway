
# Player Dual API Gateway

This is the API gateway for Player Dual project - the best gaming platformer to connect people together.


## Features

These are just placeholders, not the real features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
NODE_ENV = development
PORT = 3000
REDIS_URI = <Your redis uri>
MONGO_URI = <Your mongodb uri>
ACCESS_SECRET = <Your secret key>
REFRESH_SECRET = <Your secret key>
GOOGLE_CLIENT_ID = <Your google client id>
GOOGLE_CLIENT_SECRET = <Your google client secret>
GOOGLE_CALLBACK = <Your callback url>
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/SOA-Player-Dual/soa-playerdual-server
```

Go to the project directory

```bash
  cd soa-playerdual-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Roadmap

- Add more integrations

- Connect to services


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Author

- [Nguyen Thanh Huy](https://www.github.com/cloneee)

