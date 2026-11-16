#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/runtime/src/app/javamonkey/runtime/BrowserJavaRunner.java"
CLASSES="$ROOT/runtime/classes"
JAR="$ROOT/runtime/java-monkey-runner.jar"

rm -rf "$CLASSES"
mkdir -p "$CLASSES"
javac --release 21 -d "$CLASSES" "$SOURCE"
jar --create --file "$JAR" -C "$CLASSES" .
rm -rf "$CLASSES"
