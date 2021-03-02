import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
    return {
        name: "unpkg-path-plugin",
        setup(build: esbuild.PluginBuild) {
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log("onResole", args);

                if (args.path === "index.js") {
                    return { path: args.path, namespace: "a" };
                }

                if(args.path.includes('./') || args.path.includes("../")){
                    return { path: new URL(args.path,'https://unpkg.com' + args.resolveDir + '/').href, namespace: "a" };
                } 

                return {
                    namespace: "a",
                    path: `https://unpkg.com/${args.path}`,
                };
            });

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log("onLoad", args);

                if (args.path === "index.js") {
                    return {
                        loader: "jsx",
                        contents: `
              const message = require('nested-test-pkg');
              console.log(message);
            `,
                    };
                }
                const { data, request } = await axios.get(args.path);
                console.log(
                    "🚀 ~ file: unpkg-path-pluging.ts ~ line 34 ~ build.onLoad ~ data",
                    data
                );
                return {
                    loader: "jsx",
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                };
            });
        },
    };
};
