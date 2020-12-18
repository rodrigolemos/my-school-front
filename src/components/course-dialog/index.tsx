import React, { ReactElement, useState } from 'react'
import { useTheme } from '../../hooks/theme'
import { Cookies } from 'react-cookie'
import api from '../../services/api'
import Toast from '../toast'
import { CircularProgress } from '@material-ui/core'
import {
  Button,
  Dialog,
  DialogActions,
  InputLabel,
  FormControl
} from '@material-ui/core'
import { CustomDialogContent, Form, CustomInput, CustomSelect, CustomMenuItem } from './styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface ICreatedBy {
  id: string
  name: string
  email: string

}
interface ICourse {
  id: string
  name: string
  description: string
  period: string
  created_by: ICreatedBy
  created_at: Date
  updated_at: Date
}

interface ICourseDialog {
  open: boolean
  handleDialog(open: boolean): void
  courseToEdit?: ICourse
  courses?: ICourse[]
  setCourses(courses: ICourse[]): void
  setSuccessDialog(message: string): void
}

interface IFormInput {
  id?: string
  name: string
  description: string
  period: string
}

const schema = yup.object().shape({
  name: yup.string().required().min(6),
  description: yup.string().required().min(6),
  period: yup.string().required().min(1).max(1)
})

export default function CourseDialog({
  open,
  handleDialog,
  courseToEdit,
  courses,
  setCourses,
  setSuccessDialog
}: ICourseDialog): ReactElement {
  const { theme } = useTheme()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const { register, control, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    handleDialog(false)
  }

  const deleteCourse = async (): Promise<void> => {
    setLoading(true)
    setError('')
    try {
      const cookies = new Cookies()
      const token = cookies.get('@my-school:token')

      const response = await api.delete(`/courses/${courseToEdit.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.status !== 204)
        throw new Error()

      setCourses(courses.filter(course => course.id !== courseToEdit.id))

      setSuccessDialog('Curso excluído com sucesso!')

      handleClose()

    } catch (error) {
      if (error.response) {
        if (error.response.status == 400) {
          setError('Atenção, existem alunos/professores matriculados nesse curso. Exclua as matrículas antes de prosseguir.')
        } else {
          setError('Ops, não foi possível excluir o curso. Por favor, tente novamente mais tarde.')
        }
      } else {
        setError('Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.')
      }
    }
    setLoading(false)
  }

  const onSubmit = async (data: IFormInput) => {
    console.log(data)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
      <CustomDialogContent customtheme={theme}>
        {error && <Toast type="error" message={error} />}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>{courseToEdit?.name ? 'Editar Curso' : 'Incluir Curso'}</h1>
          <Controller
            name="name"
            control={control}
            defaultValue={courseToEdit?.name}
            as={<CustomInput label="Nome" variant="filled" required ref={register} />}
          />
          {errors.name && (
            <p className="error">Preencha corretamente o nome</p>
          )}
          <FormControl variant="filled">
            <InputLabel id="period-input">Período</InputLabel>
            <Controller
              name="period"
              control={control}
              defaultValue={courseToEdit?.period}
              as={
                <CustomSelect
                  customtheme={theme}
                  labelId="period-input"
                  id="demo-simple-select"
                  defaultValue={courseToEdit?.period}
                  required
                  ref={register}
                >
                  <CustomMenuItem value="M">Matutino</CustomMenuItem>
                  <CustomMenuItem value="E">Vespertino</CustomMenuItem>
                  <CustomMenuItem value="N">Noturno</CustomMenuItem>
                </CustomSelect>
              }
            />
          </FormControl>
          {errors.period && (
            <p className="error">Preencha corretamente o período</p>
          )}
          <Controller
            name="description"
            control={control}
            defaultValue={courseToEdit?.description}
            as={<CustomInput label="Descrição" variant="filled" required ref={register} multiline rows={6} />}
          />
          {errors.description && (
            <p className="error">Preencha corretamente a descrição</p>
          )}
          {!loading ? (
            <DialogActions>
              {courseToEdit?.name ? (
                <>
                  <Button type="submit" variant="contained" color="primary" size="large">Atualizar</Button>
                  <Button onClick={deleteCourse} variant="contained" color="secondary" size="large">Excluir</Button>
                </>
              ) : (
                <Button type="submit" variant="contained" color="primary" size="large">Incluir</Button>
              )}
              <Button onClick={handleClose} variant="contained" size="large">Cancelar</Button>
            </DialogActions>
          ) : (
            <CircularProgress />
          )}
        </Form>
      </CustomDialogContent>
    </Dialog>
  )
}
