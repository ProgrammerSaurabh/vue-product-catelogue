import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Products from "@/components/Products";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import ProductAddForm from "@/components/ProductAddForm";
import Product from "@/components/Product";
import VueFormulate from "@braid/vue-formulate";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueFormulate);

describe("Products", () => {
  const store = new Vuex.Store(Store);

  beforeEach(async () => {
    await store.commit("products", products);
  });

  it("shows all products", async () => {
    const wrapper = mount(Products, {
      store,
      localVue,
      components: { ProductAddForm, Product },
    });

    const productElements = wrapper.findAll("[data-testid='product']");

    expect(productElements.length).toBe(store.state.products.length);
  });
});
