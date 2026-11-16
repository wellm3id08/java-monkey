const LOADER_URL = 'https://cjrtnc.leaningtech.com/5.0/loader.js';
let runnerPromise = null;

async function loadRunner(jarPath) {
  if (!runnerPromise) {
    runnerPromise = (async () => {
      postMessage({ type: 'status', status: 'loading' });
      importScripts(LOADER_URL);
      await cheerpjInit({ version: 21, status: 'none' });
      const library = await cheerpjRunLibrary(jarPath);
      const Runner = await library.app.javamonkey.runtime.BrowserJavaRunner;
      postMessage({ type: 'status', status: 'ready' });
      return Runner;
    })().catch(error => {
      runnerPromise = null;
      throw error;
    });
  }
  return runnerPromise;
}

self.onmessage = async event => {
  const { id, jarPath, fileName, source, input } = event.data;
  try {
    const Runner = await loadRunner(jarPath);
    postMessage({ type: 'status', status: 'running', id });
    const result = await Runner.run(fileName, source, input);
    postMessage({ type: 'result', id, result: String(result) });
  } catch (error) {
    postMessage({
      type: 'error',
      id,
      message: error?.message || String(error),
    });
  }
};
