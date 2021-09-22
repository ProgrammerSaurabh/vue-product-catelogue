import { mount, createLocalVue } from "@vue/test-utils";
import VueFormulate from "@braid/vue-formulate";
import Vuex from "vuex";
import ProductAddForm from "../../src/components/ProductAddForm";
import { store as Store } from "../../src/store";
import { products } from "../../public/products.json";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueFormulate);

describe("ProductAddForm", () => {
  const store = new Vuex.Store(Store);

  beforeEach(async () => {
    await store.commit("products", products);
  });

  it("check whether products add", async () => {
    const wrapper = mount(ProductAddForm, {
      store,
      localVue,
    });

    const id = store.state.products.length + 1;
    const name = "Product1";
    const price = "9,999";
    const image = "https://via.placeholder.com/150";

    wrapper.find("[data-testid='product-name']").setValue(name);
    wrapper.find("[data-testid='product-price']").setValue(price);
    wrapper.find("[data-testid='product-image']").setValue(image);

    expect(store.state.products).toHaveLength(9);

    await store.commit("products", [
      ...store.state.products,
      { id, name, price, image },
    ]);
    // await wrapper.find("button").trigger("click");

    await flushPromises();

    expect(store.state.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id, name, price, image }),
      ])
    );

    expect(store.state.products).toHaveLength(10);
  });
});
