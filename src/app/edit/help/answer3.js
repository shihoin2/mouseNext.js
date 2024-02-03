import styles from './Help.module.css'

export default function Answer3() {
  return (
    <>
      <div className={styles.answerArea}>
        <h3>Q3 : 目標の記入・保存方法について</h3>
        <br />
        <h3>A3 : 目標の記入・保存方法</h3>
        黄色のボックスが目標の記入欄です。
        <br />
        項目につき一つの入力エリアが用意されていますので、自由に入力してください。
        <br />
        枠からはみ出てしまったテキストは画像として保存する際に表示されないので注意が必要です。
        <br />
        入力したテキストは自動で保存されます。
        <br />
      </div>
    </>
  )
}
