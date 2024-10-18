 
import RegisterForm from "./RegisterForm";

export default function RegisterPage ({ params }: { params: { locale: string } })  {

  console.log('local cote server')
  console.log(params.locale)
  return <RegisterForm lang={params.locale}    />;
}
