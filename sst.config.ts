/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "csc-456-paw",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.StaticSite("StaticSite", {
      build: {
        command: "npm run build",
        output: "dist",
      },
    });
  },
});
