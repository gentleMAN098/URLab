#!/bin/bash
# Inspired by Elementor Releasing Pipeline https://github.com/elementor/elementor
set -eo pipefail

if [[ -z "$PACKAGE_VERSION" ]]; then
	echo "Missing PACKAGE_VERSION env var"
	exit 1
fi

rm -rf *.zip .git .github node_modules docker yarn.lock webpack.config.js postcss.config.js phpcs.xml package.json Makefile composer.lock composer.json commitlint.config.js .stylelintrc .gitignore .eslintrc .eslintignore admin/node_modules admin/.eslintignore admin/.eslintrc admin/.stylelintrc admin/index.html admin/package.json admin/vite.config.js admin/yarn.lock

PLUGIN_ZIP_FILENAME="urlslab-${PACKAGE_VERSION}.zip"
dir_name="urlslab"
mkdir "$dir_name"
for file in *; do
    if [ "$file" != "$dir_name" ]; then
        mv "$file" "$dir_name"
    fi
done

mv ./urlslab/temp-changelog-from-readme.txt ./temp-changelog-from-readme.txt

zip -r $PLUGIN_ZIP_FILENAME ./urlslab/ -x "*.zip"
echo "PLUGIN_ZIP_FILENAME=${PLUGIN_ZIP_FILENAME}" >> $GITHUB_ENV
echo "PLUGIN_ZIP_PATH=./**/*" >> $GITHUB_ENV
