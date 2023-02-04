import { FastifyInstance, FastifyServerOptions } from "fastify";
import RootRouter from "./root";

const FastifyRotuer = async (
    fastify: FastifyInstance,
    opts: FastifyServerOptions
) => {
    fastify.register(RootRouter, {
        prefix: "/"
    });

}

export default FastifyRotuer;