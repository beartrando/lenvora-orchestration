import * as orchestrationProto from '../../contracts/proto/orchestration';
import AuthRoutes from "./routes/auth.routes";
import ProfileRoutes from "./routes/profile.routes";
import {TokenExpiredError} from 'jsonwebtoken';

// const withAuth = (req: Request, res: Response, next: NextFunction) => {
//     const isPublic = publicPaths.some(path => req.path.startsWith('/' + path));
//     // logger.log('req.path',req.path);
//     // logger.log('isPublic',isPublic);
//     if (isPublic) return next();
//     return verifyToken(req, res, next)
// };
//
// app.use(withAuth);


export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export type RouteHandler = (request: orchestrationProto.ProxyRequest) => Promise<orchestrationProto.ProxyResponse>;

class Route {
    constructor(
        public readonly method: HttpMethod,
        public readonly path: string,
        public readonly handler: RouteHandler,
        public readonly authorizationRequired: boolean = true,
    ) {
    }
}

export class Router {
    private readonly routes: Route[] = [];

    constructor(
        public readonly authRoutes: AuthRoutes,
        public readonly profileRoutes: ProfileRoutes,
    ) {
        authRoutes.register(this);
        profileRoutes.register(this);
    }

    public get(path: string, handler: RouteHandler, authorizationRequired: boolean = true): void {
        this.register(HttpMethod.GET, path, handler, authorizationRequired);
    }

    public post(path: string, handler: RouteHandler, authorizationRequired: boolean = true): void {
        this.register(HttpMethod.POST, path, handler, authorizationRequired);
    }

    public put(path: string, handler: RouteHandler, authorizationRequired: boolean = true): void {
        this.register(HttpMethod.PUT, path, handler, authorizationRequired);
    }

    public patch(path: string, handler: RouteHandler, authorizationRequired: boolean = true): void {
        this.register(HttpMethod.PATCH, path, handler, authorizationRequired);
    }

    public delete(path: string, handler: RouteHandler, authorizationRequired: boolean = true): void {
        this.register(HttpMethod.DELETE, path, handler, authorizationRequired);
    }

    public async handle(request: orchestrationProto.ProxyRequest): Promise<orchestrationProto.ProxyResponse> {

        const method = this.parseMethod(request.method);

        const route = this.findRoute(method, request.path);

        // logger.log(method);
        // logger.log(route);

        if (!route) {
            return {
                statusCode: 404,
                headers: [{key: "content-type", value: "application/json",},],
                body: Buffer.from(JSON.stringify({error: "NotFound",}),),
            };
        }

        try {
            return await route.handler(request);
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return {
                    statusCode: 401,
                    headers: [{key: "content-type", value: "application/json",},],
                    body: Buffer.from(JSON.stringify({error: "TokenExpiredError",}),),
                };
            }
            throw err;
        }
    }

    private parseMethod(method: string): HttpMethod {
        switch (method) {
            case HttpMethod.GET:
            case HttpMethod.POST:
            case HttpMethod.PUT:
            case HttpMethod.PATCH:
            case HttpMethod.DELETE:
                return method;

            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }
    }

    private findRoute(
        method: HttpMethod,
        path: string,
    ): Route | undefined {
        return this.routes.find(
            route =>
                route.method === method &&
                route.path === path,
        );
    }

    private register(
        method: HttpMethod,
        path: string,
        handler: RouteHandler,
        authorizationRequired: boolean = true,
    ): void {


        const exists = this.routes.some(
            route =>
                route.method === method &&
                route.path === path,
        );

        if (exists) {
            throw new Error(
                `Route ${method} ${path} already exists`,
            );
        }

        this.routes.push(
            new Route(method, path, handler, authorizationRequired),
        );
    }
}

export default Router;
