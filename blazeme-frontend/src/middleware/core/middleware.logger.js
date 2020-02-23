
export const LoggerMiddleware = store => next => action => {
  if (process.env.NODE_ENV !== 'production') {
    const { type, payload } = action;
    console.log(`%c[${type}]`, 'color: #6BF178', { payload });
  }

  return next(action);
};