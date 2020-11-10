<template>
   <section class="cart-page pt-5">
      <div class="container-fluid">
         <h1 class="mb-4 text-center">Your Cart</h1>
         <table class="table">
            <thead>
               <tr>
                  <th scope="col">No</th>
                  <th scope="col">Gambar Produk</th>
                  <th scope="col">Nama Produk</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total</th>
                  <th scope="col" class="text-center">Opsi</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(items, index) in cart.cart_items" :key="items.id">
                  <td>{{ index + 1 }}</td>
                  <td class="m-0 w-25">
                     <img
                        :src="items.product.image"
                        class="img-fluid"
                        width="230px"
                        alt=""
                        srcset=""
                     />
                  </td>
                  <td>
                     <span class="d-block m-0 p-0">{{
                        items.product.name
                     }}</span>
                     <div class="" v-if="cart.store.store_promo">
                        <span
                           class="m-0 badge badge-primary shadow-sm p-1 px-2 mb-3"
                           >{{ cart.store.store_promo.name }}</span
                        >
                        <span
                           class="m-0 badge badge-danger shadow-sm p-1 px-2 ml-1"
                           >{{ cart.store.store_promo.amount }}% OFF</span
                        >
                     </div>
                     <div class="" v-else-if="items.product.promo">
                        <span
                           class="m-0 badge badge-info shadow-sm p-1 px-2 mb-3"
                           >{{ items.product.promo.name }}</span
                        >
                        <span
                           class="m-0 badge badge-danger shadow-sm p-1 px-2 ml-1"
                           >{{ items.product.promo.amount }}% OFF</span
                        >
                     </div>
                     <div
                        class=""
                        v-if="cart.store.store_promo && items.product.promo"
                     >
                        <div
                           v-if="items.product.promo && !cart.store.store_promo"
                        >
                           <span
                              class="m-0 badge badge-info shadow-sm p-1 px-2 mb-3"
                              >{{ items.product.promo.name }}</span
                           >
                           <span
                              class="m-0 badge badge-danger shadow-sm p-1 px-2 ml-1"
                              >{{ items.product.promo.amount }}% OFF</span
                           >
                        </div>
                        <div v-else>
                           <div></div>
                        </div>
                     </div>
                     <div class="" v-else></div>
                     <span class="text-secondary small m-0 p-0 d-block"
                        >Quantity : {{ items.qty }} pcs</span
                     >
                  </td>
                  <td>
                     <div class="d-inline-flex">
                        <strike
                           v-if="cart.store.store_promo || items.product.promo"
                           class="text-danger mr-1"
                           >Rp. {{ items.product.price }}</strike
                        >
                        <div v-if="cart.store.store_promo">
                           Rp.
                           {{
                              calculatePrice(
                                 items.product.price,
                                 cart.store.store_promo.amount
                              )
                           }}
                        </div>
                        <div
                           v-if="items.product.promo && !cart.store.store_promo"
                        >
                           Rp.
                           {{
                              calculatePrice(
                                 items.product.price,
                                 items.product.promo.amount
                              )
                           }}
                        </div>
                        <div
                           v-if="cart.store.store_promo && items.product.promo"
                        >
                           <div
                              v-if="
                                 items.product.promo && !cart.store.store_promo
                              "
                           >
                              <strike class="text-danger mr-1"
                                 >Rp. {{ items.product.price }}</strike
                              >
                              Rp.
                              {{
                                 calculatePrice(
                                    items.product.price,
                                    items.product.promo.amount
                                 )
                              }}
                           </div>
                           <div
                              v-if="
                                 !items.product.promo && !cart.store.store_promo
                              "
                           >
                              Rp. {{ calculatePrice(items.product.price) }}
                           </div>
                        </div>
                        <div
                           v-if="
                              !cart.store.store_promo && !items.product.promo
                           "
                        >
                           Rp. {{ calculatePrice(items.product.price) }}
                        </div>
                     </div>
                  </td>
                  <td>
                     <div v-if="cart.store.store_promo">
                        Rp.
                        {{
                           calculateTotal(
                              items.product.price,
                              items.qty,
                              cart.store.store_promo.amount
                           )
                        }}
                     </div>
                     <div v-else-if="items.product.promo">
                        Rp.
                        {{
                           calculateTotal(
                              items.product.price,
                              items.qty,
                              items.product.promo.amount
                           )
                        }}
                     </div>
                     <div v-else>
                        Rp. {{ calculateTotal(items.product.price, items.qty) }}
                     </div>
                  </td>
                  <td class="text-center">
                     <button
                        @click="deleteProduct(items.product.id)"
                        class="btn btn-danger"
                     >
                        &times;
                     </button>
                  </td>
               </tr>
            </tbody>
            <tr>
               <td colspan="3" class="text-right font-weight-bold pt-5"></td>
               <td colspan="1" class="font-weight-bold pt-5">Total Harga</td>
               <td colspan="2" class="font-weight-bold pt-5">
                  Rp. {{ grandTotal() }}
               </td>
            </tr>
            <tr>
               <td
                  colspan="3"
                  class="text-right font-weight-bold border-0"
               ></td>
               <td colspan="1" class="font-weight-bold border-0">No Meja</td>
               <td colspan="2" class="font-weight-bold border-0">
                  <input
                     v-model="table"
                     id="table"
                     type="text"
                     class="form-control w-50 border-secondary"
                     autofocus
                     name=""
                  />
               </td>
            </tr>
            <tr>
               <td
                  colspan="3"
                  class="text-right font-weight-bold border-0"
               ></td>
               <td colspan="1" class="font-weight-bold border-0">Atas Nama</td>
               <td colspan="2" class="font-weight-bold border-0">
                  <input
                     v-model="name"
                     id="name"
                     type="text"
                     class="form-control w-50 border-secondary"
                     name=""
                  />
               </td>
            </tr>
            <tr>
               <td
                  colspan="3"
                  class="text-right font-weight-bold border-0"
               ></td>
               <td colspan="1" class="font-weight-bold border-0">Cash</td>
               <td colspan="2" class="font-weight-bold border-0">
                  <input
                     v-model="cash"
                     id="cash"
                     type="number"
                     class="form-control w-50 border-secondary"
                     name=""
                  />
               </td>
            </tr>
            <tr>
               <td
                  colspan="3"
                  class="text-right font-weight-bold border-0"
               ></td>
               <td colspan="1" class="font-weight-bold border-0">Kembalian</td>
               <td colspan="2" class="font-weight-bold border-0">
                  <label for="">Rp. {{ changeDue }}</label>
               </td>
            </tr>
            <tr>
               <td
                  colspan="3"
                  class="text-right font-weight-bold border-0"
               ></td>
               <td colspan="1" class="font-weight-bold border-0">
                  <button @click="countPrice()" class="btn btn-warning mr-1">
                     Hitung
                  </button>
                  <button @click="paymentClick()" class="btn btn-primary">
                     Bayar Pesanan
                  </button>
               </td>
            </tr>
         </table>
      </div>
   </section>
