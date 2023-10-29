import { GoBackButton } from '@/shared/components/TimerContainer'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
 
  return (
    <GoBackButton type="button" onClick={() => router.back()}>
      Voltar
    </GoBackButton>
  )
}