import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { googleIt } from '@schneehertz/google-it';

export async function search(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const query = request.query.get('q') || await request.text();
    console.log("query:", query);

    const response: any[] = await googleIt({
        query,
        limit: 5
    })
    console.log("response:", response);

    return { body: `Hello, ${name}!` };
};

app.http('search', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: search
});
