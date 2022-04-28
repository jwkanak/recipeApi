"use strict";

const aws = require('aws-sdk');

const dynamo = new aws.DynamoDB.DocumentClient();

exports.createRecipe = async (event, context, callback) => {
   const request = JSON.parse(event.body); 

   const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
   };


   const params = {
     TableName: process.env.RecipeTable,
     Key: {'id': request.id},
     item: {
       name: request.name,
       description: request.description,
       imagePath: request.imagePath,
       ingredients: request.ingredients
     }
   }
   await dynamo.put(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers,
        body: JSON.stringify(request),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      callback(null, {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Unable to create recipe' })
      })
    });


};


