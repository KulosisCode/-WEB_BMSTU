import path from "path";

const options = {
    route: {
        url: '/api/swagger',
        docs: '/api/v1/swagger.json'
    },
    swaggerDefinition: {
        info: {
            description: 'Application',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost',
        basePath: '/api/v1',
        produces: [
            "application/json",
        ],
        schemes: ['https', 'http'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: path.resolve('src/server'), //app absolute path
    files: ['./routes/*.ts'] //Path to the API handle folder
};

export default options;