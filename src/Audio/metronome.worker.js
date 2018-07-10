// eslint-disable-next-line
self.onmessage = text => {
  console.log({ text });
  //eslint-disable-next-line
  // self.postMessage(text, 'hey');
};
//eslint-disable-next-line
console.log(self);

// Post data to parent thread
//eslint-disable-next-line
self.postMessage({ foo: 'foo' });

// Respond to message from parent thread
// eslint-disable-next-line
// self.addEventListener('message', event => console.log({ event }));
