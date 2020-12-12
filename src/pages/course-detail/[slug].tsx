import { useRouter } from 'next/router'

const CourseDetail = () => {
  const router = useRouter()
  return (
    <>
      <h1>CourseDetail {router.query.slug}</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default CourseDetail
