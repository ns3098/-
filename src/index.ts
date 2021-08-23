import express from 'express';
import { createServer } from "http";
import { createConnection, Connection, getConnection } from 'typeorm';
import { Address } from "cluster";
import server from "./api/server";
import chalk from 'chalk';
import accessEnv from './api/helper';

const httpServer = createServer(server);

const connection = async (): Promise<void | Connection> => {
    return await createConnection();
};

Promise.all([connection()])
    .then(() => runonPort(accessEnv("PORT")));

function runonPort(port: number | string) {
	httpServer.listen(port);
	httpServer.on("error", (error: Error) => onError(error, port));
	httpServer.on("listening", onListening.bind(httpServer));
}

/**
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
export function onError(
	error: NodeJS.ErrnoException,
	port: number | string | boolean
): void {
	if (error.syscall !== "listen") {
		throw error;
	}
	const bind: string =
		typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
	switch (error.code) {
		case "EACCES":
			// logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			// logger.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * @export onListening
 */
export function onListening(): void {
	const addr: Address = this.address();
	const bind: string =
	typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    const message = `${chalk.bgGreen.black(
      `Running app on port ${addr.port}`
    )} ${chalk.green.bold(
      `http://localhost:${addr.port}/`
    )}`;
    console.log(message);

}

function shutDownHandler(Options: unknown, exitCode: unknown) {
	const options = Options as any;
	if (options.cleanup) {
		console.log("Closing http server connection...");
		httpServer.close();
		console.log("Closing database connections");
		getConnection().close();
	}
	if (exitCode || exitCode === 0) console.log(exitCode);
	if (options.exit) process.exit();
}

//do something when app is closing
process.on("exit", shutDownHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", shutDownHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", shutDownHandler.bind(null, { exit: true }));
process.on("SIGUSR2", shutDownHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", shutDownHandler.bind(null, { exit: true }));
