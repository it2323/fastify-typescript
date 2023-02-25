import {FastifyInstance, FastifyRequest, FastifyServerOptions} from "fastify";
import fastifyPlugin from "fastify-plugin";
import registerAccountService, {RegisterAccountBodyRequest} from "./service/registerAccount";
import loginAccountService, {LoginAccountBodyRequest} from "./service/loginAccount";
import getAccountInfoService from "./service/getAccountInfo";
import {IAuthWithJwtHeader} from "../../../../utils/types";
import getAppSettingService from "./service/getAppSetting";
import changeAccountInfoService, {ChangeAccountInfoBodyRequest} from "./service/changeAccountInfo";
import changeAccountEmailService, {changeAccountEmailBodyRequest} from "./service/changeAccountEmail";
import changeAccountPasswordService, {ChangeAccountPasswordBodyRequest} from "./service/changeAccountPassword";
import changeAppSettingService, {ChangeAppSettingBodyRequest} from "./service/changeAppSetting";
import {authenticationWithJwt} from "../../../../middleware/authentication";

const AccountsRouter = async (
  fastify: FastifyInstance,
  opts: FastifyServerOptions
) => {
  fastify.post(
    '/register',
    (
      request: FastifyRequest<{ Body: RegisterAccountBodyRequest }>,
      reply
    ) => registerAccountService(request, reply, fastify)
  );

  fastify.post(
    '/login',
    (
      request: FastifyRequest<{ Body: LoginAccountBodyRequest }>,
      reply
    ) => loginAccountService(request, reply, fastify)
  );

  fastify.get(
    '/info',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>,
      reply
    ) => getAccountInfoService(request, reply, fastify)
  );

  fastify.post(
    '/info',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Body: ChangeAccountInfoBodyRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => changeAccountInfoService(request, reply, fastify)
  );

  fastify.post(
    '/email',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Body: changeAccountEmailBodyRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => changeAccountEmailService(request, reply, fastify)
  );

  fastify.post(
    '/password',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Body: ChangeAccountPasswordBodyRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => changeAccountPasswordService(request, reply, fastify)
  );

  fastify.get(
    '/app-setting',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>,
      reply
    ) => getAppSettingService(request, reply, fastify)
  );

  fastify.post(
    '/app-setting',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Body: ChangeAppSettingBodyRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => changeAppSettingService(request, reply, fastify)
  );
}

export default AccountsRouter;