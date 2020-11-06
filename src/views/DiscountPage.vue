<template>
    <section class="discount-page">
        <div class="container pt-5">
            <div class="row">
                <div class="col-lg-12 mb-5 pb-5">
                    <h1>
                        Create <strong class="text-success">Discount</strong>
                    </h1>
                    <div class="form-group mt-4">
                        <label for="">Promo Name</label>
                        <input type="text" class="form-control w-75" placeholder="Promo 17 agustus.."
                            v-model="promoNewData.name" />
                    </div>
                    <label for="">Promo Type</label>
                    <select class="form-control w-75 mb-2" v-model="promoNewData.type">
                        <option value="discount">Discount</option>
                    </select>
                    <div class="form-group">
                        <label for="">Promo Amount</label>
                        <input type="text" class="form-control w-75" placeholder="30" v-model="promoNewData.amount" />
                    </div>
                    <div class="form-group">
                        <div>
                            From
                            <input type="date" class="form-control w-75 my-2" placeholder="Promo 17 agustus.."
                                v-model="promoNewData.from" @change="checkDate" />
                        </div>
                        <div>
                            To
                            <input id="dateTo" type="date" class="form-control w-75 mb-1"
                                placeholder="Promo 17 agustus.." v-model="promoNewData.to" @change="checkDate" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control w-75" id="exampleFormControlTextarea1"
                            placeholder="Merayakan HUT Indonesia..." v-model="promoNewData.desc"></textarea>
                    </div>
                    <button class="btn btn-info rounded-pill" @click="addPromo" :disabled="disabledButton(promoNewData)">
                        Add Promo
                    </button>
                </div>
                <div class="col-lg-12">
                    <h1>Discount <strong class="text-success">List</strong></h1>
                    <ul class="list-group mb-5 pt-3">
                        <li class="list-group-item w-100" v-for="item in promos" :key="item.id">
                            <div class="form-check d-flex align-items-center px-1">
                                <label class="form-check-label w-100 d-flex justify-content-between align-items-center"
                                    :for="item.id">
                                    <div>
                                        <span>{{ item.name }}</span>
                                        <span
                                            class="badge badge-pill align-self-center p-2 badge-success mx-2 px-3">{{ item.amount }}%</span>
                                        <span
                                            class="badge badge-pill align-self-center p-2 badge-info px-3">{{ item.from }},
                                            {{ item.to }}</span>
                                    </div>
                                    <div>
                                        <button class="btn btn-secondary mr-2" @click="editPromo(item.id)">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil"
                                                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                        </button>
                                        <button class="btn btn-danger" @click="deletePromo(item.id)">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash"
                                                fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd"
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button>
                                    </div>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-12 mt-5" v-if="!isHiddenEditPromo">
                    <h1>
                        Edit <strong class="text-success">Discount</strong>
                    </h1>
                    <div class="form-group mt-4">
                        <label for="">Promo Name</label>
                        <input type="text" class="form-control w-75" v-model="promoEdit.name" />
                    </div>
                    <label for="">Promo Type</label>
                    <select class="form-control w-75 mb-2" v-model="promoEdit.type">
                        <option value="discount">Discount</option>
                    </select>
                    <div class="form-group">
                        <label for="">Promo Amount</label>
                        <input type="text" class="form-control w-75" placeholder="30" v-model="promoEdit.amount" />
                    </div>
                    <div class="form-group">
                        <div>
                            From
                            <input type="date" class="form-control w-75 my-2" placeholder="Promo 17 agustus.."
                                v-model="promoEdit.from" @change="checkDate" />
                        </div>
                        <div>
                            To
                            <input id="dateTo" type="date" class="form-control w-75 mb-1"
                                placeholder="Promo 17 agustus.." v-model="promoEdit.to" @change="checkDate" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Description</label>
                        <textarea class="form-control w-75" id="exampleFormControlTextarea1"
                            placeholder="Merayakan HUT Indonesia..." v-model="promoEdit.desc"></textarea>
                    </div>
                    <button class="btn btn-info rounded-pill" @click="btnEditPromo" :disabled="disabledButton(promoEdit)">
                        Edit Promo
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from "vuex";
    import axios from "axios";
    import swal from "sweetalert";

    export default {
        name: "DiscountPage",
        data() {
            return {
                promoNewData: {
                    name: "",
                    type: null,
                    amount: "",
                    from: null,
                    to: null,
                    desc: "",
                },
                promoEdit: {},
                isHiddenEditPromo: true
            };
        },
        computed: {
            ...mapGetters(["promos", "promoid"]),
        },
        methods: {
            ...mapActions(["getPromos", "getPromoId"]),
            deletePromo(id) {
                swal({
                    title: "Apakah anda yakin?",
                    text: "Promo yang dihapus tidak dapat di kembalikan!",
                    icon: "warning",
                    buttons: ["Tidak", "Ya"],
                    dangerMode: true,
                }).then((willDelete) => {
                    if (willDelete) {
                        axios
                            .delete("http://localhost:3000/promo/" + id)
                            .then(() => {
                                swal("Promo berhasil dihapus!", {
                                    icon: "success",
                                });
                            })
                            .catch((error) => console.log(error));
                    }
                });
            },
            checkDate() {
                let from = this.promoNewData.from;
                let to = this.promoNewData.to;
                var dateTo = document.getElementById("dateTo");

                if (to < from) {
                    swal({
                        title: "Upps!",
                        text: "Tanggal selesai harus lebih dari tanggal mulai!",
                        icon: "warning",
                        dangerMode: true,
                    });
                    dateTo.value = null;
                    to = null
                }
            },
            disabledButton(nameForm) {
                return (
                    nameForm.name == "" ||
                    nameForm.type == null ||
                    nameForm.amount == "" ||
                    nameForm.from == null ||
                    nameForm.to == null ||
                    nameForm.desc == ""
                );
            },
            addPromo() {
                if (this.promoNewData) {
                    axios
                        .post("http://localhost:3000/promo/", this.promoNewData)
                        .then(() => {
                            swal(
                                "Promo " +
                                this.promoNewData.name +
                                " berhasil ditambahkan!", {
                                    icon: "success",
                                }
                            );
                        })
                        .catch((error) => console.log(error));
                }
            },
            editPromo(id) {
                this.isHiddenEditPromo = false
                this.getPromoId(id)
                this.promoEdit = {
                    ...this.promoid
                }
            },
            btnEditPromo() {
                axios
                .put("http://localhost:3000/promo/" + this.promoid.id , this.promoEdit)
                    .then(() => {
                        swal(
                            "Promo " +
                            this.promoEdit.name +
                            " berhasil di edit!", {
                                icon: "success",
                            }
                        );
                    })
                    .catch((error) => console.log(error));
            }
        },
        created() {
            this.getPromos();
        },
    };
</script>

<style></style>