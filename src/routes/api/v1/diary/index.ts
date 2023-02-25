import {FastifyInstance, FastifyRequest, FastifyServerOptions} from "fastify";
import fastifyPlugin from "fastify-plugin";
import {IAuthWithJwtHeader} from "../../../../utils/types";
import getDiariesService, {GetDiariesQueryRequest} from "./service/getDiaries";
import getDiaryByIdService, {GetDiaryByIdParamRequest, GetDiaryByIdQueryRequest} from "./service/getDiaryById";
import createDiaryService, {CreateDiaryBodyRequest} from "./service/createDiary";
import updateDiaryService, {UpdateDiaryBodyRequest, UpdateDiaryParamRequest} from "./service/updateDiary";
import deleteDiaryService, {DeleteDiaryParamRequest} from "./service/deleteDiary";
import {authenticationWithJwt} from "../../../../middleware/authentication";

const DiaryRouter = async (
  fastify: FastifyInstance,
  opts: FastifyServerOptions
) => {
  fastify.get(
    '/',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Querystring: GetDiariesQueryRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => getDiariesService(request, reply, fastify)
  );

  fastify.get(
    '/post/:diaryId',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Params: GetDiaryByIdParamRequest,
        Querystring: GetDiaryByIdQueryRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => getDiaryByIdService(request, reply, fastify)
  );

  fastify.post(
    '/post',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Body: CreateDiaryBodyRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => createDiaryService(request, reply, fastify)
  );

  fastify.post(
    '/post/:diaryId',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Params: UpdateDiaryParamRequest,
        Body: UpdateDiaryBodyRequest,
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => updateDiaryService(request, reply, fastify)
  );

  fastify.post(
    'post/:diaryId/delete',
    {
      preValidation: (request: FastifyRequest<{ Headers: IAuthWithJwtHeader }>, reply) =>
        authenticationWithJwt(request, reply, fastify)
    },
    (
      request: FastifyRequest<{
        Params: DeleteDiaryParamRequest
        Headers: IAuthWithJwtHeader
      }>,
      reply
    ) => deleteDiaryService(request, reply, fastify)
  );
}

export default DiaryRouter;