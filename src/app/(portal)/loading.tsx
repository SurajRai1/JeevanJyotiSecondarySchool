import { Loader2 } from 'lucide-react'

export default function PortalLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <Loader2 className="w-8 h-8 text-zinc-900 animate-spin" />
      <p className="text-sm font-medium text-zinc-500 animate-pulse">Loading...</p>
    </div>
  )
}
