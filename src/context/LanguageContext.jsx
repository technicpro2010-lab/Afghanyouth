import { createContext, useContext, useEffect, useState } from 'react'

// ─── All translations live here — one source of truth ───────────────────────
export const translations = {
  en: {
    nav: {
      home: 'Home',
      ourStory: 'Our Story',
      services: 'Services',
      appointment: 'Book a Consultation',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Life · Business · Education',
      heading: 'Supporting Life, Business & Education in Japan.',
      body: 'JAVELS is a multilingual support and business platform helping foreign residents, families, and entrepreneurs navigate life, business, and education in Japan — with direct support and connections to appropriately licensed professionals when needed.',
      cta1: 'Book a consultation',
      cta2: 'Explore our services',
    },
    quote: {
      eyebrow: 'A message from our clients',
      items: [
        '"JAVELS made the process simple and clear — we always know what to do next."',
        '"Professional, responsive, and easy to communicate with. We felt supported throughout the process."',
        '"JAVELS connected us with the right support when we needed it most."',
      ],
    },
    story: {
      eyebrow: 'Our Story',
      heading: 'Connecting People, Business & Opportunities',
      body: 'JAVELS was created to bridge people with services, professionals and opportunities they need in Japan. Through multilingual support, practical coordination, education, and a growing professional network, we help individuals and businesses move forward with confidence. Our mission is simple: to connect people, business and opportunities in Japan.',
    },
    services: {
      eyebrow: 'What we do',
      heading: 'Three pillars of support.',
      disclaimer: 'Licensed Professional Network:\nRegulated professional services are handled in cooperation with appropriately licensed specialists, including administrative scriveners, judicial scriveners, tax accountants, and real-estate professionals.',
      pillars: [
        {
          title: 'Life',
          items: ['Housing & Property Support', 'Banking & Card Support', 'Translation & Interpretation', 'Daily-life & Settlement Support'],
        },
        {
          title: 'Business',
          items: ['Visa & Immigration', 'Company Establishment', 'Business Setup', 'Tax & Accounting Support', 'Used-Car & Vehicle Support'],
        },
        {
          title: 'Education',
          items: ['Japanese Language Classes', 'Education Support', 'Seminars & Workshops', 'Scholarship & Educational Programs', 'Community & Cultural Activities'],
        },
      ],
    },
    appointment: {
      eyebrow: 'Book a Consultation',
      heading: 'Talk with us about what you need.',
      body: 'Choose your desired service, select an available date and time, and proceed to payment to finalize your booking.',
      serviceOptions: [
        { value: 'life',       label: 'Life consultation (housing, banking, daily life)', fee: 3000 },
        { value: 'business',   label: 'Business consultation (visa, company setup, tax)', fee: 5000 },
        { value: 'education',  label: 'Education consultation (classes, scholarships)',   fee: 3000 },
      ],
      fields: {
        fullName: 'Full name',
        email:    'Email',
        service:  'Service',
        date:     'Date',
        time:     'Time',
        notes:    'What would you like to cover? (optional)',
      },
      submit: 'Continue to payment',
      errors: {
        fullName: 'Enter your full name.',
        email:    'Enter a valid email.',
        date:     'Choose a date.',
        time:     'Choose a time.',
      },
      confirmed: {
        heading:   'Payment confirmed',
        reference: 'Reference:',
        again:     'Book another session',
        message:   (name, service, date, time) =>
          `${name}, payment for your ${service} consultation was successful. Your requested appointment is ${date} at ${time}.`,
      },
    },
    newsletter: {
      heading:     'Stay in touch.',
      body:        'Get the latest from JAVELS-services, programs, events, opportunities, and useful updates for life and business in Japan.',
      placeholder: 'Email address',
      submit:      'Sign up',
      success:     "You're on the list — thank you!",
    },
    contact: {
      eyebrow:  'Questions first?',
      heading:  "let's connect.",
      body:     'Tell us what you need. We will help you find the right next step.',
      form: {
        name:     'Name',
        email:    'Email',
        message:  'Message',
        submit:   'Send message',
        sending:  'Sending…',
        success:  "✓ Message sent! We'll be in touch shortly.",
        error:    'Something went wrong. Please try again or message us on WhatsApp.',
      },
      whatsapp: {
        heading: 'Prefer Other Ways to Connect?',
        body:    'Skip the form and message us directly — usually the fastest way to get a same-day reply.',
      },
    },
    footer: {
      location:  'Chiba, Japan',
      connect:   'Connect with us',
      copyright: 'Life · Business · Education',
      tagline:   'Connect. Build. Grow.',
    },
  },

  ja: {
    nav: {
      home:        'ホーム',
      ourStory:    '私たちについて',
      services:    'サービス',
      appointment: '相談予約',
      contact:     'お問い合わせ',
    },
    hero: {
      eyebrow: 'LIFE · BUSINESS · EDUCATION',
      heading: '日本での暮らし・ビジネス・学びをサポート。',
      body:    'JAVELSは、日本で暮らす外国人、ご家族、起業家の皆さまを対象に、暮らし・ビジネス・教育を多言語でサポートするプラットフォームです。必要に応じて、実務的なサポートを直接提供するとともに、適切な資格を持つ専門家と連携し、一人ひとりに合った支援につなげます。',
      cta1: '相談を予約する',
      cta2: 'サービスを見る',
    },
    quote: {
      eyebrow: 'お客様の声',
      items: [
        '「JAVELSのおかげで、手続きがとても分かりやすくなり、次に何をすればよいのかがいつも明確でした。」',
        '「丁寧で対応も早く、気軽に相談できました。最初から最後まで安心してサポートを受けることができました。」',
        '「必要なときに、JAVELSが適切なサポートにつないでくれました。」',
      ],
    },
    story: {
      eyebrow:       'JAVELSについて',
      heading:       '人・ビジネス・機会をつなぐ',
      body:          'JAVELSは、日本で必要なサービス、専門家、そして新たな機会へ人々をつなぐ「架け橋」となるために生まれました。多言語サポート、実務的なコーディネート、教育、そして広がり続ける専門家ネットワークを通じて、個人や事業者の皆さまが安心して次の一歩を踏み出せるようサポートします。私たちの使命はシンプルです。日本で、人・ビジネス・機会をつなぐこと。',
    },
    services: {
      eyebrow:    'サービス',
      heading:    '3つの柱でサポート',
      disclaimer: '資格が必要となる専門業務については、行政書士、司法書士、税理士、宅地建物取引業者など、適切な資格・免許を有する専門家・事業者と連携して対応します。',
      pillars: [
        {
          title: 'LIFE｜暮らし',
          items: ['住まい・物件探しサポート', '銀行口座・カード関連サポート', '翻訳・通訳', '生活・定住サポート'],
        },
        {
          title: 'BUSINESS｜ビジネス',
          items: ['在留資格・ビザサポート', '会社設立サポート', 'ビジネス立ち上げ支援', '税務・会計サポート', '中古車・車両関連サポート'],
        },
        {
          title: 'EDUCATION｜教育',
          items: ['日本語教室', '教育サポート', 'セミナー・ワークショップ', '奨学金・教育プログラム', 'コミュニティ・文化交流活動'],
        },
      ],
    },
    appointment: {
      eyebrow: '相談予約',
      heading: '必要なサポートについて、お気軽にご相談ください。',
      body:    'ご希望のサービスを選び、予約可能な日時を指定してください。予約内容を確認後、お支払いへお進みいただけます。',
      serviceOptions: [
        { value: 'life',      label: '暮らしの相談（住まい・銀行・日常生活）', fee: 3000 },
        { value: 'business',  label: 'ビジネス相談（ビザ・会社設立・税務）',  fee: 5000 },
        { value: 'education', label: '教育相談（日本語・奨学金）',             fee: 3000 },
      ],
      fields: {
        fullName: 'お名前',
        email:    'メールアドレス',
        service:  'ご希望のサービス',
        date:     '日付',
        time:     '時間',
        notes:    'ご相談内容（任意）',
      },
      submit: 'お支払いへ進む',
      errors: {
        fullName: 'お名前を入力してください。',
        email:    '有効なメールアドレスを入力してください。',
        date:     '日付を選択してください。',
        time:     '時間を選択してください。',
      },
      confirmed: {
        heading:   'お支払いが完了しました',
        reference: '予約番号：',
        again:     '別のご予約をする',
        message:   (name, service, date, time) =>
          `${name}様、${service}の相談料金のお支払いが完了しました。ご希望の予約日時は${date} ${time}です。`,
      },
    },
    newsletter: {
      heading:     '最新情報をお届けします',
      body:        'JAVELSのサービス、プログラム、イベント、さまざまな機会、日本での暮らしやビジネスに役立つ情報をお届けします。',
      placeholder: 'メールアドレス',
      submit:      '登録する',
      success:     'ご登録ありがとうございます！',
    },
    contact: {
      eyebrow: 'ご質問がありますか？',
      heading: 'お気軽にお問い合わせください。',
      body:    'ご相談内容をお聞かせください。次のステップをご案内します。',
      form: {
        name:    'お名前',
        email:   'メールアドレス',
        message: 'メッセージ',
        submit:  '送信する',
        sending: '送信中…',
        success: '✓ メッセージを送信しました。近日中にご連絡いたします。',
        error:   'エラーが発生しました。再度お試しいただくか、WhatsAppでお問い合わせください。',
      },
      whatsapp: {
        heading: 'その他のお問い合わせ方法',
        body:    'フォームを使わず、WhatsAppから直接お問い合わせいただくこともできます。',
      },
    },
    footer: {
      location:  '千葉県・日本',
      connect:   'フォローする',
      copyright: 'LIFE · BUSINESS · EDUCATION',
      tagline:   'Connect. Build. Grow.',
    },
  },
}

// ─── Context & hook ──────────────────────────────────────────────────────────
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('javels-lang') || 'en'
  })

  // Persist choice and update <html lang=""> for accessibility / SEO
  useEffect(() => {
    localStorage.setItem('javels-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
