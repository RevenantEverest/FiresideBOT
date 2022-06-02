import supertest from 'supertest';
import { Application } from 'express';

import { AuthTestingPayload } from '../../../support/types/auth.js';
import { GuildPlaylistRoleExtraParams } from '../../../support/types/extraParams/index.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: GuildPlaylistRoleExtraParams) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            const endpoint = `${baseEndpoint}/${extraParams.guildId}`;
            await supertest(app)
            .get(endpoint)
            .expect(403)
        });
    });

    describe("given the user is logged in", () => {
        describe("given the user is a guild member", () => {
            describe("given the guild id and playlist id as a param", () => {
                describe("given the guild id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated response", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/9918726354123/id/1/roles`;
                        const { body, statusCode } = await supertest(app)
                        .get(endpoint)
                        .set(authPayload.header)
                        .send()

                        expect(statusCode).toBe(200);
                        expect(body.results).not.toBeNull();

                        const { results } = body;

                        expect(body.count).not.toBeNull();
                        expect(results.length).toBe(0);
                    });
                });

                describe("given the playlist id doesn't exist", () => {
                    it("should return a 200 status and an empty paginated response", async () => {
                        extraParams.mocks.isGuildMember(true);

                        const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/9981726/roles`;
                        const { body, statusCode } = await supertest(app)
                        .get(endpoint)
                        .set(authPayload.header)
                        .send()

                        expect(statusCode).toBe(200);
                        expect(body.results).not.toBeNull();

                        const { results } = body;

                        expect(body.count).not.toBeNull();
                        expect(results.length).toBe(0);
                    });
                });

                it("should return a 200 status and paginated playlist roles", async () => {
                    extraParams.mocks.isGuildMember(true);

                    const endpoint = `${baseEndpoint}/${extraParams.guildId}/id/1/roles`;
                    const { body, statusCode } = await supertest(app)
                    .get(endpoint)
                    .set(authPayload.header)
                    .send()

                    expect(statusCode).toBe(200);
                    expect(body.results).not.toBeNull();

                    const { results } = body;

                    expect(body.count).not.toBeNull();

                    expect(results[0].id).not.toBeNull();
                    expect(results[0].created_at).not.toBeNull();
                    expect(results[0].updated_at).not.toBeNull();

                    expect(body).toEqual({
                        count: body.count,
                        next: null,
                        previous: null,
                        results: [{
                            id: extraParams.guildPlaylistRole?.id,
                            role_id: extraParams.guildPlaylistRole?.role_id,
                            created_at: extraParams.guildPlaylistRole?.created_at
                        }]
                    })
                });
            });
        });
    });
};

export default getRoute;