import swaggerJsdoc from 'swagger-jsdoc';
const { version } = require('../../package.json');

/*
  Open API
  - https://swagger.io/docs/specification/about
  - https://swagger.io/specification
*/

const url = 'http://localhost:3003';

const swaggerDefinition = {
  info: {
    description: 'Endpoint de notre API Node',
    license: {
      name: 'All Rights Reserved',
    },
    title: 'Projet challenge stack Node/vue',
    version,
  },
  openapi: '3.0.0',
  produces: ['application/json'],
  servers: [{ url }],
  tags: [
    {
      description: 'Recipes',
      name: 'Recipes',
    },
    {
      description: "Authentication",
      name: "Authentication"

    }
  ],
  'x-tagGroups': [
    {
      name: 'General',
      tags: ['Recipes'],
    },
    {
      name: 'General',
      tags: ['Auth'],
    },
  ],
  components: {
    securitySchemes: {
      jwtToken: {
        type: 'apiKey',
        in: 'cookie',
        name: 'jwt',
      },
    },
  },
   security: [
    {
      jwtToken: [],
    },
  ],
};

const route = (fileName: any) => `./src/route/${fileName}.ts`;

const apis = [route('recipeRoute'), route('authRoute')];

const options = {
  apis,
  basePath: '/',
  swaggerDefinition,
};

export const swaggerSpec = swaggerJsdoc(options);