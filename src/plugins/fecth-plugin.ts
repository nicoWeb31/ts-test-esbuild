import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
    name: "fileCache",
});


export const fetchPlugin = (inputCode:string) => {

    return { 
        name : 'fetchPlugin',
        setup(build: esbuild.PluginBuild){
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log("onLoad", args);
    
            if (args.path === "index.js") {
                return {
                    loader: "jsx",
                    contents: inputCode,
                };
            }
    
            //cache
    
            const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(
                args.path
            );
    
            if (cacheResult) {
                return cacheResult;
            }
    
            const { data, request } = await axios.get(args.path);
    
            const result: esbuild.OnLoadResult = {
                loader: "jsx",
                contents: data,
                resolveDir: new URL("./", request.responseURL).pathname,
            };
    
            await fileCache.setItem(args.path, result);
            return result;
        });
        }
    }


};
