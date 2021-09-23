import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Product from "@/components/Product";
import { store as Store } from "@/store";
import { products } from "../../public/products.json";
import AddToCart from "@/components/AddToCart";
import RemoveFromCart from "@/components/RemoveFromCart";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Product", () => {
  const store = new Vuex.Store(Store);

  beforeEach(async () => {
    await store.commit("products", products);
    await store.commit("updateCart", {});
    await store.commit("loggedIn", false);
  });

  it("should show product name", async () => {
    const product = store.state.products[0];

    const wrapper = mount(Product, {
      store,
      localVue,
      propsData: { product },
    });

    expect(wrapper.find("[data-testid='product-name']").text()).toEqual(
      product.name
    );
  });

  it("should show product add-to-cart button when product not in cart", async () => {
    const product = store.state.products[0];

    const wrapper = mount(Product, {
      store,
      localVue,
      propsData: { product },
    });

    await store.commit("loggedIn", true);

    expect(wrapper.findComponent(RemoveFromCart).exists()).toBeFalsy();
    expect(wrapper.findComponent(AddToCart).exists()).toBeTruthy();
  });

  it("should show remove-from-cart button when product is in cart", async () => {
    const product = store.state.products[0];

    const wrapper = mount(Product, {
      store,
      localVue,
      propsData: { product },
    });

    await store.commit("loggedIn", true);
    await store.commit("addToCart", product);

    expect(wrapper.findComponent(AddToCart).exists()).toBeFalsy();
    expect(wrapper.findComponent(RemoveFromCart).exists()).toBeTruthy();
  });
});
