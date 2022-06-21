import { useRouteData, RouteDataFunc } from "solid-app-router";
import {Component, JSX} from "solid-js";
import * as fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import {MDXProps} from "mdx/types";

interface FoundationsData {
  comp: (props: MDXProps) => JSX.Element;
}

export const routeData: RouteDataFunc = async ({ location, params, data }) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const mdxPath = resolve(
    __dirname,
    `../../../../content/guides/foundations/${params.name}.mdx`
  );
  const mdPath = resolve(
    __dirname,
    `../../../../content/guides/foundations/${params.name}.md`
  );
  let comp;
  if (fs.existsSync(mdxPath)) {
    // We cannot move this to a variable - see also:
    // @see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    comp = await import(
      `../../../../content/guides/foundations/${params.name}.mdx`
    );
  } else if (fs.existsSync(mdPath)) {
    comp = await import(
      `../../../../content/guides/foundations/${params.name}.md`
    );
  } else {
    return { comp: null };
  }

  return { comp: comp.default };
};

const Stories: Component = () => {
  const { comp } = useRouteData<FoundationsData>();
  return <h1>{JSON.stringify({comp})}</h1>;
};

export default Stories;
