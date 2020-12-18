import React, { ReactElement } from 'react'
import { useTheme } from '../../hooks/theme'
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

export default function CourseDialog({ open, handleDialog, courseToEdit }: ICourseDialog): ReactElement {
  const { theme } = useTheme()

  const { register, control, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    handleDialog(false)
  }

  const onSubmit = async (data: IFormInput) => {
    console.log(data)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
      <CustomDialogContent customtheme={theme}>
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
          <DialogActions>
            {courseToEdit?.name ? (
              <>
                <Button type="submit" variant="contained" color="primary" size="large">Atualizar</Button>
                <Button type="submit" variant="contained" color="secondary" size="large">Excluir</Button>
              </>
            ) : (
              <Button type="submit" variant="contained" color="primary" size="large">Incluir</Button>
            )}
            <Button onClick={handleClose} variant="contained" size="large">Cancelar</Button>
          </DialogActions>
        </Form>
      </CustomDialogContent>
    </Dialog>
  )
}
