import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {IAuthWithJwtHeader, QueryType} from "../../../../../utils/types";
import {fastifyErrorWrapper} from "../../../../../utils/error";

export type DeleteDiaryParamRequest = {
  diaryId: string
};

const deleteDiaryService = async (
  request: FastifyRequest<{
    Params: DeleteDiaryParamRequest
    Headers: IAuthWithJwtHeader
  }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) => {

  try {
    await fastify.pg.transact(async client => {
      const query: QueryType = {
        text: `DELETE FROM diary_tag
               WHERE account_id::TEXT LIKE $1
               AND diary_id::TEXT LIKE $2`,
        values: [
          request.user.id,
          request.params.diaryId
        ]
      }
      await client.query(query);
    });
  } catch (error) {
    return reply
      .code(500)
      .type('application/json')
      .send(fastifyErrorWrapper(400, 'DIARY_TAG_DELETE_FAILED'));
  }

  try {
    await fastify.pg.transact(async client => {
      const query: QueryType = {
        text: `DELETE FROM diary_content
               WHERE account_id::TEXT LIKE $1
               AND id::TEXT LIKE $2`,
        values: [
          request.user.id,
          request.params.diaryId
        ]
      }
      await client.query(query);
    });
  } catch (error) {
    return reply
      .code(500)
      .type('application/json')
      .send(fastifyErrorWrapper(400, 'DIARY_CONTENT_DELETE_FAILED'));
  }

  return reply
    .code(200)
    .type(null)
    .send()
}

export default deleteDiaryService;