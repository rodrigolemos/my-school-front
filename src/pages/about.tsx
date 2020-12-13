import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar'

export default function About(): ReactElement {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <h1>Sobre</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}
