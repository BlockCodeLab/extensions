const copyDir = require('copy-dir');
const ejs = require('ejs');
const fs = require('fs');
const marked = require('marked').marked;
const mkdirp = require('mkdirp');
const path = require('path');
const process = require('process');
const UglifyJS = require('uglify-js');

const tokenBox = require('./token-box');

const SOURCE_DIR = path.join(__dirname, '../src');
const STATIC_DIR = path.join(__dirname, '../static');
const DIST_DIR = path.join(__dirname, '../dist/extensions');

const TEMPLATE_FILE = path.join(__dirname, '../build/template.ejs');
const CONFIG_FILE = 'config.json';

const isProduction = process.env.NODE_ENV === 'production';

const NOT_SUPPORTED_EXTNAMES = [];
mkdirp.sync(DIST_DIR);

marked.use({ extensions: [tokenBox] });

const build = isMinify => {
    copyDir(STATIC_DIR, DIST_DIR, {
        filiter: (stat, filepath, filename) => {
            return filename[0] !== '.';
        }
    });

    const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

    const collection = {};
    fs.readdirSync(SOURCE_DIR).forEach(extension => {
        const extensionPath = path.join(SOURCE_DIR, extension);
        const stat = fs.statSync(extensionPath);
        if (!stat.isDirectory()) return;

        mkdirp.sync(path.join(DIST_DIR, extension));

        fs.readdirSync(extensionPath)
            .filter(filename => !(
                filename[0] === '.' ||
                NOT_SUPPORTED_EXTNAMES.includes(path.extname(filename))
            ))
            .forEach(filename => {
                const filepath = path.join(SOURCE_DIR, extension, filename);
                const outpath = path.join(DIST_DIR, extension, filename);

                const stat = fs.statSync(filepath);
                if (stat.isDirectory()) {
                    copyDir(filepath, outpath, {
                        filiter: (stat, filepath, filename) => {
                            return filename[0] !== '.';
                        }
                    });
                    return;
                }

                if (filename.toLowerCase() === CONFIG_FILE) {
                    try {
                        const {translationMap, ...configData} = JSON.parse(fs.readFileSync(filepath, 'utf8'));
                        if (isProduction && configData.disabled) {
                            return;
                        }
                        Object.entries(translationMap).forEach(([locale, data]) => {
                            collection[locale] = collection[locale] || [];
                            const localeData = locale !== 'en' ?
                                Object.assign({}, configData) :
                                configData;
                            Object.entries(data).forEach(([key, value]) => localeData[key] = value);
                            if (locale !== 'en') {
                                collection[locale].push(localeData);
                            }
                        });
                        collection['en'].push(configData);
                    } catch (e) {
                        console.error(`error read ${filename} in ${extension}: ${e}`);
                    }
                    return;
                }

                if (path.extname(filename).toLowerCase() === '.md') {
                    let title = '';
                    marked.use({
                        walkTokens: token => {
                            if (token.type === 'heading' && token.depth === 1) {
                                title = token.text;
                            }
                        }
                    });
                    const markdown = marked.parse(fs.readFileSync(filepath, 'utf8'));
                    const lang = path.extname(path.basename(filename, '.md'))
                        .substring(1).toLowerCase();
                    const html = ejs.render(template, {lang, title, markdown});
                    fs.writeFileSync(outpath.replace(/\.md$/i, '.html'), html);
                    return;
                }

                if (path.extname(filename).toLowerCase() === '.js') {
                    let code = fs.readFileSync(filepath, 'utf8');
                    try {
                        if (isMinify) {
                            const result = UglifyJS.minify(fs.readFileSync(filepath, 'utf8'));
                            if (result.error) {
                                console.error(`error minify ${filename} in ${extension}: ${result.error}`);
                                return;
                            }
                            code = result.code;
                        }
                        fs.writeFileSync(outpath, code);
                    } catch (e) {
                        console.error(`error copy ${filename} in ${extension}: ${e}`);
                    }
                    return;
                }

                fs.copyFileSync(filepath, outpath);
            });
    });

    try {
        Object.entries(collection).forEach(([locale, configData]) => {
            const localeFilepath = path.join(DIST_DIR, `${locale}.json`);
            fs.writeFileSync(localeFilepath, JSON.stringify(configData), 'utf-8');
        });
    } catch (e) {
        console.error(`error write ${locale}.json: ${e}`);
    }

    console.log('build success.')
}

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isMinify= !isWatch;
if (isWatch) {
    fs.watch(SOURCE_DIR, {recursive: true}, () => build(isMinify));
}
build(isMinify);
