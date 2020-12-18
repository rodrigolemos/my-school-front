import React, { ReactElement } from 'react'
import { useTheme } from '../../hooks/theme'
import {
  Button,
  Dialog,
  DialogActions,
} from '@material-ui/core'
import { CustomDialogContent, Form, CustomInput } from './styles'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface ICourseDialog {
  open: boolean
  handleDialog(open: boolean): void
}

interface IFormInput {
  id: string
  name: string
  email: string
  password: string
  contact?: string
  bio?: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  contact: yup.string(),
  bio: yup.string(),
})

export default function CourseDialog({ open, handleDialog }: ICourseDialog): ReactElement {
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
          <h1>Editar Curso</h1>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            as={<CustomInput label="Nome" variant="filled" required ref={register} />}
          />
          {errors.name && (
            <p className="error">Preencha corretamente o nome</p>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            as={<CustomInput label="E-mail" variant="filled" required ref={register} />}
          />
          {errors.email && (
            <p className="error">Preencha corretamente o email</p>
          )}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            as={<CustomInput type="password" label="Nova Senha" variant="filled" required ref={register} autoComplete="" />}
          />
          {errors.password && (
            <p className="error">Preencha corretamente a senha</p>
          )}
          <Controller
            name="contact"
            control={control}
            defaultValue=""
            as={<CustomInput label="Contato" variant="filled" ref={register} />}
          />
          {errors.contact && (
            <p className="error">Preencha corretamente o contato</p>
          )}
          <Controller
            name="bio"
            control={control}
            defaultValue=""
            as={<CustomInput label="Bio" variant="filled" ref={register} multiline rows={5} />}
          />
          {errors.bio && (
            <p className="error">Preencha corretamente a bio</p>
          )}
          <DialogActions>
            <Button type="submit" variant="contained" color="primary" size="large">Atualizar</Button>
            <Button type="submit" variant="contained" color="secondary" size="large">Deletar</Button>
            <Button onClick={handleClose} variant="contained" size="large">Cancelar</Button>
          </DialogActions>
        </Form>
      </CustomDialogContent>
    </Dialog>
  )
}
