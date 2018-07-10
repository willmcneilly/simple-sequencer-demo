import Worker from './metronome.worker';

export default () => {
  const worker = new Worker();
  console.log(worker);
  setInterval(() => worker.postMessage('hey'), 1000);
  // worker.onmessage = function(event) {};
  //
  // worker.addEventListener('message', function(event) {});
};
