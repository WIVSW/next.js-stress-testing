import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import { markdownTable } from 'markdown-table';
import showdown from 'showdown';

const _dirname = path.resolve(fileURLToPath(import.meta.url), '..');

main();

function main() {
    const output = path.resolve(_dirname, '../reports/html/index');
    const table = markdownTable(group(loadLogFiles().map(logToJson)));
    const template = fs.readFileSync(path.resolve(_dirname, '../template.md'), {encoding: 'utf8'});
    const md = template.replace('{{ ab-results }}', table);

    fs.writeFileSync(path.resolve(_dirname, '../reports/md/index.md'), md, {encoding: 'utf8'});
    fs.writeFileSync(`${output}.html`, (new showdown.Converter({tables: true, ghCodeBlocks: true})).makeHtml(md), {encoding: 'utf8'});

    
}

function loadLogFiles() {
    const dir = path.resolve(_dirname, '../reports/ab');
    try {
        return fs.readdirSync(dir)
            .map((file) => fs.readFileSync(path.resolve(dir, file), {encoding: 'utf8'}));
    } catch (error) {
        console.error(error)
        return [];
    }
}

function logToJson(stdout) {
    let reportStart = Infinity;
    let reportMiddle = Infinity;
    let reportEnd = Infinity;

    return stdout
        .split('\n')
        .reduce((acc, line, index) => {
            if (line.startsWith('Server Port')) {
                reportStart = index;
            }

            if (line.startsWith('Connection Times')) {
                reportMiddle = index;
            }

            if (line.startsWith('Percentage')) {
                reportEnd = index;
            }
            
            if (index <= reportStart || index >= reportEnd) {
                return acc;
            }

            if (!line.includes(':')) {
                return acc;
            }

            let [key, value] = line.split(':').map((item) => item.trim());

            if (!key || !value) {
                return acc;
            }

            if (index > reportMiddle && index < reportEnd) {
                if (key === 'Total') {
                    const [min, mean, _, median, max] = value.split(' ').map((item) => item.trim()).filter(Boolean);
                    
                    Object.entries({min, mean, median, max})
                        .forEach(([k, v]) => acc[`Connection time [ms] ${k}`] = v)
                }

                return acc;
            }

            acc[key] = value;
            return acc;
        }, {});
}

function group(jsons) {
    const keys = new Set(jsons.flatMap((json) => Object.keys(json)));
    const result = {};

    keys.forEach((key) => {
        result[key] ??= [key];

        jsons.forEach((json) => {
            result[key].push(json[key] ?? '');
        })
    });

    return Object.values(result);
}