/* import Vue from "vue";

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

export default {
  name: "App",
  methods: {
    onClickOutside() {
      console.log("clicked outside");
    },
  },
}; */

export default {
    // called before bound element's attributes
    // or event listeners are applied
    created(el, binding, vnode, prevVnode) {},
    // called right before the element is inserted into the DOM.
    beforeMount() {},
    // called when the bound element's parent component
    // and all its children are mounted.
    mounted(el, binding, vnode) {

      el.clickOutsideEvent = function(event) {
        if (el !== event.target && !(el.contains(event.target)) ) {
          binding.value(event, el);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    // called before the parent component is updated
    beforeUpdate() {},
    // called after the parent component and
    // all of its children have updated
    updated() {},
    // called before the parent component is unmounted
    beforeUnmount() {},
    // called when the parent component is unmounted
    unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    }
}