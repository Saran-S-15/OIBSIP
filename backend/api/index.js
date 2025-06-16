import app from "../app.js";
import { createServer } from "http";

export default function handler(req, res) {
  const server = createServer(app);
  server.emit("request", req, res);
}