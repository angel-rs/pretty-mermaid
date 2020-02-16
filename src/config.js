import * as packageJSON from '../package.json';

const Config = {
  versions: {
    prettyMermaid: packageJSON.version,
    mermaid: packageJSON.dependencies.mermaid,
  }
}

export { Config };
