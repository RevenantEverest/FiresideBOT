import type { Application } from 'express';
import supertest from 'supertest';

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

/**
 * Handles common test for an authenticated endpoint, if the user is not logged in
 * @param app 
 * @param method HTTP method 
 * @param endpoint 
 */
export default function authenticatedRouteTest(app: Application, method: HttpMethod, endpoint: string) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)[method](endpoint).expect(403);
        });
    });
};