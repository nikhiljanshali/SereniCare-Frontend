const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = process.cwd();
const srcAppRoot = path.join(root, 'src', 'app');
const aliasMap = {
  core: '@core',
  shared: '@shared',
  features: '@features',
  layout: '@layout',
};

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      walk(fullPath, results);
    } else if (entry.isFile() && /\.ts$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function resolveTarget(fromFile, spec) {
  const baseDir = path.dirname(fromFile);
  const resolved = path.resolve(baseDir, spec);
  const candidates = [
    resolved,
    `${resolved}.ts`,
    `${resolved}.tsx`,
    `${resolved}.js`,
    `${resolved}.jsx`,
    `${resolved}.d.ts`,
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  const indexCandidates = [
    path.join(resolved, 'index.ts'),
    path.join(resolved, 'index.tsx'),
    path.join(resolved, 'index.js'),
    path.join(resolved, 'index.jsx'),
    path.join(resolved, 'index.d.ts'),
  ];

  for (const candidate of indexCandidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

function toAlias(targetFile) {
  const relativePath = path.relative(srcAppRoot, targetFile).replace(/\\/g, '/');
  const withoutExtension = relativePath.replace(/\.(ts|tsx|js|jsx|d\.ts)$/, '');
  const normalized = withoutExtension.replace(/\/index$/, '');
  const parts = normalized.split('/');
  const first = parts[0];
  const prefix = aliasMap[first];
  if (prefix) {
    const rest = parts.slice(1).join('/');
    return rest ? `${prefix}/${rest}` : prefix;
  }
  return `@app/${normalized}`;
}

const files = walk(srcAppRoot);
let changed = 0;

for (const file of files) {
  const sourceText = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const replacements = [];

  function visit(node) {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const spec = node.moduleSpecifier.text;
      if (!spec.startsWith('.')) {
        return;
      }
      const target = resolveTarget(file, spec);
      if (!target) {
        return;
      }
      const normalizedTarget = path.resolve(target);
      const relativeToApp = path.relative(srcAppRoot, normalizedTarget);
      if (relativeToApp.startsWith('..') || path.isAbsolute(relativeToApp)) {
        return;
      }
      const alias = toAlias(normalizedTarget);
      if (!alias) {
        return;
      }
      const quote = sourceText[node.moduleSpecifier.getStart(sourceFile)] === '"' ? '"' : "'";
      replacements.push({
        start: node.moduleSpecifier.getStart(sourceFile),
        end: node.moduleSpecifier.getEnd(),
        text: `${quote}${alias}${quote}`,
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (!replacements.length) {
    continue;
  }

  let updatedText = sourceText;
  for (const replacement of replacements.sort((a, b) => b.start - a.start)) {
    updatedText = updatedText.slice(0, replacement.start) + replacement.text + updatedText.slice(replacement.end);
  }

  if (updatedText !== sourceText) {
    fs.writeFileSync(file, updatedText, 'utf8');
    changed += 1;
  }
}

console.log(`Updated ${changed} files`);
