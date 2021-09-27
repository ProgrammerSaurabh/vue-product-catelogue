import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Products from "@/components/Products";
import Product from "@/components/Product";
import EmptyData from "@/components/EmptyData";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import VueFormulate from "@braid/vue-formulate";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueFormulate);

describe("Products", () => {
  const store = new Vuex.Store(Store);

  it("should empty data when no products", () => {
    const wrapper = shallowMount(Products, {
      store,
      localVue,
      data() {
        return {
          loader: false,
        };
      },
      stubs: {
        EmptyData,
      },
    });

    expect(wrapper.findComponent(EmptyData).exists()).toBeTruthy();
  });

  it("should show all products", async () => {
    await store.commit("products", products);

    const wrapper = shallowMount(Products, {
      store,
      localVue,
      data() {
        return {
          loader: false,
        };
      },
      stubs: {
        Product,
      },
    });

    expect(wrapper.findAllComponents(Product).length).toEqual(
      store.state.products.length
    );
  });
});
