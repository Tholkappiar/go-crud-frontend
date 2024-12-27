/**
 *
 * Asynchronously loads the component for TodoPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TodoPage = lazyLoad(
  () => import('./index'),
  module => module.TodoPage,
);
