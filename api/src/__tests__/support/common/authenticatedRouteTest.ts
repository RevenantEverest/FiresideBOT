import type { Application } from 'express';
import supertest from 'supertest';

type Method = "get" | "post" | "put" | "patch" | "delete";

export default function authenticatedRouteTest(app: Application, method: Method, endpoint: string) {
    describe("given the user is not logged in", () => {
        it("should return a 403 status", async () => {
            await supertest(app)[method](endpoint).expect(403);
        });
    });
};