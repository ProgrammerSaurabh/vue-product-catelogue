<template>
  <header>
    <nav class="container mt-0 bg-transparent">
      <router-link to="/">
        <h1>Products catalogue</h1>
      </router-link>
      <ul>
        <!-- <li>Login</li>
        <li>Logout</li> -->
        <li>
          <router-link to="/carts">
            <div class="cart-container">
              <i class="fa fa-shopping-cart"></i>
              <span>
                {{ Object.keys(carts).length }}
              </span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["carts"]),
  },
};
</script>