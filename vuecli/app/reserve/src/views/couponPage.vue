<template>
  <div class="coupon-container">

    <!-- ロード画面 -->
    <div v-if="isLoading" class="loading-screen">
      <div class="spinner"></div> <!-- スピナー（ロード中のアニメーション） -->
      <p>読み込み中...</p>
    </div>

    <!-- メインコンテンツ -->
    <div v-else>
      <!-- Header -->
        <header class="header">
      <!-- ヘッダー画像を追加 -->
      <img :src="headerImageUrl" alt="Coupon Header" class="header-image">
    </header>
    

    <!-- Coupon Information -->
    <div class="coupon-info">
      <h2>クーポン取得が完了しました</h2>
      <p>佐賀でのお食事やお買い物をお楽しみください。</p>
      <div class="gray-background">
        <div class="points">
          <span class="points-amount">10%</span><span class="points-label">OFF 取得</span>
        </div>      
        <p class="expiry">使用期限：2024年9月5日 {{ currentTime }}まで</p>
      </div>
    </div>

    <!-- Button -->
    <a
      :href="googleMapsUrl"
      target="_blank"  
      rel="noopener noreferrer"  
    >
      <button class="coupon-button">対象店舗はこちら</button>
    </a>
    <!-- Notice -->
    <div class="notice">
      <ul>
        <li>キャンペーンポイントは、取得から48時間有効です。</li>
        <li>一部、ポイントが利用できない商品もございます。</li>
        <li>キャンペーンポイントをご利用いただけるお食事取り扱いショップは
          <a href="#">こちら</a>よりご確認ください。</li>
        <li>本キャンペーンは、バナーが表示されたお客様のみ対象です。</li>
        <li>本企画のクーポン付与は、バナーが表示された当日中のみお一人様一回です。なお、ポイントのご利用はお一人様一回までと増します。</li>
        <li>本ページを閉じるもしくは、本ページよりほかのページへ遷移された場合、クーポン取得が出来なくなる場合がございます。</li>
        <!-- その他の注意書き... -->
      </ul>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <nav>
        <ul>
          <li>ホーム</li>
          <li>お気に入り</li>
          <li>探す</li>
          <li>ランキング</li>
          <li>計測・その他</li>
        </ul>
      </nav>
    </footer>
  </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'; // クラッカーのエフェクト用ライブラリをインポート

export default {
  name: 'CouponPage',

  data() {
    return {
      isLoading: true, // ロード状態を管理
      currentTime: '', // 現在時刻を格納するデータプロパティ
    };
  },
  props: {
    couponId: String,  // couponIdをpropsとして受け取る
  },
  computed: {
    // couponIdに基づいてGoogle MapsのURLを動的に設定
    googleMapsUrl() {
      if (this.couponId === '1') {
        return 'http://maps.google.com/maps?q=佐賀牛レストラン季楽本店'; // couponIdが1の場合のURL
      } 
      if (this.couponId === '2') {
        return 'http://maps.google.com/maps?q=佐賀麦キッチン'; // その他のデフォルトのURL
      }
      else{
        return 'http://maps.google.com/maps?q=佐賀GRILLTAKESHITA';
      }
    },
    // couponIdに基づいてヘッダー画像のURLを動的に設定
    headerImageUrl() {
      //return require('@/assets/coupon-kira.png');
      if (this.couponId === '1') {
        return require('@/assets/header/kira.png'); // couponIdが1の場合の画像
      } 
      if (this.couponId === '2') {
        return require('@/assets/header/mugi.png'); // couponIdが2の場合の画像
      } 
      else {
        return require('@/assets/header/takeshita.png'); // デフォルトの画像
      }
    }
  },
  created() {
    console.log(this.couponId);
  },
  mounted() {
    // 2秒後にロード状態を解除し、クラッカーのエフェクトを実行
    setTimeout(() => {
      this.isLoading = false;
      this.launchConfetti(); // クラッカーのエフェクトを実行
    }, 1800);
    // 現在時刻を更新
    this.updateCurrentTime();
  },
  methods: {
    launchConfetti() {
      // クラッカーのエフェクトを表示する関数
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    },
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}`; // 現在時刻を "HH:MM" フォーマットで設定
    },
  },
};
</script>

<style scoped>
/* ロード画面のスタイル */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.coupon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0; /* コンテナのパディングを削除 */
  margin: 0; /* コンテナのマージンを削除 */
  background-color: #fff;
}

.notice ul {
  text-align: left; /* リスト全体を左揃えに設定 */
  padding-left: 20px; /* インデントを追加 */
  list-style: disc; /* デフォルトのリストスタイルにする（必要なら） */
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0;
}

.header-image {
  width: 100%;
  max-height: 200px;
}

.coupon-info {
  text-align: center;
  margin: 0px 0;
  margin-bottom: 15px;
}

.coupon-info h2 { /*クーポン取得が完了しました。*/
  margin: 29px 0; /* 上下のマージンを設定 */
  font-size: 16px; /* 必要に応じてフォントサイズを設定 */
}

.coupon-info p { /*佐賀でのお食事やお買い物をお楽しみください*/
  margin-bottom: 14.5px;
  font-size: 12.5px; /* 必要に応じてフォントサイズを設定 */
}

span.points-label {
  font-weight: bold; /* 太文字に設定 */
}


.points-amount {
  font-size: 36px;
  font-weight: bold;
  color: #000;
}

.coupon-button {/*対象店舗はこちら*/
  background-color: #00AEEF ;
  color: #fff;
  padding: 10px 100px;
  border: none;
  border-radius: 50px;
  margin: 0px 0;
  margin-bottom: 23px;
}

.notice { /*注意事項*/
  margin: 19px;
  color: #929292;
  font-size: 10px;
  margin-bottom: 150px;
}

.footer {
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
}

.footer nav ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
}

.gray-background {
  background-color: #f5f5f5; /* 薄い灰色の背景色 */
  padding: 40px 49px; /* 内側の余白を追加 */
  border-radius: 10px; /* 角を少し丸める */
  text-align: center; /* テキストを中央揃えにする */
  margin: 0px 0px; /* 上下にマージンを追加 */
  margin: 0 auto; /* 水平方向に中央揃えに設定 */
  /*width: 80%; /* 幅を80%に設定（例） */
  max-width: 300px; /* 最大幅を300pxに制限 */
}

p.expiry {
  margin-bottom: 0; /* ボトムマージンを削除 */
}


</style>