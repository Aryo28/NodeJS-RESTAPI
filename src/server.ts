import { Server } from "@hapi/hapi";
import Routes from './routes';

export const init = async (): Promise<Server> => {
  const server = new Server({
    debug: {
      request: ["error"],
      log: ["error"],
    },
    port: 3000,
    host: "0.0.0.0",
  });

  server.route(Routes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
  return server;
};
