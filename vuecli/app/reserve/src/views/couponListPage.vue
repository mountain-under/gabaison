<template>
  <div class="title-container">
    <div class="upper" :class="teamClass">クーポン一覧</div>
    <div class="lower" :class="teamClass"></div>
  </div>

  <div class="body-container" :class="teamClass">
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
        this.getUserData();
      } else {
        console.log('User is not logged in.');
      }
    });

    

  },
  computed: {
   
    teamClass() {
      console.log(this.team)
      if (this.team === 'サガン鳥栖') {
        return 'tosu';
      } else if (this.team === 'ヴィッセル神戸') {
        return 'vissel';
      } else {
        return '';
      }
    },
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
  
  text-align: center;
  font-size: 24px;
  padding: 10px 0;
}

.upper.vissel {
  background-color: #FFFFFF;
  color: #A40931;
}

.upper.tosu {
  background-color: #00A0D2;
  color: white;
}

.lower {
  width: 100%;
  height: 20px;
  
}

.lower.vissel {
  background-color: #000000;
}

.lower.tosu {
  background-color: #EC80B4;
}


.body-container {
  width: 100%;
  height: 1000px;
  flex-grow: 1;
  
}

.body-container.vissel {
  background-color: #D9D9D9;
}

.body-container.tosu {
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