</template>

<script>
import numeral from "numeral";
import axios from "axios";
import swal from "sweetalert";
import { mapGetters, mapActions } from "vuex";
export default {
   name: "CartPage",
   data() {
      return {
         cash: 0,
         name: null,
         changeDue: 0,
         table: "M2-5NS2KS",
         products: {},
         checkCartLength: false,
      };
   },
   computed: {
      ...mapGetters(["cart", "promo"]),
      checkCash() {
         if (this.cash == 0) {
            this.cash == false;
         }
         return this.cash == false;
      },
      cartCondition() {
         return this.cart.cart_items;
      },
   },
   methods: {
      ...mapActions(["getPromos"]),
      isPartnerPromo() {
         if (this.cart.store && this.cart.store.store_promo != undefined) {
            // store promo
            return 0;
         } else if (
            this.cart.store &&
            this.cart.store.store_promo == undefined &&
            this.cart.cart_items.map((cart) => {
               return cart.product.promo;
            }) == false
         ) {
            // no promo
            return 2;
         } else {
            // self promo
            return 1;
         }
      },
      deleteProduct(id) {
         swal({
            title: "Apa kamu yakin?",
            text: "Belanjaan kamu akan dihapus dari keranjang!",
            icon: "warning",
            buttons: ["Batal", "Yakin"],
            dangerMode: true,
         }).then((willDelete) => {
            if (willDelete) {
               swal("Belanjaan berhasil dihapus!", {
                  icon: "success",
               });
               if (this.cart.cart_items.length <= 1) {
                  let emptyCart = {
                     ...this.cart,
                  };
                  emptyCart.cart_items = [];
                  emptyCart.store = {};
                  emptyCart.date = false;

                  axios
                     .put(
                        "https://franchise-backend.herokuapp.com/cart/",
                        emptyCart
                     )
                     .then(() => {
                        location.reload();
                     })
                     .catch((error) => console.error(error));
               } else {
                  let cart_on_remove = {
                     ...this.cart,
                  };
                  cart_on_remove.cart_items = cart_on_remove.cart_items.filter(
                     (item) => item.product.id !== id
                  );

                  axios
                     .put(
                        "https://franchise-backend.herokuapp.com/cart/",
                        cart_on_remove
                     )
                     .then(() => {
                        location.reload();
                     })
                     .catch((error) => console.error(error));
               }
            }
         });
      },
      grandTotal() {
         if (this.cart.cart_items) {
            let total = this.cart.cart_items.reduce((total, cart) => {
               let sum = total + cart.product.price * cart.qty;

               if (this.cart.store.store_promo) {
                  sum =
                     sum -
                     cart.product.price *
                        (this.cart.store.store_promo.amount / 100) *
                        cart.qty;
               }

               if (cart.product.promo && !this.cart.store.store_promo) {
                  sum =
                     sum -
                     cart.product.price *
                        (cart.product.promo.amount / 100) *
                        cart.qty;
               }

               return sum;
            }, 0);

            return numeral(total).format("0,0");
         }
      },
      countPrice() {
         if (this.checkCartLength === false) {
            this.$toast.success("Keranjang anda kosong!", {
               type: "error",
               position: "top-right",
               duration: 3000,
               dismissible: true,
            });
         } else if (this.cash == false) {
            this.changeDue = 0;
            this.$toast.success(
               "<span class='text-dark'>Anda belum memasukan uang!",
               {
                  type: "warning",
                  position: "top-right",
                  duration: 3000,
                  dismissible: true,
               }
            );
         } else if (
            parseInt(this.cash) <
            parseInt(
               this.grandTotal()
                  .split(",")
                  .join("")
            )
         ) {
            this.$toast.success(
               "Maaf uang anda kurang <b>Rp" +
                  (
                     this.cash -
                     this.grandTotal()
                        .split(",")
                        .join("")
                  )
                     .toString()
                     .substring(1),
               {
                  type: "info",
                  position: "top-right",
                  duration: 3000,
                  dismissible: true,
               }
            );
            this.changeDue = 0;
         } else {
            this.changeDue = numeral(
               this.cash -
                  this.grandTotal()
                     .split(",")
                     .join("")
            ).format("0,0");
         }
      },
      paymentClick() {
         if (this.checkCartLength === false) {
            this.$toast.success("Keranjang anda kosong!", {
               type: "error",
               position: "top-right",
               duration: 3000,
               dismissible: true,
            });
         } else if (this.cash == false) {
            this.$toast.success(
               "<span class='text-dark'>Anda belum memasukan uang!",
               {
                  type: "warning",
                  position: "top-right",
                  duration: 3000,
                  dismissible: true,
               }
            );
         } else if (
            parseInt(this.cash) <
            parseInt(
               this.grandTotal()
                  .split(",")
                  .join("")
            )
         ) {
            this.$toast.success(
               this.name + "Maaf uang anda kurang <b>Rp" +
                  (
                     this.cash -
                     this.grandTotal()
                        .split(",")
                        .join("")
                  )
                     .toString()
                     .substring(1),
               {
                  type: "info",
                  position: "top-right",
                  duration: 3000,
                  dismissible: true,
               }
            );
            this.changeDue = 0;
         } else {
            let emptyCart = {
               ...this.cart,
            };
            emptyCart.cart_items = [];
            emptyCart.store = {};
            emptyCart.date = false;
            const date = new Date()
               .toString()
               .split(" ")
               .splice(1, 4)
               .join(" ");
            this.products.name = this.name;
            this.products.tableCode = this.table;
            this.products.dateOrder = this.cart.date;
            this.products.datePayment = date;
            this.products.store = this.cart.store;
            this.products.product = this.cart.cart_items.map((cart) => {
               return cart.product;
            });
            this.products.total = numeral(
               parseInt(
                  this.grandTotal()
                     .split(",")
                     .join("")
               )
            ).format("0,0");
            this.products.cash = numeral(parseInt(this.cash)).format("0,0");
            this.products.changeDue =
               "Rp. " +
               numeral(
                  parseInt(
                     (
                        this.grandTotal()
                           .split(",")
                           .join("") - this.cash
                     )
                        .toString()
                        .substring(1)
                  )
               ).format("0,0");
            axios
               .all([
                  axios.post(
                     "https://franchise-backend.herokuapp.com/penjualan/",
                     this.products
                  ),
                  axios.put(
                     "https://franchise-backend.herokuapp.com/cart/",
                     emptyCart
                  ),
               ])
               .then(() => {
                  axios.spread((response1, response2) => {
                     this.$toast.success("Terimakasih!", {
                        type: "info",
                        position: "top-right",
                        duration: 3000,
                        dismissible: true,
                     });
                     console.log(response1, response2);
                  }),
                     location.reload();
                  this.$router.push({
                     path: "/cashier-page",
                  });
               });
         }
      },
      getPromoId(id) {
         return this.$store.getters.promo(id);
      },
      calculatePrice(price, discount) {
         if (discount) {
            const total = price - price * (discount / 100);
            return numeral(total).format("0,0");
         } else {
            const total = price;
            return numeral(total).format("0,0");
         }
      },
      calculateTotal(price, quantity, discount) {
         if (discount) {
            const total = price - price * (discount / 100);
            return numeral(total * quantity).format("0,0");
         } else {
            const total = price;
            return numeral(total * quantity).format("0,0");
         }
      },
   },
   created() {
      this.getPromos();
   },
   updated() {
      this.cart;
      if (this.cart.cart_items.length) {
         this.checkCartLength = true;
      }
   },
};
</script>

<style></style>
