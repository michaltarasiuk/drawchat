import type {NextConfig} from "next";
import invariant from "tiny-invariant";

import {isDefined} from "@/lib/is-defined";

const nextConfig: NextConfig = {};
export default nextConfig;

invariant(
  isDefined(process.env.GROQ_API_KEY),
  "Environment variable GROQ_API_KEY is missing",
);

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GROQ_API_KEY: string;
    }
  }
}
