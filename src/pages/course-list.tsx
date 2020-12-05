import { useRouter } from 'next/router'

const CourseList = () => {
  const router = useRouter()
  return (
    <>
      <h1>Cursos</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default CourseList