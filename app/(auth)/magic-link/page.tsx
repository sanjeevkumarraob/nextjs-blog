import MagicLinkForm from '@/components/auth/MagicLinkForm'

export default function MagicLinkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">Sign in with Magic Link</h1>
        <MagicLinkForm />
      </div>
    </div>
  )
} 