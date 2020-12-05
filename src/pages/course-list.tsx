import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import api from '../services/api'
import Navbar from '../components/navbar'

interface ICourse {
  id: string
  name: string
  description: string
  period: string
  updated_at: Date
}

interface CourseListProps {
  courses: ICourse[]
}

export default function CourseList({ error, courses }) {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <h1>Cursos</h1>
      <p>{error}</p>
      <ul>
        {courses.map((course: ICourse) => (
          <li key={course.id}>{course.name} - {course.description}</li>
        ))}
      </ul>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async () => {
  try {
    const response = await api.get<CourseListProps>('/courses')

    if (response.status !== 200)
      throw new Error()

    const courses: CourseListProps = response.data

    return {
      props: {
        courses
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        courses: [],
        error: 'Não foi possível consultar os cursos.'
      }
    }
  }
}
