import filmFn from './filmIcon/index.js';
import teaCom from './teaCom/index.js';
import { Lazyload } from 'vant';
export default (app) => {
  filmFn(app);
  teaCom(app);
  app.use(Lazyload, {
    lazyComponent: true,
  });
};
