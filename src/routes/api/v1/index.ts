import {FastifyInstance, FastifyServerOptions} from "fastify";
import IndexRouter from "../../index";
import ApiRouter from "../index";
import AccountsRouter from "./accounts";
import DiaryRouter from "./diary";
import fastifyPlugin from "fastify-plugin";

const ApiV1Router = async (
  fastify: FastifyInstance,
  opts: FastifyServerOptions
) => {
  fastify.register(AccountsRouter, {
    prefix: "/accounts"
  });

  fastify.register(DiaryRouter, {
    prefix: "/diary"
  });
}

export default ApiV1Router;