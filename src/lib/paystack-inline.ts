/**
 * Bad Decision AI — Paystack Inline Integration
 * Loads Paystack's inline JS dynamically and opens the payment popup.
 * No react-paystack dependency (incompatible with React 19).
 */

interface PaystackConfig {
  key: string
  email: string
  amount: number // in kobo (NGN) or cents (USD)
  currency: 'NGN' | 'USD'
  ref: string
  callback: (response: { reference: string; status: string }) => void
  onClose: () => void
  metadata?: {
    custom_fields: Array<{
      display_name: string
      variable_name: string
      value: string
    }>
  }
}

declare global {
  interface Window {
    PaystackPop: {
      setup: (config: PaystackConfig) => { openIframe: () => void }
    }
  }
}

let scriptLoaded = false
let scriptLoading = false
const scriptCallbacks: Array<() => void> = []

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (scriptLoaded) {
      resolve()
      return
    }
    if (scriptLoading) {
      scriptCallbacks.push(() => resolve())
      return
    }
    scriptLoading = true

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => {
      scriptLoaded = true
      scriptLoading = false
      resolve()
      scriptCallbacks.forEach((cb) => cb())
      scriptCallbacks.length = 0
    }
    script.onerror = () => {
      scriptLoading = false
      reject(new Error('Failed to load Paystack script'))
    }
    document.body.appendChild(script)
  })
}

interface PaystackPaymentParams {
  email: string
  amount: number // in main currency unit (e.g. 15000 for NGN 15,000)
  currency: 'NGN' | 'USD'
  reference: string
  planName: string
  onSuccess: (reference: string) => void
  onCancel: () => void
}

export async function openPaystackPopup(params: PaystackPaymentParams) {
  await loadPaystackScript()

  const config: PaystackConfig = {
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    email: params.email,
    amount: params.currency === 'NGN' ? params.amount * 100 : params.amount * 100, // kobo/cents
    currency: params.currency,
    ref: params.reference,
    callback: (response) => {
      if (response.status === 'success') {
        params.onSuccess(response.reference)
      }
    },
    onClose: params.onCancel,
    metadata: {
      custom_fields: [
        { display_name: 'Plan', variable_name: 'plan_name', value: params.planName },
      ],
    },
  }

  const handler = window.PaystackPop.setup(config)
  handler.openIframe()
}
