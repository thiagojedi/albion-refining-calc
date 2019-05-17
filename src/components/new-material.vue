<template>
  <div class="input-group">
    <input type="number" name="price" id="price" class="form-control" v-model="price">
    <div class="input-group-append">
      <span class="input-group-text">silver</span>
    </div>
    <input type="number" name="quantity" id="quantity" class="form-control" v-model="quantity">
    <div class="input-group-append">
      <span class="input-group-text">un.</span>
    </div>
    <input class="form-control" type="button" value="Add" v-on:click="addMaterial">
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      quantity: 0
    };
  },
  methods: {
    addMaterial() {
      this.$emit("add-material", {
        price: this.price,
        quantity: this.quantity
      });
      this.price = 0;
      this.quantity = 0;
    }
  }
};
</script>
