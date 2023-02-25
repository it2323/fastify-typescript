import {FastifyInstance, FastifyServerOptions} from "fastify";
import ApiV1Router from "./v1";
import fastifyPlugin from "fastify-plugin";

const ApiRouter = async (
  fastify: FastifyInstance,
  opts: FastifyServerOptions
) => {
  fastify.register(ApiV1Router, {
    prefix: '/v1'
  });
}

export default ApiRouter;