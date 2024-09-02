<template>
  <div id="app">
    <h1>ビンゴゲーム</h1>
    <div class="bingo-grid">
      <div
        v-for="(cell, index) in bingoCells"
        :key="index"
        :class="['bingo-cell']"
        @click="selectNumber(index, cell)"
        :style="{ backgroundImage: `url(${getImageForType(cell.type)})` }"
      >
        <span class="cell-number">{{ cell.number }}</span>
      </div>
    </div>
    <h2>試合結果予想</h2>
    <div class="match-info">
      <div class="team">
        <img :src="teamALogo" alt="Team A Logo" class="team-logo" />
        <p>{{ teamAName }}</p>
      </div>
      <div class="score-input">
        <input v-model="teamAScore" type="number" placeholder="点数を予想" />
        <span> - </span>
        <input v-model="teamBScore" type="number" placeholder="点数を予想" />
      </div>
      <div class="team">
        <img :src="teamBLogo" alt="Team B Logo" class="team-logo" />
        <p>{{ teamBName }}</p>
      </div>
    </div>

    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup">
        <p>番号 {{ selectedNumber.number }} が選択されました！</p>
        <p>名前 {{ selectedNumber.name }} が選択されました！</p>
        <p>タイプ {{ selectedNumber.type }} が選択されました！</p>
        <button @click="closePopup">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { saganTosuPlayers } from '@/testData/saganTosuPlayers.js'; // テストデータのインポート
import { onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase/firebase";
import { getFirestore, getDoc, doc } from 'firebase/firestore';
 
const auth = Firebase.auth
 
const db = getFirestore()


export default {
  data() {
    return {
      bingoCells: this.generateBingoCells(),
      showPopup: false,
      selectedNumber: null,
      teamAScore: '',
      teamBScore: '',
      uid: '',
      number: 0,
      userData: '',
      team: '',
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
    generateBingoCells() {
      const selectedPlayers = this.getRandomPlayers(24); // 中央のセル以外のプレイヤー番号を選択
      // プレイヤー番号とタイプを使ってビンゴのセルを作成
      const bingoCells = selectedPlayers.map(player => ({
        number: player.number,
        name: player.name,
        type: Math.floor(Math.random() * 3) + 1 // タイプは 1 から 3 のいずれか
      }));
      
      // 中央のセルにデータベースから取得したnumberを設定
      const centerIndex = 12; // ビンゴの中央のセルのインデックス
      bingoCells.splice(centerIndex, 0, { number: this.number, name: 'Central', type: 0 });
      
      return bingoCells;
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    getRandomPlayers(count) {
      const shuffled = this.shuffleArray(saganTosuPlayers); // シャッフルして
      return shuffled.slice(0, count); // 指定した数だけ選択
    },
    selectNumber(index, cell) {
      this.selectedNumber = cell;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    getImageForType(type) {

      // タイプに応じた画像パスを返す
      switch (type) {
        case 1:
          return require('@/assets/bingo-saganT.png');
        case 2:
          return require('@/assets/bingo-visselT.png');
        // case 'C':
        //   return require('@/assets/typeC.png');
        default:
          return '';
      }
    },
    async getUserData() {
      try {
        const querySnapshot = await getDoc(doc(db, 'user', this.uid));
        this.userData = querySnapshot.data()
        console.log(this.userData)
        this.number = this.userData["number"]
        console.log(this.number)
        this.team = this.userData["team"]
      } catch (error) {
        console.error('Error fetching TA and Technical Assistant data: ', error);
      }
    },
  },
  computed: {
    teamClass() {
      return this.team === 'ヴィッセル神戸' ? 'vissel' : 'tosu';
    },
},
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  position: relative; /* 子要素の配置基準とする */
  border: 2px solid rgb(90, 90, 90); /* 黒い線で囲む */
  padding: 20px; /* 内側の余白を追加 */
  border-radius: 5px; /* 角を少し丸くする場合 */
}

#app::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* #app の高さに合わせる */
  background-image: url('/app/reserve/src/assets/sagantosu.webp');
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.2; /* エンブレム画像の透明度を設定 */
  z-index: -1; /* 他のコンテンツの後ろに配置 */
  background-size: auto 100%; 
}

/* ヴィッセル神戸の場合の背景 */
#app.vissel::before {
  background-image: url('/app/reserve/src/assets/fe-vissel-kobe.webp');
}

/* サガン鳥栖の場合の背景 */
#app.tosu::before {
  background-image: url('/app/reserve/src/assets/sagantosu.webp');
}

.bingo-grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-gap: 10px;
  justify-content: center;
}

.bingo-cell {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  /* 背景画像をセルのサイズに合わせる */
  background-position: center;
  border: 2px solid #ccc;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  transition: background-color 0.3s, transform 0.3s;
  color: white; /* 数字の色を白に設定 */
  text-shadow: 1px 1px 2px black; /* 数字の視認性を高めるための影 */
}

.bingo-cell:hover {
  background-color: rgba(0, 0, 0, 0.2); /* 画像の上にホバー効果を適用 */
  transform: scale(1.1);
  color: white;
  /* 数字の色を白に設定 */
  text-shadow: 1px 1px 2px black;
  /* 数字の視認性を高めるための影 */
}



.bingo-cell.selected {


  background-color: rgba(255, 204, 0, 0.6);
  /* 画像の上に選択時の背景色を適用 */
  border-color: #ff9900;
}

.cell-number {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: white;

  text-shadow: 2px 2px 4px black; /* 数字の視認性を高めるための影 */
}

.match-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.team-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.score-input {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.score-input input {
  width: 50px;
  padding: 5px;
  font-size: 18px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  text-shadow: 2px 2px 4px black;
  /* 数字の視認性を高めるための影 */
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 300px;
  animation: popup-show 0.3s ease-out;
}

.popup p {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.popup button {
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.popup button:hover {
  background-color: #ff9900;
}

@keyframes popup-show {
  from {
    transform: scale(0.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

</style>
