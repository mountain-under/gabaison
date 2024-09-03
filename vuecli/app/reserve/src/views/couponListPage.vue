<template>
  <div class="title-container">
    <div class="upper">クーポン一覧</div>
    <div class="lower"></div>
  </div>

  <div class="body-container">
    <ul v-if="coupons.length > 0">
      <li v-for="coupon in coupons" :key="coupon.id" class="coupon-item">
        <!-- <img src="@/assets/coupon10.png" alt="`coupon${coupon}`" class="coupon-image" /> -->
        <!-- <img :src="`/app/reserve/src/assets/coupon${coupon}.png`" :alt="`coupon${coupon}`" class="coupon-image" /> -->
        <img v-bind:src="require(`@/assets/coupon${coupon}.png`)" v-bind:alt="coupon" class="coupon-image"
          @click="goToCouponPage(key)" />
      </li>
    </ul>
    <p v-else>クーポンがありません</p>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase/firebase";
import { getFirestore, getDoc, doc } from 'firebase/firestore';

const auth = Firebase.auth

const db = getFirestore()

export default {
  name: "CouponList",
  data() {
    return {
      uid: '',
      number: 2,
      userData: '',
      team: '',
      coupons: [],
    };
  },
  async created() {
    //ユーザ情報取得
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        console.log('User is not logged in.');
      }
    });

    await this.getUserData()

  },
  methods: {

    goToCouponPage(id) {
      this.$router.push(`/coupon${id}`);
    },

    async getUserData() {
      try {
        const querySnapshot = await getDoc(doc(db, 'user', this.uid));
        this.userData = querySnapshot.data()
        console.log(this.userData)
        this.number = this.userData["number"]
        this.team = this.userData["team"]
        this.coupons = this.userData["coupon"]
        console.log(this.coupons)
      } catch (error) {
        console.error('Error fetching TA and Technical Assistant data: ', error);
      }
    },
  }
};
</script>

<style scoped>
.title-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upper {
  width: 100%;
  background-color: #00A0D2;
  color: white;
  text-align: center;
  font-size: 24px;
  padding: 10px 0;
}

.lower {
  width: 100%;
  height: 20px;
  background-color: #EC80B4;
}

.body-container {
  width: 100%;
  height: 1000px;
  flex-grow: 1;
  background-color: #CAE3EC;
}

.coupon-item {
  padding-top: 10px;
}

.coupon-image {
  width: 90%;
  /* 画像のサイズを調整 */
  height: auto;
  margin-right: auto;
}
</style>
