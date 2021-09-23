import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { store as Store } from "@/store";
import Navbar from "@/components/Navbar";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("Navbar", () => {
  const store = new Vuex.Store(Store);

  beforeEach(async () => {});

  it("show login text when not loggedIn", () => {
    const wrapper = mount(Navbar, {
      store,
      localVue,
    });

    wrapper.setProps({
      product,
    });

    store.commit("loggedIn", false);

    expect(wrapper.find("[data-testid='action-li']").html()).toBe(
      "<li>Login</li>"
    );
  });
});
