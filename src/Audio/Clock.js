export default () => {
  let timerID = null;
  let interval = 100;
  let tick = null;
  let lastTick = null;

  const _doTick = () => {
    const now = Date.now();
    const meta = _constructTickMeta(now);
    tick(meta);

    lastTick = now;
  };

  const _constructTickMeta = now => {
    return {
      lastTick,
      now,
      delta: lastTick ? now - lastTick : 0
    };
  };

  const start = tickCB => {
    tick = tickCB;
    if (timerID) {
      return;
    }

    timerID = setInterval(() => {
      _doTick();
    }, interval);
  };

  const setTimeInterval = newInterval => {
    interval = newInterval;
  };

  const resetInterval = newInterval => {
    if (timerID) {
      clearInterval(timerID);
    }

    timerID = setInterval(() => {
      _doTick();
    }, newInterval);
  };

  const stop = () => {
    clearInterval(timerID);
    timerID = null;
  };

  return {
    start,
    setTimeInterval,
    resetInterval,
    stop
  };
};
