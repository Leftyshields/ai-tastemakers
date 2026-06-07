'use strict';

/**
 * Automated tests for molecule library (story 5): read_file and audit.
 * Run from repo root: node --test scripts/molecules-read_file.test.js
 */

const fs = require('fs');
const path = require('path');
const { readFile } = require('../.molecules/lib/read_file.js');
const { audit } = require('../.molecules/lib/audit.js');
const assert = require('assert');
const test = require('node:test');

const tmpDir = path.join(__dirname, '..', '.tmp-molecules-test');
const testFile = path.join(tmpDir, 'hello.txt');
const testContent = 'hello molecule\n';

function setup() {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  fs.writeFileSync(testFile, testContent);
}

function teardown() {
  try {
    if (fs.existsSync(path.join(tmpDir, '.logs', 'audit.log'))) {
      fs.unlinkSync(path.join(tmpDir, '.logs', 'audit.log'));
    }
    if (fs.existsSync(path.join(tmpDir, '.logs'))) {
      fs.rmdirSync(path.join(tmpDir, '.logs'));
    }
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir);
  } catch (_) {}
}

function getAuditLines(repoRoot) {
  const auditPath = path.join(repoRoot, '.logs', 'audit.log');
  if (!fs.existsSync(auditPath)) return [];
  return fs.readFileSync(auditPath, 'utf8').trim().split('\n').filter(Boolean);
}

test('read_file returns contents for valid path under repo', async () => {
  setup();
  try {
    const contents = readFile({ path: 'hello.txt', repoRoot: tmpDir });
    assert.strictEqual(contents, testContent);
    const lines = getAuditLines(tmpDir);
    assert.ok(lines.length >= 1);
    assert.ok(lines.some((l) => l.includes('molecule=read_file') && l.includes('success=true')));
  } finally {
    teardown();
  }
});

test('read_file throws for path outside repo', () => {
  setup();
  try {
    const outside = path.isAbsolute(tmpDir) ? path.join(path.parse(tmpDir).root, 'etc', 'passwd') : '/etc/passwd';
    assert.throws(
      () => readFile({ path: outside, repoRoot: tmpDir }),
      /path not under repo root/
    );
    const lines = getAuditLines(tmpDir);
    assert.ok(lines.some((l) => l.includes('success=false')));
  } finally {
    teardown();
  }
});

test('read_file throws for non-existent path', () => {
  setup();
  try {
    assert.throws(
      () => readFile({ path: 'nonexistent.txt', repoRoot: tmpDir }),
      /ENOENT|no such file/
    );
    const lines = getAuditLines(tmpDir);
    assert.ok(lines.some((l) => l.includes('success=false')));
  } finally {
    teardown();
  }
});

test('read_file throws when path is missing', () => {
  setup();
  try {
    assert.throws(
      () => readFile({ repoRoot: tmpDir }),
      /path \(string\) is required/
    );
    assert.throws(
      () => readFile({ path: 123, repoRoot: tmpDir }),
      /path \(string\) is required/
    );
  } finally {
    teardown();
  }
});

test('read_file with encoding null returns Buffer', () => {
  setup();
  try {
    const contents = readFile({ path: 'hello.txt', encoding: null, repoRoot: tmpDir });
    assert.ok(Buffer.isBuffer(contents));
    assert.strictEqual(contents.toString('utf8'), testContent);
  } finally {
    teardown();
  }
});

test('audit appends line with molecule path success ts', () => {
  setup();
  try {
    audit({ moleculeId: 'read_file', pathOrRef: 'foo.txt', success: true, repoRoot: tmpDir });
    audit({ moleculeId: 'read_file', pathOrRef: 'bar.txt', success: false, repoRoot: tmpDir });
    const lines = getAuditLines(tmpDir);
    assert.strictEqual(lines.length, 2);
    assert.ok(lines[0].match(/molecule=read_file path=foo\.txt success=true ts=/));
    assert.ok(lines[1].match(/molecule=read_file path=bar\.txt success=false ts=/));
  } finally {
    teardown();
  }
});

test('audit sanitizes newlines in pathOrRef', () => {
  setup();
  try {
    audit({ moleculeId: 'read_file', pathOrRef: 'a\nb', success: true, repoRoot: tmpDir });
    const lines = getAuditLines(tmpDir);
    assert.strictEqual(lines.length, 1);
    assert.ok(!lines[0].includes('\n'));
    assert.ok(lines[0].includes('path=a b'));
  } finally {
    teardown();
  }
});
