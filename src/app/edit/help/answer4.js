import styles from './Help.module.css'

export default function Answer4() {
  return (
    <>
      <div className={styles.answerArea}>
        <h3>Q4 : 画像のアップロード方法を教えて！</h3>
        <br />
        <h3>A4 : 画像のアップロード方法</h3>

        灰色のボックスが目標の記入欄です。
        <br />
        ボックスをクリックするとエクスプローラーが開くので、お手持ちの画像から選んで開くをクリックしてください。
        <br />
        画像は枠に合うよう自動で調整されますが、うまく表示されない場合はご自身でトリミングなど行ってからアップロードしてください・
        <br />
        アップロードした画像は自動で保存されます。
      </div>
    </>
  )
}
