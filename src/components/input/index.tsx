import { InputHTMLAttributes } from "react"

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input {...props} />
  )
}

export default Input