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
    description: 'Custom structure to build an REST API using Express.js',
    license: {
      name: 'All Rights Reserved',
    },
    title: 'Custom structure to build an REST API using Express.js',
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
  ],
  'x-tagGroups': [
    {
      name: 'General',
      tags: ['Recipes'],
    },
  ],
  components: {
    // securitySchemes: {
    //   bearerAuth: {
    //     bearerFormat: 'JWT',
    //     scheme: 'bearer',
    //     type: 'http',
    //   },
    // },
  },
};

const route = (fileName: any) => `./src/route/${fileName}.ts`;

const apis = [route('recipeRoute'), route('authRoute')];

const options = {
  apis,
  basePath: '/',
  swaggerDefinition,
};

export const swaggerSpec = swaggerJsdoc(options);