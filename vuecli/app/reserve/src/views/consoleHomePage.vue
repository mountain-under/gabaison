<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="div">
    <div class="div-2">管理者 Home</div>
    <div class="div-3">
      現在のご利用者数<br /><br />

    </div>

    <div class="div-4"> {{ this.uid }}名</div>



    <button @click="goToListpage" class="div-6">予約者一覧</button>



    <img loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a735cab541df0a2ebb0694177468ec5832da1c6e573c68524985aa4fcd7d7fdf?"
      class="img" @click="goToQrpage" />
    <div class="div-11"> supported by <a href="https://sunapp.jp" class="sunapp">sunapp</a> LLC.</div>
  </div>
</template>
  
<script>

import { onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase/firebase";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const auth = Firebase.auth

const db = getFirestore()

export default {
  data() {
    return {
      uid: '',
    };
  },
  created() {
    //ユーザ情報取得
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        console.log('User is not logged in.');
      }
    });
  },
  //ドキュメントがなければ作成
  async checkAndCreateUserDoc() {
    try {
      const userDocRef = doc(db, 'users', this.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { firstLogin: new Date() });
        console.log('User document created.');
      } else {
        console.log('User document already exists.');
      }
    } catch (error) {
      console.error('Error checking/creating user document: ', error);
    }
},
methods: {
  //先生の記入不可時間取得
  getData() {
    // try {
    //   const querySnapshot = await getDocs(query(collection(db, 'teacher', this.currentMonth, 'unAvailable')));
    //   this.teacherData = querySnapshot.docs.map(doc => doc.data());
    // } catch (error) {
    //   console.error('Error fetching TA and Technical Assistant data: ', error);
    // }
  },
  // カレンダーのデータを保存するメソッド
  saveData() {
    // try {
    //   // カレンダーのデータを Firestore に保存
    //   const userDocRef = doc(db, 'users', this.uid, 'jobItems', this.currentMonth);
    //   await setDoc(userDocRef, { calendar: this.Calendar, upDate: Date() }, { merge: true });
    //   console.log('Calendar data saved successfully.');
    // } catch (error) {
    //   console.error('Error saving calendar data: ', error);
  },
}
}



</script>
    
<style scoped>
.div {
  background-color: #ebfffe;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  line-height: 150%;
  margin: 0 auto;
}

.div-2 {
  background-color: #2c4e61;
  align-self: stretch;
  width: 100%;
  align-items: center;
  color: #ebfffe;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -0.38px;
  padding: 30px 0px 10px;
  font: 700 20px M PLUS Code Latin, sans-serif;
}

.div-3 {
  color: #000;
  text-align: center;
  margin-top: 25px;
  width: 324px;
  font: 700 20px/30px Inter, sans-serif;
}

.img {
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 213px;
  height: 213px;
  margin-top: 30px;
  max-width: 100%;
  border-radius: 5px;
}

.div-4 {
  color: #000;
  text-align: center;
  margin-top: 25px;
  width: 324px;
  font: 700 40px/50px Inter, sans-serif;
}

.div-6 {
  border-radius: 5.481px;
  background-color: #2c4e61;
  display: flex;
  margin-top: 40px;
  gap: 1px;
  font-size: 19px;
  color: #ebfffe;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  padding: 4px 50px;
}


.sunapp {
  color: #ebfffe;
}


.img {
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 100px;
  align-self: end;
  margin-top: 355px;
  max-width: 100%;
  margin-right: 20px;
}

.div-11 {
  background-color: #2c4e61;
  align-self: stretch;
  margin-top: 20px;
  width: 100%;
  align-items: center;
  color: #fff;
  text-align: center;
  letter-spacing: -0.27px;
  justify-content: center;
  font: 700 20px M PLUS Code Latin, sans-serif;
}
</style>