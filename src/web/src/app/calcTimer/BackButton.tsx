import { GoBackButton } from '@/shared/components/TimerContainer';
import { useRouter } from 'next/navigation';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function Page() {
  const router = useRouter()
 
  return (
    <BsFillArrowLeftCircleFill type="button" onClick={() => router.back()}
    />
  )
}