#!/usr/bin/env sh
#
# Instantiate Project Genesis into a new project directory (copy-all-except).
# E2E definition: after copy, "npm test" and "node scripts/run-path.js .genome/mission.md" must work.
#
# Excludes: .git .logs/ .ai/ .tmp-* node_modules (then creates empty .ai/context/)
# (Do not add excludes that would break e2e; see above.)
#
# Usage: instantiate.sh <pg-source-dir> <target-dir> [--force] [--no-verify]
# Example: ./instantiate.sh /path/to/project-genesis /path/to/my-organism
#

set -e

usage() {
  echo "Usage: instantiate.sh <pg-source-dir> <target-dir> [--force] [--no-verify]"
  echo "  --force     allow non-empty target (overwrite same names)"
  echo "  --no-verify skip running npm test after copy"
  exit 1
}

SOURCE=""
TARGET=""
FORCE=0
NO_VERIFY=0

for arg in "$@"; do
  case "$arg" in
    --force)    FORCE=1 ;;
    --no-verify) NO_VERIFY=1 ;;
    -*)
      echo "Unknown option: $arg"
      usage
      ;;
    *)
      if [ -z "$SOURCE" ]; then
        SOURCE="$arg"
      elif [ -z "$TARGET" ]; then
        TARGET="$arg"
      else
        echo "Too many arguments."
        usage
      fi
      ;;
  esac
done

if [ -z "$SOURCE" ] || [ -z "$TARGET" ]; then
  echo "Error: need both <pg-source-dir> and <target-dir>."
  usage
fi

# Source must exist and look like PG
if [ ! -d "$SOURCE" ]; then
  echo "Error: source directory does not exist: $SOURCE"
  exit 1
fi
if [ ! -f "$SOURCE/package.json" ] || [ ! -d "$SOURCE/.genome" ]; then
  echo "Error: source does not look like Project Genesis (missing package.json or .genome/)."
  exit 1
fi

# Resolve absolute path of source
SOURCE_ABS=$(cd "$SOURCE" && pwd)

# Target must be outside source
if [ -d "$TARGET" ]; then
  TARGET_ABS=$(cd "$TARGET" && pwd)
else
  PARENT=$(dirname "$TARGET")
  if [ ! -d "$PARENT" ]; then
    echo "Error: target parent directory does not exist: $PARENT"
    exit 1
  fi
  BASE=$(basename "$TARGET")
  TARGET_ABS=$(cd "$PARENT" && pwd)/$BASE
fi

case "$TARGET_ABS" in
  "$SOURCE_ABS"|"$SOURCE_ABS"/*)
    echo "Error: target must be outside the source directory."
    exit 1
    ;;
esac

# Target must be empty or not exist, unless --force
if [ -d "$TARGET" ]; then
  if [ -n "$(ls -A "$TARGET" 2>/dev/null)" ] && [ "$FORCE" -ne 1 ]; then
    echo "Error: target directory is not empty. Use --force to copy anyway."
    exit 1
  fi
fi

# Create target if it doesn't exist
if [ ! -d "$TARGET" ]; then
  mkdir "$TARGET"
fi

# Copy: prefer rsync (easier excludes), else cp then remove excludes
if command -v rsync >/dev/null 2>&1; then
  rsync -a \
    --exclude='.git' \
    --exclude='.logs/' \
    --exclude='.ai/' \
    --exclude='.tmp-*' \
    --exclude='node_modules' \
    "$SOURCE/" "$TARGET/"
else
  # Fallback: cp then remove excluded dirs (skip cp if source empty to avoid glob issues)
  if [ -n "$(ls -A "$SOURCE" 2>/dev/null)" ]; then
    cp -r "$SOURCE"/* "$TARGET/" 2>/dev/null || true
    for f in "$SOURCE"/.*; do
      [ -e "$f" ] || continue
      name=$(basename "$f")
      [ "$name" = "." ] && continue
      [ "$name" = ".." ] && continue
      cp -r "$f" "$TARGET/"
    done 2>/dev/null || true
    rm -rf "$TARGET/.git" "$TARGET/.logs" "$TARGET/.ai" "$TARGET/node_modules" 2>/dev/null || true
    for t in "$TARGET"/.tmp-*; do
      [ -e "$t" ] && rm -rf "$t"
    done 2>/dev/null || true
  fi
fi

# Create empty .ai/context/ for workflow (e.g. /capture_issue)
mkdir -p "$TARGET/.ai/context"

echo "Copy complete: $TARGET"

# Optional verification
if [ "$NO_VERIFY" -ne 1 ]; then
  if (cd "$TARGET" && npm test) >/dev/null 2>&1; then
    echo "Verification: ok"
  else
    echo "Verification: failed (run 'npm test' from target to debug)"
    exit 1
  fi
fi
