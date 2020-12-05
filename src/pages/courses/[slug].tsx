import { useRouter } from 'next/router'

const Course = () => {
  const router = useRouter()
  return (
    <>
      <h1>Course {router.query.slug}</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default Course
