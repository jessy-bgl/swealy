# Swealy

Open source web app to automate your crypto investments based on the DCA strategy. Compatible with Binance and FTX.

![swealy](https://github.com/jessy-bgl/swealy/blob/main/docs/swealy-dashboard.png)

## Installation

The production scripts are available in [production](https://github.com/jessy-bgl/swealy/tree/main/production).

The recommended way to install the app (including the web server, the database and a reverse-proxy) is to use the docker-compose.stable.yml file.

Alternatively, to get the latest - possibly beta - version, use the docker-compose.latest.yml file.

In all cases, the HTTP port 80 will be used by default to access the app server. You can change this by editing the proxy service ports in the docker-compose file.

## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
