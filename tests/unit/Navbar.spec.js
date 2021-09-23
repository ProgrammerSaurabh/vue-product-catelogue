import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { store as Store } from "@/store";
import { router } from "@/router";
import Navbar from "@/components/Navbar";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("Navbar", () => {
  const store = new Vuex.Store(Store);
  const user = { name: "Test user" };

  beforeEach(async () => {
    await store.commit("loggedIn", false);
  });

  it("should show login li when not loggedIn", () => {
    const wrapper = mount(Navbar, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    expect(wrapper.find("[data-testid='guest-li']").isVisible()).toBeTruthy();
    expect(wrapper.find("[data-testid='auth-li']").element).toBeUndefined();
  });

  it("should show drop-down li when loggedIn", async () => {
    const wrapper = mount(Navbar, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    await store.commit("loggedIn", true);
    await store.commit("user", user);

    expect(wrapper.find("[data-testid='guest-li']").element).toBeUndefined();
    expect(wrapper.find("[data-testid='auth-li']").isVisible()).toBeTruthy();
  });

  it("should show logged-in user name", async () => {
    const wrapper = mount(Navbar, {
      store,
      localVue,
      stubs: ["router-link", "router-view"],
    });

    await store.commit("loggedIn", true);
    await store.commit("user", user);

    expect(wrapper.find("[data-testid='user-name']").text()).toEqual(user.name);
  });
});
