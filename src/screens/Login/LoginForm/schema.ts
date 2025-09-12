import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter no minimo 6 caracteres")
    .required("Senha é obrigatória"),
});
