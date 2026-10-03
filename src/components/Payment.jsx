import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

/**
 * Payment is a presentational + local-validation component.
 * Props:
 *  - amount: number (fee in JPY)
 *  - onSuccess: (transactionId: string) => void
 *  - onBack: () => void
 */
export default function Payment({ amount, onSuccess, onBack }) {
  const { lang } = useLanguage()
  const isJa = lang === 'ja'

  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate() {
    const e = {}
    if (!form.cardName.trim()) {
      e.cardName = isJa ? 'カード名義人を入力してください。' : 'Enter the name on the card.'
    }
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, ''))) {
      e.cardNumber = isJa ? '有効なカード番号を入力してください。' : 'Enter a valid card number.'
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) {
      e.expiry = isJa ? '有効期限はMM/YY形式で入力してください。' : 'Use MM/YY format.'
    }
    if (!/^\d{3,4}$/.test(form.cvc)) {
      e.cvc = isJa ? '有効なセキュリティコードを入力してください。' : 'Enter a valid CVC.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return

    setProcessing(true)

    setTimeout(() => {
      setProcessing(false)
      const mockTransactionId = `JV-${Date.now()}`
      onSuccess(mockTransactionId)
    }, 900)
  }

  const formattedAmount = `¥${amount.toLocaleString()}`

  return (
    <div>
      <h3 className="mb-1">{isJa ? '相談料金のお支払い' : 'Pay the consultation fee'}</h3>
      <p className="mb-4">
        {isJa ? 'ご請求金額：' : 'Amount due: '}{' '}
        <strong className="text-ink font-semibold text-base">{formattedAmount}</strong>
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="cardName">{isJa ? 'カード名義人' : 'Name on card'}</label>
          <input
            id="cardName"
            type="text"
            placeholder={isJa ? 'TARO YAMADA' : 'Full Name'}
            value={form.cardName}
            onChange={(e) => update('cardName', e.target.value)}
          />
          {errors.cardName && <span className="field-error">{errors.cardName}</span>}
        </div>

        <div className="field">
          <label htmlFor="cardNumber">{isJa ? 'カード番号' : 'Card number'}</label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="1234 1234 1234 1234"
            value={form.cardNumber}
            onChange={(e) => update('cardNumber', e.target.value)}
          />
          {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="field flex-1">
            <label htmlFor="expiry">{isJa ? '有効期限' : 'Expiry'}</label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={(e) => update('expiry', e.target.value)}
            />
            {errors.expiry && <span className="field-error">{errors.expiry}</span>}
          </div>
          <div className="field flex-1">
            <label htmlFor="cvc">{isJa ? 'セキュリティコード' : 'CVC'}</label>
            <input
              id="cvc"
              type="text"
              inputMode="numeric"
              placeholder="123"
              value={form.cvc}
              onChange={(e) => update('cvc', e.target.value)}
            />
            {errors.cvc && <span className="field-error">{errors.cvc}</span>}
          </div>
        </div>

        <div className="flex gap-4 mt-3">
          <button type="button" className="btn btn-secondary" onClick={onBack} disabled={processing}>
            {isJa ? '戻る' : 'Back'}
          </button>
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing ? (isJa ? '処理中…' : 'Processing…') : `${isJa ? '支払う' : 'Pay'} ${formattedAmount}`}
          </button>
        </div>
      </form>
    </div>
  )
}
