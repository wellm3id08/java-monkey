(() => {
  const SEPARATOR = '\u001e';
  const STARTUP_TIMEOUT = 90000;
  const EXECUTION_TIMEOUT = 6000;
  let worker = null;
  let sequence = 0;
  let active = null;

  function workerUrl() {
    return new URL('js/java-worker.js', document.baseURI);
  }

  function jarPath() {
    const url = new URL('runtime/java-monkey-runner.jar', document.baseURI);
    return `/app${url.pathname}`;
  }

  function resetWorker() {
    worker?.terminate();
    worker = null;
  }

  function rejectActive(error) {
    if (!active) return;
    clearTimeout(active.timer);
    const current = active;
    active = null;
    current.reject(error);
  }

  function ensureWorker() {
    if (worker) return worker;
    worker = new Worker(workerUrl(), { name: 'java-monkey-runner' });
    worker.addEventListener('message', event => {
      const message = event.data;
      if (!active) return;

      if (message.type === 'status') {
        active.onStatus?.(message.status);
        if (message.status === 'running' && message.id === active.id) {
          clearTimeout(active.timer);
          active.timer = setTimeout(() => {
            const error = new Error('timeout');
            error.code = 'timeout';
            rejectActive(error);
            resetWorker();
          }, EXECUTION_TIMEOUT);
        }
        return;
      }

      if (message.id !== active.id) return;
      clearTimeout(active.timer);
      const current = active;
      active = null;

      if (message.type === 'error') {
        const error = new Error(message.message || 'runner_error');
        error.code = 'runner_error';
        current.reject(error);
        return;
      }

      const text = String(message.result ?? '');
      const split = text.indexOf(SEPARATOR);
      if (split < 0) {
        current.resolve({ status: 'system_error', output: text });
        return;
      }
      current.resolve({
        status: text.slice(0, split),
        output: text.slice(split + SEPARATOR.length),
      });
    });
    worker.addEventListener('error', event => {
      const error = new Error(event.message || 'worker_error');
      error.code = 'worker_error';
      rejectActive(error);
      resetWorker();
    });
    return worker;
  }

  function run({ fileName, source, input = '', onStatus }) {
    if (!window.Worker || !window.WebAssembly) {
      const error = new Error('unsupported');
      error.code = 'unsupported';
      return Promise.reject(error);
    }
    if (active) {
      const error = new Error('busy');
      error.code = 'busy';
      return Promise.reject(error);
    }

    const id = ++sequence;
    return new Promise((resolve, reject) => {
      const currentWorker = ensureWorker();
      active = {
        id,
        resolve,
        reject,
        onStatus,
        timer: setTimeout(() => {
          const error = new Error('startup_timeout');
          error.code = 'startup_timeout';
          rejectActive(error);
          resetWorker();
        }, STARTUP_TIMEOUT),
      };
      currentWorker.postMessage({
        id,
        jarPath: jarPath(),
        fileName,
        source,
        input,
      });
    });
  }

  JM.javaRunner = { run };
})();
