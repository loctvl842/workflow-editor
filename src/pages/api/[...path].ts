// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import httpProxy from "http-proxy";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.url = _.trimStart(req.url, "/api");
  return new Promise((resolve) => {
    req.headers.cookie = "";

    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_URL_SERVER_API,
      changeOrigin: true,
    });

    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}
