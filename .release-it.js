module.exports = {
  hooks: {
    "after:bump": ["npm run build", "npm run zip"],
    "after:release":
      "echo Successfully released ${name} v${version} to ${repo.repository}.",
  },
  github: {
    release: true,
    assets: ["dist/*.zip"],
  },
  git: {
    requireCleanWorkingDir: false,
  },
  npm: {
    publish: false,
  },
};
