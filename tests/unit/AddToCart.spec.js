import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import AddToCart from "@/components/AddToCart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddToCart", () => {
  const store = new Vuex.Store(Store);

  let product;

  beforeEach(async () => {
    await store.commit("products", products);
    product = store.state.products[0];
  });

  it("should not show add-to-cart button when not loggedIn", () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product,
    });

    store.commit("loggedIn", false);

    expect(wrapper.isVisible()).toBe(false);
  });

  it("should show add-to-cart button when loggedIn", async () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product,
    });

    await store.commit("loggedIn", true);

    expect(wrapper.isVisible()).toBe(true);
  });

  it("should add product to store and update quantity", async () => {
    const wrapper = mount(AddToCart, {
      store,
      localVue,
    });

    wrapper.setProps({
      product,
    });

    await store.commit("loggedIn", true);

    expect(product.id in store.state.carts).toBe(false);

    const addToCartBtn = wrapper.find("[data-testid='add-to-cart']");

    await addToCartBtn.trigger("click");

    expect(product.id in store.state.carts).toBe(true);

    expect(store.state.carts[product.id].quantity).toEqual(1);
  });
});
