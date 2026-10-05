import { createClient } from '@/lib/supabase/server'
import { ContentManagerClient } from './ContentManagerClient'

export default async function ContentManager() {
  const supabase = await createClient()

  // Fetch all content
  const { data: contents } = await supabase
    .from('content')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false })

  return <ContentManagerClient initialContents={contents || []} />
}
