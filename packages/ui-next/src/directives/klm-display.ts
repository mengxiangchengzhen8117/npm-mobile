import { DirectiveFunction } from 'vue';
import { getUrlParameters } from '../utils/index.js';

/**
 * 注意根据业务考虑是否引入IntersectionObserver polyfill作低版本兼容
 * 交叉比例为60%时触发可视回调, 元素仅曝光一次
 * 页面query中存在debugKlm参数为1时, 曝光的元素会被染色为绿色, 二次曝光时为红色.
 * eg: <component
 *        v-klmDisplay={{
            callback: (_, _1, vNode) => {
              sendDataCollect(
                evenName,
                attributes
              );
            },}} />
 */
export const initKlmDisplay = (Vue, isLocalUse = false) => {
  if (typeof window === 'undefined') return;
  const customCallBackMap = new WeakMap<
    Element,
    (isIntersecting: boolean) => void
  >();
  const params = getUrlParameters(window.location.href);

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      customCallBackMap.get(entry.target)?.(entry.isIntersecting);
    });
  };

  const observer = new IntersectionObserver(callback, {
    threshold: 0.6,
  });

  const COMMENT_NODE_TYPE = 8;

  const elementDisplayTimesMap = new WeakMap<Element, number>();

  const elementObCallbackTimerMap = new WeakMap<Element, any>();

  const ob: DirectiveFunction = (el, binding, vNode) => {
    observer.observe(el);
    const displayDuration = binding.value?.duration ?? 500;
    const onDisplayCallback = binding.value?.callback;
    customCallBackMap.set(el, (isIntersecting) => {
      if (isIntersecting) {
        const timer = setTimeout(() => {
          const elementDisplayedTimes = elementDisplayTimesMap.get(el) || 0;

          if (elementDisplayTimesMap.get(el)) {
            observer.unobserve(el);
            customCallBackMap.delete(el);
            clearTimeout(timer);
            return;
          }

          onDisplayCallback?.(isIntersecting, el, vNode);
          elementDisplayTimesMap.set(el, elementDisplayedTimes + 1);
          if ((params as any)?.debugKlm) {
            el.setAttribute(
              'data-display-times',
              (elementDisplayedTimes + 1).toString()
            );
            if (el.style.boxShadow) {
              console.log('🚀   ~ el.style.boxShadow', el.style.boxShadow);
              el.style.boxShadow = 'inset 0px -2px 20px 10px red, 0px -2px 20px 0px red';
            } else {
              el.style.boxShadow = 'inset 0px -2px 20px 10px rgb(65, 167, 102), 0px -2px 20px 0px rgb(65, 167, 102)';
            }
          }
        }, displayDuration);

        elementObCallbackTimerMap.set(el, timer);
      } else {
        clearTimeout(elementObCallbackTimerMap.get(el));
      }
    });
  };

  const options = {
    bind(el, binding, vNode, oNode) {
      const isObserve = binding.value?.hasOwnProperty('isObserve')
        ? binding.value.isObserve
        : true;
      if (!isObserve) return;
      ob(el, binding, vNode, oNode);
    },
    componentUpdated(el, binding, vNode, oNode) {
      const isObserve = binding.value?.hasOwnProperty('isObserve')
        ? binding.value.isObserve
        : true;

      if (!isObserve) {
        observer.unobserve(el);
        customCallBackMap.delete(el);
        elementObCallbackTimerMap.delete(el);
        clearTimeout(elementObCallbackTimerMap.get(el));

        return;
      }

      if (customCallBackMap.has(el)) return;
      ob(el, binding, vNode, oNode);
    },
    unbind(el) {
      if (el.nodeType === COMMENT_NODE_TYPE) return;
      observer.unobserve(el);
      customCallBackMap.delete(el);
      elementDisplayTimesMap.delete(el);
      clearTimeout(elementObCallbackTimerMap.get(el));
      elementObCallbackTimerMap.delete(el);
    },
  };
  if (isLocalUse) return options;
  Vue.directive('klmDisplay', options);
};
