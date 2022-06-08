//basic logger middleware that lets you check the state between action and reducers.
const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);

    console.groupEnd();
    return result;
  };
  
  export default logger;
  