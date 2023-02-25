import {FastifyInstance, FastifyServerOptions} from "fastify";
import healthCheckService from "./service/healthCheck";
import indexPageService from "./service/indexPage";
import fastifyPlugin from "fastify-plugin";

const RootRouter = async (
  fastify: FastifyInstance,
  opts: FastifyServerOptions
) => {
  fastify.get(
    '/',
    (request, reply) => indexPageService(request, reply, fastify)
  );

  fastify.get(
    '/health-check',
    (request, reply) => healthCheckService(request, reply, fastify)
  );
}

export default RootRouter;