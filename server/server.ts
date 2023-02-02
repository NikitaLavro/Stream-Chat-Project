//DOTENV
import { config } from "dotenv";
config();

//FASTIFY
import fastify from "fastify";

const app = fastify();

app.listen({ port: parseInt(process.env.PORT!) });
