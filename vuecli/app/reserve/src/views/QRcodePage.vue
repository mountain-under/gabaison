<template>
  <!-- <div class="div"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="title-conatiner">
    <router-link to="/" class="nav-link">
      <img loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/93df00fc34138266fdb4a1b858262d23dc5dc1d3f04b1fffdd1ac7810d8282ec?"
        class="img" />
    </router-link>
    <div class="upper">QRコードリーダー</div>
    <div class="lower"></div>
  </div>
  <div class="scanner">
    <div class="instructions">QRコードを<br />カメラにかざしてください</div>
    <div id="qr-reader" class="qr-reader"></div>
    <div id="qr-reader-results" class="results"></div>
    <div id="qr-reader-error" class="error"></div>

  </div>
  <!-- </div> -->

  <div v-if="bingoAchieved" class="bingo-modal">
    ビンゴ達成！<br>おめでとうございます！
  </div>

  <div v-if="holeAchieved" class="bingo-modal">
    穴が開きました！<br>おめでとうございます！
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode";
import { onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase/firebase";
import { getFirestore, getDoc, doc } from 'firebase/firestore';

const auth = Firebase.auth

const db = getFirestore()

export default {
  name: 'QrCodeScanner',
  data() {
    return {
      html5QrCode: null,
      userData: null,
      uid: '',
      board: [],
      bingoAchieved: false,
      holeAchieved: false,
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
  mounted() {
    this.startScanner();
  },

  methods: {
    checkBingo(board) {
      const size = board.length;

      // 横のラインチェック
      for (let i = 0; i < size; i++) {
        if (board[i].every(cell => cell.marked)) {
          return true;
        }
      }

      // 縦のラインチェック
      for (let j = 0; j < size; j++) {
        let allMarked = true;
        for (let i = 0; i < size; i++) {
          if (!board[i][j].marked) {
            allMarked = false;
            break;
          }
        }
        if (allMarked) {
          return true;
        }
      }

      // 左上から右下の斜めラインチェック
      let diagonal1 = true;
      for (let i = 0; i < size; i++) {
        if (!board[i][i].marked) {
          diagonal1 = false;
          break;
        }
      }
      if (diagonal1) {
        return true;
      }

      // 右上から左下の斜めラインチェック
      let diagonal2 = true;
      for (let i = 0; i < size; i++) {
        if (!board[i][size - 1 - i].marked) {
          diagonal2 = false;
          break;
        }
      }
      if (diagonal2) {
        return true;
      }

      // ビンゴが成立していない
      return false;
    },

    markNumber(board, number, type) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j].number === number && board[i][j].type === type && board[i][j].marked === false) {
            board[i][j].marked = true;
            if (this.checkBingo(board)) {
              console.log('Bingo!');
              this.bingoAchieved = true;
              return true;
            } else {
              console.log('Not yet.');
              this.holeAchieved = true;
              return false;
            }

          }
        }
      }
    },

    // 使用例
    //markNumber(bingoBoard, 7);  // この番号をマークしてビンゴチェック


    async getUserData() {
      try {
        const querySnapshot = await getDoc(doc(db, 'user', this.uid));
        this.userData = querySnapshot.data()
        this.board = this.userData["bingo"]
        console.log(this.board)

      } catch (error) {
        console.error('Error fetching TA and Technical Assistant data: ', error);
      }
    },
    startScanner() {
      this.html5QrCode = new Html5Qrcode("qr-reader");
      const qrCodeSuccessCallback = (decodedText) => {
        this.html5QrCode.stop().then(() => {
          const values = decodedText.split(';');

          // 分割された値を取り出す
          this.$router.push({
            name: 'checkInOutPage',


            params: {
              uid: values[0],
              number: values[1],
              team: values[2],
            }
          });  // QRコード読み取り成功後に次のページに遷移
        }).catch((err) => {
          console.error("Failed to stop scanning.", err);
        });
      };
      const qrCodeErrorCallback = (errorMessage) => {
        console.log(`Error: ${errorMessage}`);
      };
      const config = { fps: 10, qrbox: 250 };

      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          if (videoDevices.length > 0) {
            this.html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback).catch(qrCodeErrorCallback);
          } else {
            alert('カメラデバイスが見つかりませんでした。');
          }
        })
        .catch(err => {
          console.log(`Error: ${err.message}`);
        });
    },
    goToHomePage() {
      this.$router.push({ name: "home" });
    }
  }
};
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
  display: flex;
  width: 100%;
  align-items: start;
  gap: 20px;

  color: #ebfffe;
  white-space: nowrap;
  text-align: center;
  letter-spacing: -0.38px;
  display: flex;
  justify-content: center;
  /* 子要素を中央揃え */
  position: relative;
  padding: 30px 0 10px;
  font-weight: bold;
  font-size: 36px;

}

.img {
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 54px;
  position: absolute;
  left: 0;
}

.div-3 {
  font-family: M PLUS Code Latin, sans-serif;
  margin: 18px;
  flex-grow: 1;
  flex-basis: auto;

}

.container {
  background-color: #646464;
  display: flex;
  max-width: 480px;
  width: 100%;
  flex-direction: column;
  color: #fff;
  font-weight: 700;
  text-align: center;
  line-height: 150%;
  margin: 0 auto;
}

.header {
  background-color: #2c4e61;
  width: 100%;
  align-items: center;
  white-space: nowrap;
  letter-spacing: -0.38px;
  padding: 60px 60px 18px;
  font: 20px M PLUS Code Latin, sans-serif;
}

.scanner {
  display: flex;
  padding: 60px 30px;
  width: 100%;
  height: 700px;
  font-size: 24px;
  background-color: #CAE3EC;
  flex-direction: column;
  white-space: nowrap;
  letter-spacing: -0.53px;
  line-height: 42px;
}

.instructions {
  font-family: M PLUS Code Latin, sans-serif;
  color: black;
}

.qr-reader {
  margin: 0px auto;
  width: 100%;
}

.results {
  margin-top: 20px;
  font-size: 18px;
}

.error {
  margin-top: 20px;
  font-size: 18px;
  color: red;
}

.footer {
  background-color: #2c4e61;
  margin-top: 55px;
  width: 100%;
  align-items: center;
  letter-spacing: -0.27px;
  justify-content: center;
  padding: 20px 60px;
  font: 14px M PLUS Code Latin, sans-serif;
}

.sunapp {
  color: #ebfffe;
}

.bingo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  z-index: 1000;
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

.title-conatiner {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upper {
  width: 100%;

  /*サガン鳥栖*/
  background-color: #00A0D2;
  color: white;
  /*ヴィッセル神戸*/
  /* background-color: #FFFFFF; */
  /* color: #A40931; */

  text-align: center;
  font-size: 24px;
  padding: 10px 0;
}

.lower {
  width: 100%;
  height: 20px;

  /*サガン鳥栖*/
  background-color: #EC80B4;
  /*ヴィッセル神戸*/
  /* background-color: #000000; */
}

.body-conatiner {
  width: 100%;
  height: 600px;
  flex-grow: 1;

  /*サガン鳥栖*/
  background-color: #CAE3EC;
  /*ヴィッセル神戸*/
  /* background-color: #D9D9D9; */
}
</style>
