import {FastifyInstance, FastifyServerOptions} from "fastify";
import RootRouter from "./root";
import ApiRouter from "./api";
import fastifyPlugin from "fastify-plugin";

const FastifyRouter = async (
  fastify: FastifyInstance,
  opts: FastifyServerOptions
) => {
  fastify.register(RootRouter, {
    prefix: "/"
  });

  fastify.register(ApiRouter, {
    prefix: "/api"
  });
}

export default fastifyPlugin(FastifyRouter);